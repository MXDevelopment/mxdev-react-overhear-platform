// GeoFenceQR.ts
// Equivalent of the Swift GeoFenceQR and GeoFenceQRRealm structures for React Native

import Realm from 'realm';

// TypeScript interface for the GeoFenceQR model
export interface IGeoFenceQR {
  geoFencePolygon?: string;
  locationName?: string;
  locationQR?: string;
}

// Realm object schema for GeoFenceQR
export class GeoFenceQRRealm extends Realm.Object {
  geoFencePolygon?: string;
  locationName?: string;
  locationQR?: string;

  static schema: Realm.ObjectSchema = {
    name: 'GeoFenceQR',
    properties: {
      geoFencePolygon: 'string?',
      locationName: 'string?',
      locationQR: 'string?',
    },
  };

  constructor(geoFenceQR?: IGeoFenceQR) {
    super();
    if (geoFenceQR) {
      this.geoFencePolygon = geoFenceQR.geoFencePolygon;
      this.locationName = geoFenceQR.locationName;
      this.locationQR = geoFenceQR.locationQR;
    }
  }
}

// Export the schema for use in your Realm database setup
export const geoFenceQRSchema = GeoFenceQRRealm.schema;
