import React, { createContext } from "react";
import {
  getAuth,
  updateProfile,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import { useState } from "react";
import { useEffect } from "react";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  // all States are here
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Provider login function is here
  const ProviderLogin = (provider) => {
    return signInWithPopup(auth, provider);
  };

  // email and password create user system

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // sign in with email and password system

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // update profile function

  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  // LogOut Function

  const logOut = () => {
    localStorage.removeItem("Photo-Phactory-Token");
    return signOut(auth);
  };

  // handle curent user

  useEffect(() => {
    const unsubscrib = onAuthStateChanged(auth, (currentUser) => {
      console.log("user inside auth state change", currentUser);
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscrib();
  }, []);

  // All auth information is here
  const authInfo = {
    user,
    loading,
    setLoading,
    updateUserProfile,
    ProviderLogin,
    logOut,
    createUser,
    signIn,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
