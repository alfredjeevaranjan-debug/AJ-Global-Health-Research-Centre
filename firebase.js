
import { initializeApp } from
"https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";

import { getAuth } from
"https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

import { getFirestore } from
"https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBsRVydtUf-ebXr-dl3BkgygzR0gqDZeuw",
    authDomain: "aj-research-d7ca3.firebaseapp.com",
    projectId: "aj-research-d7ca3",
    storageBucket: "aj-research-d7ca3.firebasestorage.app",
    messagingSenderId: "384105186437",
    appId: "1:384105186437:web:c3ae0402d067d7bc9e95ec",
    measurementId: "G-8TGPS6YLPH"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
