import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
  var firebaseConfig = {
    apiKey: "AIzaSyC9QwUXAD_tzhgHR7QNApDr5snU2HnQtgs",
    authDomain: "sveltetodo-bd5a3.firebaseapp.com",
    databaseURL: "https://sveltetodo-bd5a3.firebaseio.com",
    projectId: "sveltetodo-bd5a3",
    storageBucket: "sveltetodo-bd5a3.appspot.com",
    messagingSenderId: "282340678848",
    appId: "1:282340678848:web:171c3ec87ac53a702be125",
    measurementId: "G-KGCBCH05LP"
  };

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const db = firebase.firestore();
