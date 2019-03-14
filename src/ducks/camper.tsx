import React from "react";
import { call, put, select } from "redux-saga/effects";
import { message, Modal } from "antd";
import { navigate } from "@reach/router";
import { configureScope, captureException } from "@sentry/browser";

import "firebase/firestore";

import { createReducer, Creator } from "./helper";

import rsf, { app } from "../core/fire";
import { getMajorFromPath } from "../core/util";
import logger from "../core/log";

import { setLoading } from "../ducks/submission";
import { MAIN_PAGE } from "../common/App";

const db = app.firestore();

// Disable this flag in order to allow major to be changed.
// I'm counting on you.
const MAJOR_CANNOT_BE_CHANGED = true;

export const STORE_CAMPER = "STORE_CAMPER";

export const storeCamper = Creator(STORE_CAMPER);

const LoadingMessage = `กำลังดึงข้อมูลการสมัครเข้าค่าย กรุณารอสักครู่...`;
const MajorRedirectLog = `User has chosen a major before. Redirecting to:`;
const MajorRedirectMessage = `กำลังเปลี่ยนหน้าไปที่แบบฟอร์มสมัครเข้าสาขา `;
const ChangeDeniedMessage = `คุณได้เลือกสาขาอื่นไปแล้ว`;

// Check if user is at major root, e.g. /:major
function isMajorRoot(major: string) {
  return window.location.pathname.replace("/", "") === major;
}

// Analytics Module
function Identify(
  uid: string,
  displayName: string,
  email: string,
  photoURL: string
) {
  // Segment
  if (window.analytics) {
    window.analytics.identify(uid, {
      name: displayName,
      email,
      photoURL
    });
  }

  // Fullstory
  if (window.FS) {
    window.FS.identify(uid, {
      email,
      displayName,
      photoURL
    });
  }

  // Sentry
  configureScope(scope => {
    scope.setUser({
      id: uid,
      email,
      displayName,
      photoURL
    });
  });

  // Google Analytics
  if (window.ga) {
    window.ga("set", "userId", uid);
  }

  // prettier-ignore
  logger.log(`[Analytics] Identified Camper ${uid}'s identity as ${displayName}`)
}

interface Camper {
  firstname: string;
  lastname: string;
  facebookDisplayName: string;
  major?: string;
}

function notifySubmitted(camper: Camper) {
  const name = camper.firstname
    ? `${camper.firstname} ${camper.lastname}`
    : camper.facebookDisplayName;

  Modal.success({
    content: (
      <div style={{ fontSize: "1.65em" }}>
        <p>
          คุณ {name} ได้ยืนยันการสมัครค่าย Junior Webmaster Camp ในสาขา{" "}
          {camper.major} ไปเรียบร้อยแล้ว
        </p>
        <p>
          ค่ายจะประกาศผลการคัดเลือกในวันที่ 24 มีนาคม ผ่านทางเว็บไซต์{" "}
          <a href={MAIN_PAGE}>{MAIN_PAGE}</a>
        </p>
      </div>
    ),
    okText: `กลับสู่เว็บไซต์หลัก`,
    onOk: () => {
      if (typeof window !== "undefined") {
        window.location.href = MAIN_PAGE;
      }
    }
  });
}

if (typeof window !== "undefined") {
  window.navigate = navigate;
}

export function* loadCamperSaga() {
  const hide = message.loading(LoadingMessage, 0);
  yield put(setLoading(true));

  try {
    // Retrieve the user information from the store, and the major from path
    const major = getMajorFromPath();
    const user = yield select(s => s.user);
    const { uid, displayName, email, photoURL } = user;

    logger.log("Camper UID", uid, "| Major", major, "| Facebook", displayName);

    // UID should always be there, since it's triggered upon auth success
    if (!uid) {
      logger.error("Camper hasn't authenticated yet. This should not happen.");
      return;
    }

    // Retrieve the camper information from firestore database
    const docRef = db.collection("campers").doc(uid);
    const doc = yield call(rsf.firestore.getDocument, docRef);

    // Identify camper's identity in analytics.
    Identify(uid, displayName, email, photoURL);

    if (doc.exists) {
      // If the camper's record does exist:
      const record = doc.data();
      logger.log("Retrieved Camper Record:", record);

      // Store the camper's submission record into the redux store
      yield put(storeCamper(record));

      // D - If user had already submitted, redirect them to the submission status
      if (record.submitted) {
        logger.info("User had already submitted before. Redirecting...");

        if (window.analytics) {
          window.analytics.track("Returned after Submitted", {
            uid,
            displayName,
            major
          });
        }

        yield call(notifySubmitted, record);

        return;
      }

      // A - If user is at root path and had chosen a major, redirect them.
      if (record.major && window.location.pathname === "/") {
        logger.info(MajorRedirectLog, record.major);

        yield call(message.info, MajorRedirectMessage + record.major);
        navigate(`/${record.major}/step1`);

        return;
      }

      // B - If user does not have major in record, and is not at major path
      if (!major) {
        return;
      }

      // C - Edge Case: Major was not found in Camper Record
      if (!record.major) {
        logger.error("CRITICAL: Major was not found in camper record!");

        if (window.analytics) {
          window.analytics.track("Major Missing In Record", {
            uid,
            displayName,
            majorPath: major
          });
        }

        // Merge the major data in record.major
        const data = { major };
        yield call(rsf.firestore.setDocument, docRef, data, { merge: true });

        // Redirect the camper to their own major
        navigate("/" + major + "/step1");

        return;
      }

      // E - If user is not at the same major they had chosen at first.
      if (MAJOR_CANNOT_BE_CHANGED && record.major !== major) {
        yield call(message.warn, ChangeDeniedMessage);
        navigate("/change_denied?major=" + major);

        if (window.analytics) {
          window.analytics.track("Change Denied", {
            uid,
            displayName,
            newMajor: major,
            oldMajor: record.major
          });
        }

        return;
      }

      // F - If user is at /:major, redirect to /:major/step1
      if (isMajorRoot(major)) {
        logger.info("User is at major root. Redirecting to Step 1.");

        navigate(`/${major}/step1`);
      }

      // Submit the Track Event to Segment Analytics
      if (window.analytics) {
        window.analytics.track("Returned", { uid, displayName, major });
      }

      return;
    }

    // G - If user arrives at major paths for the first time, create a Camper Record for them.
    if (major) {
      const data = {
        major,
        facebookDisplayName: displayName,
        facebookEmail: email,
        facebookPhotoURL: photoURL,
        createdAt: new Date()
      };

      yield call(rsf.firestore.setDocument as any, docRef, data);

      if (window.analytics) {
        window.analytics.track("Arrived", { uid, displayName, major });
      }

      logger.log("Created Record for New Camper:", displayName, "->", data);

      // If user is at /:major, also redirect to /:major/step1
      if (isMajorRoot(major)) {
        navigate(`/${major}/step1`);
      }
    }
  } catch (err) {
    message.error(err.message);

    captureException(err);
  } finally {
    hide();
    yield put(setLoading(false));
  }
}

const initial = {};

export default createReducer(initial, state => ({
  [STORE_CAMPER]: camper => camper
}));
