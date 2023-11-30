import { CollectionLog } from "./CollectionLog";
import { IOwnership } from "./Ownership";
import { IRecordingFile } from "./RecordingFile";
import { RecordingTags } from "./RecordingTags";

export class IRecording {
    albumKey?: string;
    collectionLog?: CollectionLog;
    file?: IRecordingFile;
    key?: string;
    ownership?: IOwnership;
    pinKey?: string;
    tags?: RecordingTags;
    whereQRFind?: string;
    pinIcon?: string;
}