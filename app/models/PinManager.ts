import { db } from '../firebase/firebase';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { ITags } from './Tags';

// Define TypeScript interfaces for your Pin and other types as needed
interface Pin {
  albumKey: string;
  pinDescription: string;
  isAvailable: boolean;
  location: Location;
  name: string;
  pinIcon: string;
  pinKey: string;
  pinType: string;
  project: string;
  qrPath: string;
  tags: ITags;
  sequentialOrderLogic: string;
  sequentialOrderNum: number;
  isDeliverPinsSequentially: boolean;
}

interface UserViewModel {
  key?: string | null;
  bio?: string | null;
  username?: string | null;
  image?: string | null;
  name?: string | null;
  recordings: string[];
  social?: string | null;
  fcmToken?: string | null;
}

const PinManager = {
  observePins: async (projectKey: string): Promise<Pin[]> => {
    try {
      const pinsQuery = query(collection(db, 'pins'), where('project', '==', projectKey));
      const querySnapshot = await getDocs(pinsQuery);
      const pins: Pin[] = [];
      querySnapshot.forEach((docSnapshot) => {
        const pin = { pinKey: docSnapshot.id, ...docSnapshot.data() } as Pin;
        if (pin.isAvailable) {
          pins.push(pin);
        }
      });
      return pins;
    } catch (error) {
      console.log("Error observing pins:", error);
      return [];
    }
  },

  collectPin: async (pin: Pin, user: UserViewModel): Promise<void> => {
    try {
      if (!user.key) {
        console.error("User key is undefined");
        return;
      }
  
      if (!user.recordings.includes(pin.pinKey)) {
        user.recordings.push(pin.pinKey);
        const userDocRef = doc(db, 'users', user.key);
        const updatedUser = { recordings: user.recordings }; 
        await updateDoc(userDocRef, updatedUser);
      }
    } catch (error) {
      console.log("Error collecting pin:", error);
    }
  },
  
  removePin: async (pin: Pin, user: UserViewModel): Promise<void> => {
    try {
      if (!user.key) {
        console.error("User key is undefined");
        return;
      }
  
      user.recordings = user.recordings.filter(pinKey => pinKey !== pin.pinKey);
      const userDocRef = doc(db, 'users', user.key);
      const updatedUser = { recordings: user.recordings }; 
      await updateDoc(userDocRef, updatedUser);
    } catch (error) {
      console.log("Error removing pin:", error);
    }
  },
  

  // Add other pin-related methods as needed
};

export default PinManager;
