import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';

interface AuthContextType {
  currentUser: User | null;
  isDemoAdmin: boolean;
  isAdmin: boolean;
  loading: boolean;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  loginDemoAdmin: () => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isDemoAdmin, setIsDemoAdmin] = useState<boolean>(() => {
    return localStorage.getItem('uztimes_demo_admin') === 'true';
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithEmail = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass);
    setIsDemoAdmin(false);
    localStorage.removeItem('uztimes_demo_admin');
  };

  const loginDemoAdmin = () => {
    setIsDemoAdmin(true);
    localStorage.setItem('uztimes_demo_admin', 'true');
  };

  const logout = async () => {
    if (currentUser) {
      await signOut(auth);
    }
    setIsDemoAdmin(false);
    localStorage.removeItem('uztimes_demo_admin');
  };

  const isAdmin = Boolean(currentUser || isDemoAdmin);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isDemoAdmin,
        isAdmin,
        loading,
        loginWithEmail,
        loginDemoAdmin,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
