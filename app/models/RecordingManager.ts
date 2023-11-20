import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

const db = firebase.firestore();

// Define TypeScript interfaces for your recording and other types as needed
interface Recording {
  key: string;
  // Add other recording properties
}

const RecordingManager = {
  observeRecordings: async (): Promise<Recording[]> => {
    try {
      const querySnapshot = await db.collection('recordings').get();
      const recordings: Recording[] = [];
      querySnapshot.forEach((doc) => {
        const recording = doc.data() as Recording;
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
      const doc = await db.collection('recordings').doc(recordingKey).get();
      if (!doc.exists) {
        console.log("No recording found");
        return null;
      }
      return doc.data() as Recording;
    } catch (error) {
      console.log("Error fetching recording:", error);
      return null;
    }
  }
};

export default RecordingManager;
