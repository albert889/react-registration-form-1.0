import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJy-h4zL68I_d4j794dw1HkMVdkd44Qts",
  authDomain: "tk4-webstudent.firebaseapp.com",
  projectId: "tk4-webstudent",
  storageBucket: "tk4-webstudent.appspot.com",
  messagingSenderId: "952404260405",
  appId: "1:952404260405:web:4722aebea08797236c237c",
  measurementId: "G-VQ8QLFPQZF"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const storage = firebase.storage();
export const storageRef = firebase.storage().ref();