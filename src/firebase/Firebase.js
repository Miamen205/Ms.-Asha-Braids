import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyAcmHrwJBc7bPCjAnj4hOfIDzVazZGZj3I",
  authDomain: "asha-shop.firebaseapp.com",
  databaseURL: "https://asha-shop.firebaseio.com",
  projectId: "asha-shop",
  storageBucket: "asha-shop.appspot.com",
  messagingSenderId: "313251109656"
  };
  
 const firebaseApp  = firebase.initializeApp(config);

export default firebaseApp;
