import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import '@react-native-firebase/auth';
import { User } from './User';

const db = firebase.firestore();

const UserManager = {
  // ... other methods ...

  getCurrentUser: async (userId: string): Promise<User | null> => {
    try {
      const userDoc = await db.collection('users').doc(userId).get();
      if (!userDoc.exists) {
        console.log("No user found");
        return null;
      }
      console.log("Current user found");
      return userDoc.data() as User; // Cast to User class
    } catch (error) {
      console.log("Unable to get User:", error);
      return null;
    }
  }
};

export default UserManager;
