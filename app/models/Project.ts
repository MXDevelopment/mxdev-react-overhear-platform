import { DocumentData } from '@firebase/firestore-types'; // Import the appropriate Firestore types
import { GeoFenceQR } from './GeoFenceQR';

export interface Project {
    key?: DocumentData;
    projectName?: string;
    projectOwner?: string;
    shortDescription?: string;
    website?: string;
    icon?: string;
    geoFenceQR?: GeoFenceQR;
    pins?: string[];
    permission?: string[];
    // tags?: ProjectTags;
    isAvailable?: boolean;
    isQREnabled?: boolean;
    isDeliverPinsSequentially?: boolean;
    isSequentialEnabled?: boolean;
}