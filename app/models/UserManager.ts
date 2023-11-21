import db from '../services/firebase/firebase'; 
import { doc, getDoc } from 'firebase/firestore';


interface User {
  userKey?: string;
  bio?: string;
  fcmToken?: string;
  image?: string;
  name?: string;
  recordings: string[];
  social?: string;
  username?: string;
}
const UserManager = {
  getCurrentUser: async (userId: string): Promise<User | null> => {
    try {
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        console.log("No user found");
        return null;
      }
      console.log("Current user found");
      return { userKey: userDoc.id, ...userDoc.data() } as User; // Cast to User class
    } catch (error) {
      console.log("Unable to get User:", error);
      return null;
    }
  }
};

export default UserManager;
