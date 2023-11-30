// Import necessary types
import { Location } from './Location'; 
import { CollectionLog } from './CollectionLog'; 
import { IRecordingFile } from './RecordingFile'; 
import { IOwnership } from './Ownership'; 
import { Qr } from './Qr'; 
import { RecordingTags } from './RecordingTags'; 
import { Author } from './Author'; 
import { IAdminMessage } from './AdminMessage';


// Define the PinEventType enum if needed
enum PinEventType {
    onEntryRegion,
    // ... other event types
}

export class AdminMessageViewModel {
    key?: string;
    title?: string;
    project?: string;
    radius: number; // Representing CLLocationDistance
    eventType: PinEventType;
    isCollected: boolean | null = null;
    iconURL?: string;
    isAdminMessage: boolean = false;
    collectionLog?: CollectionLog;
    file?: IRecordingFile;
    location?: Location;
    ownership?: IOwnership;
    qr?: Qr;
    tags?: RecordingTags;
    isAvailable?: boolean;
    
    // Author Details
    bioDescription?: string | null;
    artistLabel?: string | null;
    authorWebsite?: string | null;
    authorImage?: string | null;

    constructor(pin?: IAdminMessage, author?: Author) {
        this.radius = pin?.location?.radius || 0;
        this.eventType = PinEventType.onEntryRegion;
        this.iconURL = pin?.pinIcon;
        this.collectionLog = pin?.collectionLog;
        this.file = pin?.file;
        this.location = pin?.location;
        this.ownership = pin?.ownership;
        this.qr = pin?.qr;
        this.isAvailable = pin?.isAvailable;
        this.key = pin?.pinKey;
        this.title = pin?.file?.title;
        this.project = pin?.project;
        this.bioDescription = author?.bio || null;
        this.artistLabel = author?.name || null;
        this.authorWebsite = author?.website || null;
        this.authorImage = author?.image || null;
    }

    // Add methods as needed
}
