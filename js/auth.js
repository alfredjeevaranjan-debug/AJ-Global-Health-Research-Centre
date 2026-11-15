
import { auth, db } from "../firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

import {
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// REGISTER NEW USER
export async function signup(email, password) {
  const result = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await setDoc(doc(db, "users", result.user.uid), {
    email: result.user.email,
    role: "member",
    createdAt: serverTimestamp()
  });

  return result.user;
}

// LOGIN USER
export async function login(email, password) {
  const result = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  return result.user;
}

// LOGOUT USER
export function logout() {
  return signOut(auth);
}

// RESET PASSWORD
export function resetPassword(email) {
  return sendPasswordResetEmail(auth, email);
}
