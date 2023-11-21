import { CollectionLog } from "./CollectionLog";
import { Ownership } from "./Ownership";
import { IRecordingFile } from "./RecordingFile";
import { RecordingTags } from "./RecordingTags";

export class Recording {
    albumKey?: string;
    collectionLog?: CollectionLog;
    file?: IRecordingFile;
    key?: string;
    ownership?: Ownership;
    pinKey?: string;
    tags?: RecordingTags;
    whereQRFind?: string;
}