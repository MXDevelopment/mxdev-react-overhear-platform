import { db } from '../firebase/firebase';
import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
import { User, Author, IAdminMessage, AdminMessageManager, AuthorManager, UserManager } from '../models';
import { IRecording } from './Recording';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const RecordingManager = {
  observeRecordings: async (): Promise<IRecording[]> => {
    try {
      const querySnapshot = await getDocs(collection(db, 'recordings'));
      const recordings: IRecording[] = [];
      querySnapshot.forEach((docSnapshot) => {
        let recording = { key: docSnapshot.id, ...docSnapshot.data() } as IRecording;
        recordings.push(recording);
      });
      return recordings;
    } catch (error) {
      console.log("Error getting recordings:", error);
      return [];
    }
  },

  getRecording: async (recordingKey: string): Promise<IRecording| null> => {
    try {
      const docRef = doc(db, 'recordings', recordingKey);
      const docSnapshot = await getDoc(docRef);
      if (!docSnapshot.exists()) {
        console.log("No recording found");
        return null;
      }
      return { key: docSnapshot.id, ...docSnapshot.data() } as IRecording;
    } catch (error) {
      console.log("Error fetching recording:", error);
      return null;
    }
  },

  fetchRecordingsAndAuthors: async (userId: string): Promise<any[]> => {
    try {
      const fetchedAuthors: Author[] = await AuthorManager.getAllAuthors() || [];
      if (!userId) {
        return RecordingManager.fetchRecordingsForAnonymousUser();
      }

      const user: User | null = await UserManager.getCurrentUser(userId);
      if (user && user.recordings) {
        const recordingPromises = user.recordings.map((recordingKey: string) =>
          RecordingManager.getRecording(recordingKey)
        );
        const userRecordings: (IRecording | null)[] = await Promise.all(recordingPromises);
        const validRecordings: IRecording[] = userRecordings.filter((rec): rec is IRecording => rec !== null);

        const adminMessages: IAdminMessage[] = await AdminMessageManager.getAllAdminMessages();
        return RecordingManager.transformRecordings([...validRecordings, ...adminMessages], fetchedAuthors);
      } else {
        const adminMessages: IAdminMessage[] = await AdminMessageManager.getAllAdminMessages();
        return RecordingManager.transformRecordings(adminMessages, fetchedAuthors);
      }
    } catch (error) {
      console.error("Error in fetchRecordingsAndAuthors:", error);
      throw error;
    }
  },

  transformRecordings: (items: (IRecording | IAdminMessage)[], authors: Author[]): any[] => {
    return items.map((item: IRecording | IAdminMessage) => {
      // Provide a default value if key or pinKey is undefined
      const itemKey: string = 'key' in item ? (item.key || 'default-key') : (item.pinKey || 'default-pinKey');
      
      // Provide a default value if recordingAuthor or authorKey is undefined or null
      const recordingAuthor: string = item.ownership?.recordingAuthor || item.ownership?.recordingAuthor || 'default-author';
  
      const authorDetails: Author | undefined = authors.find((author: Author) => author.authorKey === recordingAuthor);
      return {
        key: itemKey,
        title: item.file?.title || 'No Title',
        description: item.file?.description || 'No Description',
        pinIcon: item.pinIcon || 'defaultIcon',
        authorName: authorDetails?.name,
        authorWebsite: authorDetails?.website,
        authorImage: authorDetails?.image,
        authorBio: authorDetails?.bio,
      };
    });
  },

  fetchRecordingsForAnonymousUser: async (): Promise<any[]> => {
    try {
      const storedRecordings = await AsyncStorage.getItem('anonymousRecordings');
      if (storedRecordings) {
        const parsedRecordings = JSON.parse(storedRecordings);
        const adminMessages = await AdminMessageManager.getAllAdminMessages();
        return RecordingManager.transformRecordings([...parsedRecordings, ...adminMessages], []);
      }
      return [];
    } catch (error) {
      console.error("Error fetching recordings for anonymous user:", error);
      throw error;
    }
  },
};