import { DocumentData } from 'firebase/firestore';
import { IGeoFenceQR } from './GeoFenceQR';

export interface Project {
    key?: DocumentData;
    projectName?: string;
    projectOwner?: string;
    shortDescription?: string;
    website?: string;
    icon?: string;
    geoFenceQR?: IGeoFenceQR;
    pins?: string[];
    permission?: string[];
    isAvailable?: boolean;
    isQREnabled?: boolean;
    isDeliverPinsSequentially?: boolean;
    isSequentialEnabled?: boolean;
}