import { Recording } from './Recording'; 
import { CollectionLog } from './CollectionLog'; 
import { Ownership } from './Ownership'; 
import { RecordingTags } from './RecordingTags'; 
import { RecordingFile } from './RecordingFile'; 
import { AdminMessagePin } from './AdminMessagePin'; 

class RecordingViewModel {
  albumKey: string | null;
  collectionLog: CollectionLog | null;
  recordingFile: RecordingFile | null; 
  pinKey: string | null;
  title: string | null;
  ownership: Ownership | null;
  tags: RecordingTags | null;
  whereQRFind: string | null;
  key: string | null;

  constructor(recording?: Recording, adminPin?: AdminMessagePin) {
    this.albumKey = recording?.albumKey ?? null;
    this.collectionLog = recording?.collectionLog ?? null;
    this.recordingFile = recording?.file ?? null; 
    this.pinKey = recording?.pinKey ?? null;
    this.ownership = recording?.ownership ?? null;
    this.tags = recording?.tags ?? null;
    this.title = this.recordingFile?.title ?? null; 
    this.whereQRFind = recording?.whereQRFind ?? null;
    this.key = recording?.key ?? null;

    if (adminPin) {
      this.albumKey = "";
      this.collectionLog = adminPin.collectionLog ?? null;
      this.recordingFile = adminPin.file ?? null; 
      this.pinKey = adminPin.pinKey ?? null;
      this.ownership = adminPin.ownership ?? null;
      this.title = this.recordingFile?.title ?? null; 
      this.whereQRFind = "";
    }
  }
}

export default RecordingViewModel;
