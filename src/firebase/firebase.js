import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


// remove keys before pushing updates to github
// Initialize Firebase

var prodConfig = {
    apiKey: "AIzaSyDtKlny2bHlkluoGX2TznEs6fusSgkbG_U",
    authDomain: "first-ascent-fe005.firebaseapp.com",
    databaseURL: "https://first-ascent-fe005.firebaseio.com/",
    projectId: "first-ascent-fe005",
    storageBucket: "first-ascent-fe005.appspot.com",
    messagingSenderId: "967160354362"
};

var devConfig = {
    apiKey: "AIzaSyDtKlny2bHlkluoGX2TznEs6fusSgkbG_U",
    authDomain: "first-ascent-fe005.firebaseapp.com",
    databaseURL: "https://first-ascent-fe005.firebaseio.com/",
    projectId: "first-ascent-fe005",
    storageBucket: "first-ascent-fe005.appspot.com",
    messagingSenderId: "967160354362"
};

const config = process.env.NODE_ENV === 'production'
    ? prodConfig
    : devConfig;

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {
    db,
    auth,
};