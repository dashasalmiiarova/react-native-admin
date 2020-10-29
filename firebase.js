import firebase from 'firebase';
// import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyD8gI1MJON6Ftl7fYghCQ9-7tn3RlM_E3I",
    authDomain: "reactnativebusiness.firebaseapp.com",
    databaseURL: "https://reactnativebusiness.firebaseio.com",
    projectId: "reactnativebusiness",
    storageBucket: "reactnativebusiness.appspot.com",
    messagingSenderId: "1081775839826",
    appId: "1:1081775839826:web:0f81980798fe7f95df5d8b"
  };
  // Initialize Firebase

  if (!firebase.apps.length) {
    app = firebase.initializeApp(firebaseConfig);
 }

  export const auth = firebase.auth;

  export const db = firebase.database();
