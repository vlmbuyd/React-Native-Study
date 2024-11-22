// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUAws-UUiFhzicDz47SYNgwr6_qkB0ZCQ",
  authDomain: "react-native-todo-app-d6f91.firebaseapp.com",
  projectId: "react-native-todo-app-d6f91",
  storageBucket: "react-native-todo-app-d6f91.firebasestorage.app",
  messagingSenderId: "876759862954",
  appId: "1:876759862954:web:d056a6e318158884f90ad3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
