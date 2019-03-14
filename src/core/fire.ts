import * as firebase from 'firebase/app'

import 'firebase/firestore'

import SagaFirebase from 'redux-saga-firebase'

const config = {
  apiKey: 'AIzaSyD-B_AN7Ev0cbCtJTGrteL3FgGs7pkRljg',
  authDomain: 'itcamp15-registration.firebaseapp.com',
  databaseURL: 'https://itcamp15-registration.firebaseio.com',
  projectId: 'itcamp15-registration',
  storageBucket: 'itcamp15-registration.appspot.com',
  messagingSenderId: '576206709323'
}

export const app = firebase.initializeApp(config)

if (typeof window !== 'undefined') {
  window.firebase = app
}

export default new SagaFirebase(app)
