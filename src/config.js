// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig  = {
  apiKey: "AIzaSyAicZZra7VQ0ZqTydmokSwgsToksLt9tig",
  authDomain: "engage-firebasedb-sample.firebaseapp.com",
  databaseURL: "https://engage-firebasedb-sample-default-rtdb.firebaseio.com",
  projectId: "engage-firebasedb-sample",
  storageBucket: "engage-firebasedb-sample.appspot.com",
  messagingSenderId: "954388086650",
  appId: "1:954388086650:web:472d494595bccb422360c3",
  measurementId: "G-SZ3V5EZ0T7"
};

// Initialize Firebase
// const app = initializeApp(config);
// export const auth = getAuth(app);
// export const db = getFirestore(app);

const config = initializeApp(firebaseConfig);

export default config;