import { types, flow, Instance, SnapshotOut } from "mobx-state-tree";
import { 
    getAuth, 
    signInAnonymously, 
    signInWithEmailAndPassword, 
    onAuthStateChanged,
    signOut, 
    signInWithPopup, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword
  } from "firebase/auth";
  import { 
    getFirestore, 
    doc, 
    getDoc, 
    setDoc, 
    updateDoc, 
    serverTimestamp, 
    DocumentSnapshot, 
    DocumentReference 
  } from 'firebase/firestore';
  import UserDao from './UserDao';
  import { UserViewModel } from './UserViewModel';
import { to } from "app/utils/to";
 
  export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    authToken: types.maybeNull(types.string),
    authEmail: types.optional(types.string, ""),
    userId: types.maybeNull(types.string),
    // ... other properties
  })
  .views((self) => ({
    get validationError() {
      if (self.authEmail.length === 0) return "Email can't be blank";
      if (self.authEmail.length < 6) return "Email must be at least 6 characters";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(self.authEmail))
        return "Email must be a valid email address";
      return "";
    },
    // ... other views if any
  }))
  .actions((self) => ({
 
    setAuthToken(value: string | null) {
  self.authToken = value;
  },
    setAuthEmail(value: string) {
      self.authEmail = value.replace(/ /g, "");
    },
    logout: flow(function* () {
      try {
        yield signOut(getAuth());
        self.authToken = null;
        self.authEmail = "";
      } catch (error) {
        console.error("Logout failed", error);
        // Handle logout error
      }
    }),
    signInWithEmailAndPassword: flow(function* (email: string, password: string) {
      const [signInError, authResult] = yield to(signInWithEmailAndPassword(getAuth(), email, password));
  
      if (signInError) {
          console.error('Email/password sign-in failed', signInError);
          self.authToken = null; // Explicitly set authToken to null on error
          self.userId = null; // Also clear the userId
          return;
      }
  
      if (authResult.user) {
          const token = yield authResult.user.getIdToken();
          self.authToken = token; // Directly modifying the state
          self.authEmail = email; // Directly modifying the state
          self.userId = authResult.user.uid; // Store the userId
  
          const userRef: DocumentReference = doc(getFirestore(), 'Users', authResult.user.uid);
          const docSnap: DocumentSnapshot = yield getDoc(userRef);
  
          if (!docSnap.exists()) {
              yield setDoc(userRef, { 
                  email: authResult.user.email,
                  createdAt: serverTimestamp(),
                  // ... other initial user data
              });
          } else {
              yield updateDoc(userRef, {
                  lastLoginAt: serverTimestamp(),
                  // ... other fields to update
              });
          }
      }
  }),
  
  signupWithEmailAndPassword: flow(function* (email: string, password: string) {
      const [signupError, userCredential] = yield to(
          createUserWithEmailAndPassword(getAuth(), email, password)
      );
  
      if (signupError) {
          console.error('Sign up failed', signupError);
          // Handle error
          return;
      }
  
      if (userCredential.user) {
          const token = yield userCredential.user.getIdToken();
          self.authToken = token; // Directly modifying the state
          self.authEmail = email; // Directly modifying the state
          self.userId = userCredential.user.uid;
  
          const userRef: DocumentReference = doc(getFirestore(), 'Users', userCredential.user.uid);
  
          yield setDoc(userRef, { 
              email: userCredential.user.email,
              createdAt: serverTimestamp(),
              // ... other initial user data
          });
      }
  }),
    
    anonymousSignIn: flow(function* () {
        const [anonSignInError, authResult] = yield to(signInAnonymously(getAuth()));
        if (anonSignInError) {
            console.error('Anonymous sign-in failed', anonSignInError);
            // Handle anonymous sign-in error
            return;
        }
        const user: UserViewModel = {
          key: authResult.user.uid,
          bio: undefined,
          username: undefined,
          image: undefined,
          name: undefined,
          recordings: [],
          social: undefined,
          fcmToken: undefined
        };
        UserDao.shared.saveCurrentUserWithFB(user);
    }),

    checkAuthentication: flow(function* () {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                self.authEmail = user.email || "";
                self.authToken = user.uid;
            } else {
                self.authToken = null;
                self.authEmail = "";
            }
        });
    }),

    getCurrentUserToken: flow(function* () {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            const [tokenError, token] = yield to(user.getIdToken());
            if (tokenError) {
                console.error("Error fetching user token:", tokenError);
                return null;
            }
            return token;
        }
        return null;
    }),

    signInWithGoogle: flow(function* () {
        const provider = new GoogleAuthProvider();
        const [googleSignInError, authResult] = yield to(signInWithPopup(getAuth(), provider));
        if (googleSignInError) {
            console.error('Google sign-in failed', googleSignInError);
            // Handle error, update state as needed
            return;
        }
        if (authResult.user) {
            const token = yield authResult.user.getIdToken();
            self.authToken = token;
            self.userId = authResult.user.uid;
            self.authEmail = authResult.user.email;
            // Handle additional user data or state updates
        }
    }),
  }));

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> {}
export interface AuthenticationStoreSnapshot extends SnapshotOut<typeof AuthenticationStoreModel> {}
