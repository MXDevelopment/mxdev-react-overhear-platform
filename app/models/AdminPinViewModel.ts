// Import necessary types
import { Location, GeoPointModel } from './Location'; // Adjust the path as needed
import { CollectionLog } from './CollectionLog'; // Adjust the path as needed
import { File } from './RecordingFile'; // Adjust the path as needed
import { Ownership } from './Ownership'; // Adjust the path as needed
import { Qr } from './Qr'; // Adjust the path as needed
import { RecordingTags } from './RecordingTags'; // Adjust the path as needed
import { Author } from './Author'; // Adjust the path as needed
import { AdminMessagePin } from './AdminMessagePin';


// Define the PinEventType enum if needed
enum PinEventType {
    onEntryRegion,
    // ... other event types
}

export class AdminPinViewModel {
    key?: string;
    title?: string;
    project?: string;
    radius: number; // Representing CLLocationDistance
    eventType: PinEventType;
    isCollected: boolean | null = null;
    iconURL?: string;
    isAdminMessage: boolean = false;
    collectionLog?: CollectionLog;
    file?: File;
    location?: Location;
    ownership?: Ownership;
    qr?: Qr;
    tags?: RecordingTags;
    isAvailable?: boolean;
    
    // Author Details
    bioDescription?: string;
    artistLabel?: string;
    authorWebsite?: string;
    authorImage?: string;

    constructor(pin?: AdminMessagePin, author?: Author) {
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
