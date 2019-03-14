import {all} from 'redux-saga/effects'
import storage from 'redux-persist/lib/storage'
import {persistCombineReducers} from 'redux-persist'
import {reducer as form} from 'redux-form'

import user, {reauthSaga, userWatcherSaga} from './user'
import camper from './camper'
import submission, {submissionWatcherSaga} from './submission'
import { IReducer } from '../core/types';

const config = {
  key: 'root',
  storage,
  throttle: 2000,
}

export const reducers = persistCombineReducers<IReducer>(config, {
  user,
  camper,
  form,
  submission,
})

export function* rootSaga() {
  yield all([reauthSaga(), userWatcherSaga(), submissionWatcherSaga()])
}
