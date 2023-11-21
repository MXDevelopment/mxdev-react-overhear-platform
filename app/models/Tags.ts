// Tags.ts
// Equivalent of the Swift Tags and TagsRealm structures for React Native

import Realm from 'realm';

// TypeScript interface for the Tags model
export interface ITags {
  locationTags: string[];
}

// Realm object schema for Tags
export class TagsRealm extends Realm.Object {
  locationTags: Realm.List<string> = new Realm.List<string>();

  static schema: Realm.ObjectSchema = {
    name: 'Tags',
    properties: {
      locationTags: 'string[]',
    },
  };

  constructor(tags?: ITags) {
    super();
    if (tags) {
      this.locationTags = new Realm.List<string>(tags.locationTags);
    }
  }
}

// Export the schema for use in your Realm database setup
export const tagsSchema = TagsRealm.schema;
