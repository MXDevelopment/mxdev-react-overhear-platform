import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import '@react-native-firebase/auth';

const db = firebase.firestore();

// Define interfaces for your user and other types as needed
interface FirebaseUser {
  userKey: string;
  // Add other user properties
}

interface UserViewModel {
  key: string;
  // Add other user view model properties
}

const UserManager = {
  addNewUser: async (user: FirebaseUser): Promise<boolean> => {
    try {
      await db.collection('users').doc(user.userKey).set(user);
      // Additional logic to save current user can be implemented here
      return true;
    } catch (error) {
      console.log("Error adding new user:", error);
      return false;
    }
  },

  updateUser: async (user: UserViewModel): Promise<void> => {
    try {
      await db.collection('users').doc(user.key).set(user);
    } catch (error) {
      console.log("Error updating user:", error);
    }
  },

  registerFCMToken: async (userId: string, fcmToken: string): Promise<void> => {
    try {
      const userDoc = await db.collection('users').doc(userId).get();
      if (userDoc.exists) {
        await db.doc(`/users/${userId}`).update({ fcmToken: fcmToken });
      }
    } catch (error) {
      console.log("Document error:", error);
    }
  },

  removeFCMToken: async (userId: string): Promise<void> => {
    try {
      await db.collection('users').doc(userId).update({ fcmToken: firebase.firestore.FieldValue.delete() });
    } catch (error) {
      console.log("Error removing FCM Token:", error);
    }
  },

  getCurrentUser: async (userId: string): Promise<FirebaseUser | null> => {
    try {
      const userDoc = await db.collection('users').doc(userId).get();
      if (!userDoc.exists) {
        console.log("No user found");
        return null;
      }
      console.log("Current user found");
      return userDoc.data() as FirebaseUser;
    } catch (error) {
      console.log("Unable to get User:", error);
      return null;
    }
  }
};

export default UserManager;
