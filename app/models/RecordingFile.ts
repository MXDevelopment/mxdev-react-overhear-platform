// File.ts
// Equivalent of the Swift File and FileRealm structures for React Native

import Realm from 'realm';

// TypeScript interface for the File model
export interface IRecordingFile {
  audioLength?: string;
  description?: string;
  recordingPath?: string;
  audioURL?: string;
  title?: string;
}

// Realm object schema for File
export class FileRealm extends Realm.Object {
  audioLength?: string;
  description?: string;
  recordingPath?: string;
  title?: string;

  static schema: Realm.ObjectSchema = {
    name: 'RecordingFile',
    properties: {
      audioLength: 'string?',
      description: 'string?',
      recordingPath: 'string?',
      title: 'string?',
    },
  };

  constructor(file?: IRecordingFile) {
    super();
    if (file) {
      this.audioLength = file.audioLength;
      this.description = file.description;
      this.recordingPath = file.recordingPath;
      this.title = file.title;
    }
  }
}

// Export the schema for use in your Realm database setup
export const fileSchema = FileRealm.schema;
