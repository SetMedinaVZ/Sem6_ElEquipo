import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, firestore } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userDoc, setUserDoc] = useState(null);
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  async function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/user.birthday.read");
  
    return signInWithPopup(auth, provider)
      .then((userCredential) => {
        if (userCredential.user) {
          const user = userCredential.user;
          return setDoc(doc(firestore, "users", userCredential.user.uid), {
            nombre: user.displayName,
            email: user.email,
          });
        }
      })
      .catch((error) => {
        console.error("Error writing user document: ", error);
      });
  }

  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    return onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(firestore, "users", user.uid);
        const userSnap = await getDoc(userRef);
        let userData = userSnap.data();
        if (userData) {
          setUserDoc(userData);
        }
      }
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);

  const value = {
    currentUser,
    userDoc,
    signup,
    login,
    loginWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
