import { CollectionLog } from "./CollectionLog";
import { Ownership } from "./Ownership";
import { RecordingTags } from "./RecordingTags";

export class Recording {
    albumKey?: string;
    collectionLog?: CollectionLog;
    file?: File;
    key?: string;
    ownership?: Ownership;
    pinKey?: string;
    tags?: RecordingTags;
    whereQRFind?: string;
}