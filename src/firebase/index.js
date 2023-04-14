
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: 'AIzaSyA4oZ-W_jpU-SMIhjaaxzM9XkolXqvKcAI',
  authDomain: 'todo-vue-e80c2.firebaseapp.com',
  projectId: 'todo-vue-e80c2',
  storageBucket: 'todo-vue-e80c2.appspot.com',
  messagingSenderId: '193398569387',
  appId: '1:193398569387:web:58b2b993a239c198313aee',
  measurementId: 'G-FK0M8TYG9Y'
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

console.log(analytics)
const db = getFirestore(app);

export{
    db
}