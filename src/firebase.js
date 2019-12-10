import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyAMIrIO6NnPYDGPpF36ZFrpwqpgZfawAas",
  authDomain: "react-todo-839a8.firebaseapp.com",
  databaseURL: "https://react-todo-839a8.firebaseio.com",
  projectId: "react-todo-839a8",
  storageBucket: "react-todo-839a8.appspot.com",
  messagingSenderId: "480635161521",
  appId: "1:480635161521:web:a2c32483a1e1f50cc08b90"
};

//Initializare firebase
firebase.initializeApp(firebaseConfig);

// Export firestore
export const firestore = firebase.firestore();

export default firebase;