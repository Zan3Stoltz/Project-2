import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage"

  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBEf33RUI1CxTFmTgBvebvY8IsRq1HaOa0",
    authDomain: "zipped-d044f.firebaseapp.com",
    databaseURL: "https://zipped-d044f.firebaseio.com",
    projectId: "zipped-d044f",
    storageBucket: "zipped-d044f.appspot.com",
    messagingSenderId: "646946111834",
    appId: "1:646946111834:web:aaedc857ed25f55eedf363",
    measurementId: "G-TG1HHSVMNC"
  });

  const db = firebase.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export {db, auth, storage};

  //export default db;