import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

const db = firebase.firestore();

// Define TypeScript interfaces for your Pin and other types as needed
interface Pin {
  key: string;
  isAvailable: boolean;
  // Add other pin properties
}

interface UserViewModel {
  key: string;
  pins: string[];
  // Add other user view model properties
}

const PinManager = {
  observePins: async (projectKey: string): Promise<Pin[]> => {
    try {
      const querySnapshot = await db.collection('pins').where('project', '==', projectKey).get();
      const pins: Pin[] = [];
      querySnapshot.forEach((doc) => {
        const pin = doc.data() as Pin;
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
      // Logic to handle the collection of a pin
      if (!user.pins.includes(pin.key)) {
        user.pins.push(pin.key);
        // Update the user in the database
        await db.collection('users').doc(user.key).update(user);
      }
      // Additional logic to update the pin
    } catch (error) {
      console.log("Error collecting pin:", error);
    }
  },

  removePin: async (pin: Pin, user: UserViewModel): Promise<void> => {
    try {
      // Logic to handle the removal of a pin
      user.pins = user.pins.filter(pinKey => pinKey !== pin.key);
      // Update the user in the database
      await db.collection('users').doc(user.key).update(user);
      // Additional logic to update the pin
    } catch (error) {
      console.log("Error removing pin:", error);
    }
  },

  // Add other pin-related methods as needed
};

export default PinManager;
