// This is for google login
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// const firebaseConfig = {
//   apiKey: "AIzaSyC0H6-i96z2qj76vJswgN3pT-E5BqtdthE",
//   authDomain: "merncourses-e2236.firebaseapp.com",
//   projectId: "merncourses-e2236",
//   storageBucket: "merncourses-e2236.appspot.com",
//   messagingSenderId: "1066367350498",
//   appId: "1:1066367350498:web:bcac429faa1e6c927b50bb",
//   measurementId: "G-D31P13WS0F"
// };


const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;