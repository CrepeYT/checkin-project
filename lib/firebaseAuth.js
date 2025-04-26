// lib/firebaseAuth.js
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user);
      } else {
        reject("User not authenticated");
      }
    });
  });
};
