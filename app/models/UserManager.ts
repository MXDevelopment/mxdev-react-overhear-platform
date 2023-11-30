import { db } from '../firebase/firebase'; 
import { doc, getDoc } from 'firebase/firestore';

export interface User {
  userKey?: string;
  bio?: string;
  fcmToken?: string;
  image?: string;
  name?: string;
  recordings: string[];
  social?: string;
  username?: string;
}

export const UserManager = {
  /**
   * Fetches the current user's data from Firestore.
   * The userId should be obtained from the AuthenticationStore after successful authentication.
   * @param userId The UID of the user, as obtained from Firebase Authentication.
   * @returns A Promise that resolves to the User data or null if not found.
   */
  getCurrentUser: async (userId: string): Promise<User | null> => {
    try {
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        console.log("No user found");
        return null;
      }
      console.log("Current user found");
      return { userKey: userDoc.id, ...userDoc.data() } as User;
    } catch (error) {
      console.log("Unable to get User:", error);
      return null;
    }
  }
};

export default UserManager;