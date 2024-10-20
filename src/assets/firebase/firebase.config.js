// This is for google login
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0H6-i96z2qj76vJswgN3pT-E5BqtdthE",
  authDomain: "merncourses-e2236.firebaseapp.com",
  projectId: "merncourses-e2236",
  storageBucket: "merncourses-e2236.appspot.com",
  messagingSenderId: "1066367350498",
  appId: "1:1066367350498:web:bcac429faa1e6c927b50bb",
  measurementId: "G-D31P13WS0F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// end Google login

// This is for email auth===============/
// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAkcw4X-uk7p_L-F3nfMkAjF10CurCkMmk",
//   authDomain: "bootcamp-breaking-news.firebaseapp.com",
//   projectId: "bootcamp-breaking-news",
//   storageBucket: "bootcamp-breaking-news.appspot.com",
//   messagingSenderId: "303617780535",
//   appId: "1:303617780535:web:0246766f601d528be748b2",
//   measurementId: "G-1P66Y1XNTS"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);
// end email pass auth
export default app;