import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import {
  initializeFirestore,
  getFirestore,
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { Semester, GradingSystemId } from '../types';

// Initialize Firebase App singleton
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Authentication
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

// Initialize Firestore with long-polling transport to reliably pass through proxies/sandboxes
const databaseId = firebaseConfig.firestoreDatabaseId || '(default)';
let firestoreInstance;
try {
  firestoreInstance = initializeFirestore(
    app,
    {
      experimentalForceLongPolling: true,
    },
    databaseId
  );
} catch {
  firestoreInstance = getFirestore(app, databaseId);
}
export const db = firestoreInstance;

export interface UserAcademicData {
  semesters: Semester[];
  systemId: GradingSystemId;
  targetPlanner?: {
    currentCgpa: string;
    targetCgpa: string;
    creditsEarned: string;
    nextCredits: string;
  };
  lastUpdated?: any;
}

/**
 * Trigger Google Sign In popup with comprehensive error handling
 */
export async function signInWithGoogle(): Promise<User | null> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: any) {
    if (error.code === 'auth/popup-closed-by-user') {
      console.info('Sign-in cancelled by user.');
      return null;
    }
    if (error.code === 'auth/popup-blocked') {
      throw new Error('Sign-in popup was blocked by your browser. Please allow popups for this site.');
    }
    console.error('Error signing in with Google:', error);
    throw error;
  }
}

/**
 * Sign in user with Email & Password
 */
export async function signInWithEmail(email: string, password: string): Promise<User> {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error: any) {
    if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
      throw new Error('Invalid email or password. Please check and try again.');
    }
    if (error.code === 'auth/invalid-email') {
      throw new Error('Please enter a valid email address.');
    }
    throw error;
  }
}

/**
 * Sign up user with Email & Password
 */
export async function signUpWithEmail(email: string, password: string, displayName?: string): Promise<User> {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName && result.user) {
      await updateProfile(result.user, { displayName });
    }
    return result.user;
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('An account already exists with this email. Please log in instead.');
    }
    if (error.code === 'auth/weak-password') {
      throw new Error('Password should be at least 6 characters.');
    }
    throw error;
  }
}

/**
 * Sign out current user
 */
export async function logoutUser(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error during signOut:', error);
    throw error;
  }
}

/**
 * Save academic data to Firestore for a specific user
 */
export async function saveUserAcademicData(userId: string, data: UserAcademicData): Promise<void> {
  try {
    const userDocRef = doc(db, 'users', userId);
    await setDoc(
      userDocRef,
      {
        semesters: data.semesters,
        systemId: data.systemId,
        targetPlanner: data.targetPlanner || null,
        lastUpdated: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error: any) {
    const isOffline =
      error?.code === 'unavailable' ||
      (typeof error?.message === 'string' && error.message.toLowerCase().includes('offline'));
    if (isOffline) {
      console.warn('Firestore is currently in offline mode. Changes will sync when online.');
      return;
    }
    console.error('Error saving user data to Firestore:', error);
    throw error;
  }
}

/**
 * Fetch academic data from Firestore for a specific user
 */
export async function fetchUserAcademicData(userId: string): Promise<UserAcademicData | null> {
  try {
    const userDocRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      return docSnap.data() as UserAcademicData;
    }
    return null;
  } catch (error: any) {
    const isOffline =
      error?.code === 'unavailable' ||
      (typeof error?.message === 'string' && error.message.toLowerCase().includes('offline'));
    if (isOffline) {
      console.warn('Firestore is currently in offline mode. Local state will be utilized.');
      return null;
    }
    console.error('Error fetching user data from Firestore:', error);
    throw error;
  }
}

export { onAuthStateChanged };
export type { User };
