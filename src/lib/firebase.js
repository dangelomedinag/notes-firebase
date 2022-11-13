// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCEtHtxhJ9uJfXIYJnfj25NOU9kAGS6PfY',
	authDomain: 'test-sveltekit-5595c.firebaseapp.com',
	projectId: 'test-sveltekit-5595c',
	storageBucket: 'test-sveltekit-5595c.appspot.com',
	messagingSenderId: '245654634650',
	appId: '1:245654634650:web:7aac3dc375bb5b185e9f23'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
