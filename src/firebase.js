import firebase from 'firebase';
import 'firebase/storage'

const config = {
  apiKey: "AIzaSyAzc9WM6hvuqaHnVY_TBNNMmeNPRviIViQ",
  authDomain: "flask-image-upload-app.firebaseapp.com",
  databaseURL: "https://flask-image-upload-app-default-rtdb.firebaseio.com",
  projectId: "flask-image-upload-app",
  storageBucket: "flask-image-upload-app.appspot.com",
  messagingSenderId: "749119770261",
  appId: "1:749119770261:web:e2dbe444247d7387ad959c"
};


firebase.initializeApp(config);
const firebaseStorage = firebase.storage();
const firebaseDB = firebase.database();

export {
  firebase, firebaseStorage, firebaseDB
}
