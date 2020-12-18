import firebase from 'firebase';
import 'firebase/storage'

const config = {
};

firebase.initializeApp(config);
const firebaseStorage = firebase.storage();

export {
  firebase, firebaseStorage
}
