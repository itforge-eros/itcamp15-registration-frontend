import React from "react";
import * as R from "ramda";
import { message, Modal } from "antd";
import * as firebase from "firebase/app";
import { takeEvery, call, put, fork } from "redux-saga/effects";
import { captureException } from "@sentry/browser";

import "firebase/auth";

import { createReducer, Creator } from "./helper";
import { loadCamperSaga } from "./camper";

import rsf, { app } from "../core/fire";
import { getMajorFromPath } from "../core/util";
import logger from "../core/log";
import { MAIN_PAGE } from "../common/App";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const STORE_USER = "STORE_USER";
export const CLEAR_USER = "CLEAR_USER";

export const SET_LOADING = "SET_LOADING";
export const SET_AUTHENTICATING = "SET_AUTHENTICATING";
export const RE_AUTH = "RE_AUTH";

export const login = Creator(LOGIN);
export const logout = Creator(LOGOUT);

export const storeUser = Creator(STORE_USER);
export const clearUser = Creator(CLEAR_USER);

export const setLoading = Creator(SET_LOADING);
export const setAuthenticating = Creator(SET_AUTHENTICATING);
export const reAuth = Creator(RE_AUTH);

// The epoch timestamp in which the registration system will be closed
const SUBMISSION_CLOSED_TIME = new Date("Mar 16 2019 01:00:00").getTime();

// Serializes the user's information into an object
const userProps = R.pick([
  "uid",
  "displayName",
  "email",
  "phoneNumber",
  "photoURL",
  "metadata"
]);

function notifySubmissionClosed() {
  Modal.error({
    content: (
      <div style={{ fontSize: "1.65em" }}>
        <p>ช่วงเวลารับสมัครของค่าย Junior Webmaster Camp ได้จบลงแล้วค่ะ 🙌</p>
        <p>
          ค่ายจะประกาศผลการคัดเลือกในวันที่ 24 มีนาคม ผ่านทางเว็บไซต์{" "}
          <a href={MAIN_PAGE}>{MAIN_PAGE}</a> ค่ะ
        </p>
        {/* <p>ขอให้โชคดีนะคะ ให้คุกกี้ทำนายกัน! 🥠</p> */}
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

export function* loginSaga() {
  // Notify the user that registration has been closed.
  if (Date.now() > SUBMISSION_CLOSED_TIME) {
    yield call(notifySubmissionClosed);

    return;
  }
  const hide = message.loading("กำลังยืนยันตัวตนผ่าน Facebook...", 0);
  yield put(setAuthenticating(true));

  const provider = new firebase.auth.FacebookAuthProvider();
  provider.addScope("email");
  provider.addScope("public_profile");

  try {
    // Attempt to Sign In with redirection.
    const auth = yield call(rsf.auth.signInWithRedirect, provider);
    // Retrieve the user credential by using authentication credential.
    const cred = yield call(rsf.auth.signInAndRetrieveDataWithCredential, auth);

    if (cred) {
      logger.log("Logged in as", cred.user.displayName, cred.user.uid);

      yield fork(authRoutineSaga, cred.user);

      return;
    }

    logger.warn("Credentials not found! Authentication might have failed.");
  } catch (err) {
    logger.warn("Authentication Error:", err.code, err.message);
    message.error("พบความผิดพลาดในการยืนยันตัวตน:", err.message);

    captureException(err);
  } finally {
    yield call(hide);
    yield put(setAuthenticating(false));
  }
}

export function* logoutSaga() {
  try {
    yield call(rsf.auth.signOut);
    yield put(clearUser());
  } catch (err) {
    message.error(err.message);
  }
}

// Routines to perform when the user begins or resumes their session
export function* authRoutineSaga(user) {
  yield put(storeUser(user));
  yield fork(loadCamperSaga);
}

export const getUserStatus = () =>
  new Promise((resolve, reject) => {
    app.auth().onAuthStateChanged(resolve as any, reject);
  });

// Attempt to re-authenticate when user resumes their session
export function* reauthSaga() {
  try {
    const user = yield call(getUserStatus);
    const major = getMajorFromPath();

    // Notify the user that registration has been closed.
    if (Date.now() > SUBMISSION_CLOSED_TIME) {
      yield call(notifySubmissionClosed);

      return;
    }

    // If user is successfully re-authenticated.
    if (user) {
      logger.log("User has been re-authenticated as", user.displayName, user);

      yield fork(authRoutineSaga, user);
      return;
    }

    // If user isn't at major path, don't do anything.
    if (!major) {
      logger.log("User is not at major path:", window.location.pathname);
      return;
    }

    // If user has a major, but has not authenticated yet.
    if (major && !user) {
      logger.log("User has not authenticated yet. Logging In:", major);
      yield fork(loginSaga);

      yield put(setLoading(false));
    }
  } catch (err) {
    if (typeof window !== "undefined") {
      message.warn(err.message);
    }

    logger.warn("Re-authentication Failed!", err);

    captureException(err);
  } finally {
    yield put(setLoading(false));
  }
}

export function* userWatcherSaga() {
  yield takeEvery(LOGIN, loginSaga);
  yield takeEvery(LOGOUT, logoutSaga);
  yield takeEvery(RE_AUTH, reauthSaga);
}

const initial = {
  loading: true
};

export default createReducer(initial, (state: object) => ({
  [SET_LOADING]: (loading: boolean) => ({ ...state, loading }),
  [SET_AUTHENTICATING]: (authenticating: boolean) => ({
    ...state,
    authenticating
  }),
  [STORE_USER]: (user: object) => user && userProps(user),
  [CLEAR_USER]: () => ({})
}));
