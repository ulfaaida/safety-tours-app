import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyB2UJRNU9OtuLfXxh4x-8EEKVajIrqPRlQ",
  authDomain: "safetytours-49195.firebaseapp.com",
  databaseURL: "https://safetytours-49195-default-rtdb.firebaseio.com",
  projectId: "safetytours-49195",
  storageBucket: "safetytours-49195.appspot.com",
  messagingSenderId: "925543042341",
  appId: "1:925543042341:web:3cf2223cb3b99adaf1decc",
  measurementId: "G-KY98KNSSX9"
};

firebase.initializeApp(firebaseConfig);

export default firebase;