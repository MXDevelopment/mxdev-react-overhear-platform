import { db } from '../firebase/firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

export interface Author {
  // Define the structure of your Author object here
  authorKey?: string;
  bio?: string;
  image?: string;
  name?: string;
  social?: string;
  userKey?: string;
  website?: string;
}

export const AuthorManager = {
  getAllAuthors: async (): Promise<Author[] | null> => {
    try {
      const snapshot = await getDocs(collection(db, 'authors'));
      return snapshot.docs.map(doc => ({ authorKey: doc.id, ...doc.data() }) as Author);
    } catch (error) {
      console.log("Error fetching authors:", error);
      return null;
    }
  },

  getAuthor: async (authorKey: string): Promise<Author | null> => {
    try {
      const authorDocRef = doc(db, 'authors', authorKey);
      const docSnapshot = await getDoc(authorDocRef);
      if (docSnapshot.exists()) {
        return { authorKey: docSnapshot.id, ...docSnapshot.data() } as Author;
      } else {
        console.log("No author found with the given key");
        return null;
      }
    } catch (error) {
      console.log("Error fetching author:", error);
      return null;
    }
  },

  // Additional functions for author management (e.g., update, delete) can be added here
};


