import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import { auth } from '../firebase/firebase.config';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  // -------------------
  // Email/Password SignUp
  // -------------------
  const signUp = async (name, email, password, photoURL) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name, photoURL });

    // Save user to MongoDB
    await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, photoURL }),
    });

    setUser({ name, email, photoURL });
    return userCredential;
  };

  // -------------------
  // Email/Password Login
  // -------------------
  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    const response = await fetch(`http://localhost:3000/users?email=${email}`);
    const data = await response.json();
    setUser(data[0]);

    return userCredential;
  };

  // -------------------
  // Google Sign-In
  // -------------------
  const googleSignIn = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const gUser = result.user;

    const userData = {
      name: gUser.displayName,
      email: gUser.email,
      photoURL: gUser.photoURL
    };

    // Save/update user in MongoDB
    await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    setUser(userData);
    return gUser;
  };

  // -------------------
  // Logout
  // -------------------
  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  // -------------------
  // Listen to auth state
  // -------------------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const response = await fetch(`http://localhost:3000/users?email=${currentUser.email}`);
        const data = await response.json();
        setUser(data[0]);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signUp, login, logout, googleSignIn }}>
      {children}
    </AuthContext.Provider>
  );
};
