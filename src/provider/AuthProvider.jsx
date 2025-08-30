import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
// import { auth } from '../firebase.config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);

  // -------------------
  // Sign Up
  // -------------------
  const signUp = async (name, email, password, photoURL) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name, photoURL });

    // Save user to MongoDB (upsert)
    await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, photoURL }),
    });

    setUser({ name, email, photoURL });
    return userCredential;
  };

  // -------------------
  // Login
  // -------------------
  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    // Fetch MongoDB user data
    const response = await fetch(`http://localhost:3000/users?email=${email}`);
    const data = await response.json();
    setUser(data[0]);

    return userCredential;
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
    <AuthContext.Provider value={{ user, loading, signUp, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
