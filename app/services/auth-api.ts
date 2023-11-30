// authUtils.ts

import {
  getAuth,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  signInAnonymously as firebaseSignInAnonymously,
  signOut as firebaseSignOut,
  UserCredential,
} from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase"; // Import auth from your Firebase configuration
import * as Google from "expo-google-app-auth";
import { to } from "../utils/to";

// Import environment variables from .env file
import { GOOGLE_IOS_CLIENT_ID, GOOGLE_ANDROID_CLIENT_ID } from "@env";

export async function signInWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
  return await firebaseSignInWithEmailAndPassword(getAuth(), email, password);
}

export async function signInAnonymously(): Promise<UserCredential> {
  return await firebaseSignInAnonymously(getAuth());
}

export async function signInWithGoogle(): Promise<UserCredential | null> {
  try {
    const accessToken = await getGoogleToken();
    const credentials = GoogleAuthProvider.credential(null, accessToken);
    return await signInWithPopup(auth, credentials);
  } catch (error) {
    console.error('Google sign-in failed', error);
    return null;
  }
}

export async function signOut(): Promise<void> {
  await firebaseSignOut(getAuth());
}

export async function getGoogleToken(): Promise<string | null> {
  const [error, result] = await to(
    Google.logInAsync({
      iosClientId: GOOGLE_IOS_CLIENT_ID,
      androidClientId: GOOGLE_ANDROID_CLIENT_ID,
      scopes: ["profile", "email"],
    })
  );

  if (error) {
    console.error("Google login error:", error.message);
    return null;
  }

  if (result.type === "success") {
    return result.accessToken;
  } else {
    console.error("Google login canceled");
    return null;
  }
}
