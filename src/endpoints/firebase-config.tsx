// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAV1lwIDGORXaliX8WFnHlRlGCDnxc3veI",
  authDomain: "gestorrestaurante-12090.firebaseapp.com",
  databaseURL: "https://gestorrestaurante-12090.firebaseio.com",
  projectId: "gestorrestaurante-12090",
  storageBucket: "gestorrestaurante-12090.appspot.com",
  messagingSenderId: "352707627532",
  appId: "1:352707627532:web:7786eaf6028cc91d99fc29"
};

// Initialize Firebase
export const appFirebase = initializeApp(firebaseConfig);