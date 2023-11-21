// Pin.ts
// Detailed TypeScript version of the Swift PinViewModel and PinRealm classes for React Native

import { LatLng } from 'react-native-maps'; // Assuming you are using react-native-maps for map-related functionalities

export enum PinEventType {
  OnEntryRegion = "On Entry Region",
  OnExitRegion = "On Exit Region",
}

export interface IPin {
  radius: number;
  eventType: PinEventType;
  coordinate?: LatLng;
  albumKey?: string;
  albumName?: string;
  pinDescription?: string;
  isAvailable?: boolean;
  location?: Location; // Define ILocation according to your app's needs
  name?: string;
  // ... other properties as in your Swift class
}

export class Pin {
  radius: number;
  eventType: PinEventType;
  coordinate?: LatLng;
  // ... other properties as in your Swift class

  constructor(pin: IPin) {
    this.radius = pin.radius;
    this.eventType = pin.eventType;
    this.coordinate = pin.coordinate;
    // ... initialize other properties
  }

  // Methods from your Swift class translated to TypeScript
  // Example: clampRadius, getAuthorDetails, etc.
  clampRadius(maxRadius: number) {
    this.radius = Math.min(this.radius, maxRadius);
  }

  // ... other methods
}

// Realm schema for Pin
// You would need to define this according to how you want to store your data in Realm
// Example:
export class PinRealm {
  // ... properties and methods for Realm schema
}

// You would also need to implement the logic for methods like `getAllPins` and others
// Note: Some methods might need significant changes due to platform differences
