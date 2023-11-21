import db from '../services/firebase/firebase'; // Import Firestore instance
import { collection, getDocs } from 'firebase/firestore';

// Define TypeScript interfaces for your tags
interface PinTag {
  // Define properties of PinTag
}

interface ProjectTag {
  // Define properties of ProjectTag
}

interface AuthorTag {
  // Define properties of AuthorTag
}

interface RecordingTag {
  // Define properties of RecordingTag
}

interface AdminTag {
  // Define properties of AdminTag
}

const TagManager = {
  observeAllPinTags: async (): Promise<PinTag[]> => {
    try {
      const querySnapshot = await getDocs(collection(db, 'pinTags'));
      return querySnapshot.docs.map(doc => ({ key: doc.id, ...doc.data() }) as PinTag);
    } catch (error) {
      console.error("Error fetching pin tags:", error);
      return [];
    }
  },

  observeAllProjectTags: async (): Promise<ProjectTag[]> => {
    try {
      const querySnapshot = await getDocs(collection(db, 'projectTags'));
      return querySnapshot.docs.map(doc => ({ key: doc.id, ...doc.data() }) as ProjectTag);
    } catch (error) {
      console.error("Error fetching project tags:", error);
      return [];
    }
  },

  observeAllAuthorTags: async (): Promise<AuthorTag[]> => {
    try {
      const querySnapshot = await getDocs(collection(db, 'authorTags'));
      return querySnapshot.docs.map(doc => ({ key: doc.id, ...doc.data() }) as AuthorTag);
    } catch (error) {
      console.error("Error fetching author tags:", error);
      return [];
    }
  },

  observeAllRecordingTags: async (): Promise<RecordingTag[]> => {
    try {
      const querySnapshot = await getDocs(collection(db, 'recordingTags'));
      return querySnapshot.docs.map(doc => ({ key: doc.id, ...doc.data() }) as RecordingTag);
    } catch (error) {
      console.error("Error fetching recording tags:", error);
      return [];
    }
  },

  observeAdminTags: async (): Promise<AdminTag[]> => {
    try {
      const querySnapshot = await getDocs(collection(db, 'adminTags'));
      return querySnapshot.docs.map(doc => ({ key: doc.id, ...doc.data() }) as AdminTag);
    } catch (error) {
      console.error("Error fetching admin tags:", error);
      return [];
    }
  }
};

export default TagManager;
