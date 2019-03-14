import * as R from "ramda";
import { message } from "antd";
import { takeEvery, call, select, put, fork } from "redux-saga/effects";
import { navigate } from "@reach/router";
import { captureException } from "@sentry/browser";

import { createReducer, Creator } from "./helper";

import rsf, { app } from "../core/fire";
import logger from "../core/log";
import { next } from "../core/step";

export const SAVE = "@CAMP/SAVE";
export const SUBMIT = "@CAMP/SUBMIT";
export const SET_LOADING = "@CAMP/SET_LOADING";
export const MARK_NEXT = "@CAMP/MARK_NEXT";
export const UNMARK_NEXT = "@CAMP/UNMARK_NEXT";
export const CLEAR_MAJOR = "@CAMP/CLEAR_MAJOR";

export const save = Creator(SAVE);
export const submit = Creator(SUBMIT);
export const setLoading = Creator(SET_LOADING);
export const markNext = Creator(MARK_NEXT);
export const unmarkNext = Creator(UNMARK_NEXT);
export const clearMajor = Creator(CLEAR_MAJOR);

const db = app.firestore();

interface User {
  uid: string;
  displayName: string;
}

function* submissionSaga() {
  try {
    const { uid, displayName }: User = yield select(s => s.user);
    const docRef = db.collection("campers").doc(uid);

    const data = { submitted: true, updatedAt: new Date() };
    yield call(rsf.firestore.setDocument, docRef, data, { merge: true });

    logger.log("Updated and Submitted Camper Record", data);

    navigate("/thankyou");

    yield call(message.success, "การสมัครเข้าค่ายเสร็จสิ้น");

    if (window.analytics) {
      const major = yield select(s => s.camper.major);

      window.analytics.track("Completed", { uid });

      yield call(window.analytics.track, "Completed", {
        uid,
        displayName,
        major
      } as any);
    }
  } catch (err) {
    message.error(err.message);

    captureException(err);
  }
}

function* updateCamperRecord(payload) {
  const hide = message.loading("กำลังบันทึกข้อมูล...", 0);

  try {
    const uid = yield select(s => s.user.uid);

    if (uid) {
      const docRef = db.collection("campers").doc(uid);

      const data = { ...payload, updatedAt: new Date() };
      yield call(rsf.firestore.setDocument, docRef, data, { merge: true });

      logger.log("Updated Camper Record:", data);

      yield call(message.info, "บันทึกข้อมูลเรียบร้อยแล้ว", 0.5);
    }
  } catch (err) {
    message.error(err.message);

    captureException(err);
  } finally {
    hide();
  }
}

function* saveSubmissionSaga({ payload }) {
  if (payload) {
    yield fork(updateCamperRecord, payload);
    const shouldProceed = yield select(s => {
      return s.submission.shouldProceed;
    });
    if (shouldProceed) {
      yield put(unmarkNext(true));
      yield call(next);
    }
  } else {
    const payload = yield select(s => s.form.submission);

    if (payload) {
      yield fork(updateCamperRecord, payload.values);
    }
  }
}

function* clearMajorSaga() {
  yield call(updateCamperRecord, CLEAR_MAJOR_FIELD);
  navigate("/");
}

export function* submissionWatcherSaga() {
  yield takeEvery(CLEAR_MAJOR, clearMajorSaga);
  yield takeEvery(SAVE, saveSubmissionSaga);
  yield takeEvery(SUBMIT, submissionSaga);
}

export interface SubmissionState {
  loading: boolean;
  shouldProceed: boolean;
}

const initial: SubmissionState = {
  loading: false,
  shouldProceed: false
};

export default createReducer(initial, state => ({
  [SET_LOADING]: loading => ({ ...state, loading }),
  [MARK_NEXT]: () => ({ ...state, shouldProceed: true }),
  [UNMARK_NEXT]: () => ({ ...state, shouldProceed: false })
}));

export const CLEAR_MAJOR_FIELD = {
  major: "",
  majorAnswer1: "",
  majorAnswer2: "",
  majorAnswer3: "",
  majorAnswer4: "",
  majorAnswer5: ""
};
