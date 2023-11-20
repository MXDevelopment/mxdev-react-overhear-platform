import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

const db = firebase.firestore();

interface Author {
  // Define the structure of your Author object here
  key: string;
  // Other properties of the Author
}

const AuthorManager = {
  getAllAuthors: async (): Promise<Author[] | null> => {
    try {
      const snapshot = await db.collection('authors').get();
      return snapshot.docs.map(doc => doc.data() as Author);
    } catch (error) {
      console.log("Error fetching authors:", error);
      return null;
    }
  },

  getAuthor: async (authorKey: string): Promise<Author | null> => {
    try {
      const doc = await db.collection('authors').doc(authorKey).get();
      if (doc.exists) {
        return doc.data() as Author;
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

export default AuthorManager;
