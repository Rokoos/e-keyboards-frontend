import firebase from "firebase/app";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAPmeNNXjCHhaqPODTZd3IZE8PlTgI5fkA",
    authDomain: "ecommerce-6e7ee.firebaseapp.com",
    projectId: "ecommerce-6e7ee",
    storageBucket: "ecommerce-6e7ee.appspot.com",
    messagingSenderId: "1018595435267",
    appId: "1:1018595435267:web:124ec8a929c59674523f36"
  };
  // Initialize Firebase
  if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }
  

  export const auth = firebase.auth()
  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()