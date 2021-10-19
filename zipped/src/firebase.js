import firebase from "firebase";

  const firebaseApp = firebase.initializeApp({
     apiKey: "AIzaSyBEf33RUI1CxTFmTgBvebvY8IsRq1HaOa0",
     authDomain: "zipped-d044f.firebaseapp.com",
     projectId: "zipped-d044f",
     storageBucket: "zipped-d044f.appspot.com",
     messagingSenderId: "646946111834",
     appId: "1:646946111834:web:aaedc857ed25f55eedf363",
     measurementId: "G-TG1HHSVMNC"
    });

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export {db, auth, storage};

  export default db;