import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: 'AIzaSyBP3gbmn8hJLrJ3ZOHRxYoVX18BV6yMjrg',
    authDomain: 'kanban-it-academy.firebaseapp.com',
    databaseURL: 'https://kanban-it-academy.firebaseio.com',
    projectId: 'kanban-it-academy',
    storageBucket: 'kanban-it-academy.appspot.com',
    messagingSenderId: '30326275186',
    appId: '1:30326275186:web:f097248ed182e8756216eb',
};

firebase.initializeApp(firebaseConfig);
firebase.auth.Auth.Persistence.LOCAL;

export default firebase;