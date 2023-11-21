// ProjectTags.ts
// Equivalent of the Swift ProjectTags and ProjectTagsRealm structures for React Native

import Realm from 'realm';

// TypeScript interface for the ProjectTags model
export interface ProjectTags {
  contentTag?: string;
  subjectTag: string[];
}

// Realm object schema for ProjectTags
export class ProjectTagsRealm extends Realm.Object {
  contentTag: string | null = null;
  subjectTag: Realm.List<string> = new Realm.List<string>();

  static schema: Realm.ObjectSchema = {
    name: 'ProjectTags',
    properties: {
      contentTag: 'string?',
      subjectTag: 'string[]',
    },
  };

  constructor(tags?: ProjectTags) {
    super();
    if (tags) {
      this.contentTag = tags.contentTag || null;
      this.subjectTag = new Realm.List<string>(tags.subjectTag);
    }
  }
}

// Export the schema for use in your Realm database setup
export const projectTagsSchema = ProjectTagsRealm.schema;
