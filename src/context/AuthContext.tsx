import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  auth,
  signInWithGoogle,
  signInWithEmail,
  signUpWithEmail,
  logoutUser,
  saveUserAcademicData,
  fetchUserAcademicData,
  onAuthStateChanged,
  User,
  UserAcademicData,
} from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isSyncing: boolean;
  lastSynced: Date | null;
  error: string | null;
  login: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  signupWithEmail: (email: string, pass: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
  syncDataToCloud: (data: UserAcademicData) => Promise<void>;
  loadDataFromCloud: () => Promise<UserAcademicData | null>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSynced, setLastSynced] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    setError(null);
    try {
      const loggedUser = await signInWithGoogle();
      if (loggedUser) {
        setUser(loggedUser);
      }
    } catch (err: any) {
      const message = err?.message || 'Failed to sign in with Google.';
      setError(message);
    }
  };

  const loginWithEmail = async (email: string, pass: string) => {
    setError(null);
    try {
      const loggedUser = await signInWithEmail(email, pass);
      if (loggedUser) {
        setUser(loggedUser);
      }
    } catch (err: any) {
      const message = err?.message || 'Failed to sign in with email.';
      setError(message);
      throw err;
    }
  };

  const signupWithEmail = async (email: string, pass: string, name?: string) => {
    setError(null);
    try {
      const newUser = await signUpWithEmail(email, pass, name);
      if (newUser) {
        setUser(newUser);
      }
    } catch (err: any) {
      const message = err?.message || 'Failed to create account.';
      setError(message);
      throw err;
    }
  };

  const logout = async () => {
    setError(null);
    try {
      await logoutUser();
      setUser(null);
      setLastSynced(null);
    } catch (err: any) {
      setError(err?.message || 'Failed to sign out.');
    }
  };

  const syncDataToCloud = async (data: UserAcademicData) => {
    if (!user) return;
    setIsSyncing(true);
    setError(null);
    try {
      await saveUserAcademicData(user.uid, data);
      setLastSynced(new Date());
    } catch (err: any) {
      const isOffline =
        err?.code === 'unavailable' ||
        (typeof err?.message === 'string' && err.message.toLowerCase().includes('offline'));
      if (isOffline) {
        console.info('Academic records saved locally; will sync to cloud when connection is restored.');
      } else {
        console.error('Cloud sync error:', err);
        setError('Could not sync data to cloud. Check internet connection.');
      }
    } finally {
      setIsSyncing(false);
    }
  };

  const loadDataFromCloud = async (): Promise<UserAcademicData | null> => {
    if (!user) return null;
    setError(null);
    try {
      return await fetchUserAcademicData(user.uid);
    } catch (err: any) {
      const isOffline =
        err?.code === 'unavailable' ||
        (typeof err?.message === 'string' && err.message.toLowerCase().includes('offline'));
      if (isOffline) {
        console.info('Operating in offline mode. Loading cached academic records.');
      } else {
        console.error('Cloud fetch error:', err);
        setError('Could not load your saved academic records.');
      }
      return null;
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isSyncing,
        lastSynced,
        error,
        login,
        loginWithEmail,
        signupWithEmail,
        logout,
        syncDataToCloud,
        loadDataFromCloud,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
