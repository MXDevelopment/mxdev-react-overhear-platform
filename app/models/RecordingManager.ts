import db from '../services/firebase/firebase';
import { collection, getDocs, getDoc, doc } from 'firebase/firestore';

interface Recording {
  albumKey?: string;
  collectionLog?: string;
  file?: string;
  key?: string;
  ownership?: string;
  pinKey?: string;
  tags?: string;
  whereQRFind?: string;
}

const RecordingManager = {
  observeRecordings: async (): Promise<Recording[]> => {
    try {
      const querySnapshot = await getDocs(collection(db, 'recordings'));
      const recordings: Recording[] = [];
      querySnapshot.forEach((docSnapshot) => {
        const recording = { key: docSnapshot.id, ...docSnapshot.data() } as Recording;
        recordings.push(recording);
      });
      return recordings;
    } catch (error) {
      console.log("Error getting recordings:", error);
      return [];
    }
  },

  getRecording: async (recordingKey: string): Promise<Recording | null> => {
    try {
      const docRef = doc(db, 'recordings', recordingKey);
      const docSnapshot = await getDoc(docRef);
      if (!docSnapshot.exists()) {
        console.log("No recording found");
        return null;
      }
      return { key: docSnapshot.id, ...docSnapshot.data() } as Recording;
    } catch (error) {
      console.log("Error fetching recording:", error);
      return null;
    }
  }
};

export default RecordingManager;