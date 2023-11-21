// CollectionLog.ts
// Equivalent of the Swift CollectionLog and CollectionLogRealm structures for React Native

import Realm from 'realm';

// TypeScript interface for the CollectionLog model
export interface CollectionLog {
  timesCollected?: number;
  timesPlayed?: number;
  usersCollected: string[];
  usersRemoved: string[];
  usersNeverCollect: string[];
}

// Realm object schema for CollectionLog
export class CollectionLogRealm extends Realm.Object {
  timesCollected: Realm.Optional<number> = new Realm.Optional<number>();
  timesPlayed: Realm.Optional<number> = new Realm.Optional<number>();
  usersCollected: Realm.List<string> = new Realm.List<string>();
  usersRemoved: Realm.List<string> = new Realm.List<string>();
  usersNeverCollect: Realm.List<string> = new Realm.List<string>();

  static schema: Realm.ObjectSchema = {
    name: 'CollectionLog',
    properties: {
      timesCollected: 'int?',
      timesPlayed: 'int?',
      usersCollected: 'string[]',
      usersRemoved: 'string[]',
      usersNeverCollect: 'string[]',
    },
  };

  constructor(collectionLog?: CollectionLog) {
    super();
    if (collectionLog) {
      this.timesCollected = new Realm.Optional<number>(collectionLog.timesCollected);
      this.timesPlayed = new Realm.Optional<number>(collectionLog.timesPlayed);
      this.usersCollected = new Realm.List<string>(collectionLog.usersCollected);
      this.usersRemoved = new Realm.List<string>(collectionLog.usersRemoved);
      this.usersNeverCollect = new Realm.List<string>(collectionLog.usersNeverCollect);
    }
  }
}

// Export the schema for use in your Realm database setup
export const collectionLogSchema = CollectionLogRealm.schema;
