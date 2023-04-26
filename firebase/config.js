import * as firebase from "firebase";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAraFSVtWBrtVtDh5tPBYCPspawUkYZGr0",
  authDomain: "rn-project-e9f30.firebaseapp.com",
  projectId: "rn-project-e9f30",
  storageBucket: "rn-project-e9f30.appspot.com",
  messagingSenderId: "187784388916",
  appId: "1:187784388916:web:f554d9e3f9162ac56c8561",
  measurementId: "G-P0D7CR4X9T",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
