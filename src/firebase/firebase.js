import firebase from 'firebase/app';
import 'firebase/auth';


// remove keys before pushing updates to github
// Initialize Firebase
// check2

const config = process.env.NODE_ENV === 'production'
    ? prodConfig
    : devConfig;

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
    auth,
};
