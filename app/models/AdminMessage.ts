import { CollectionLog } from './CollectionLog';
import { IRecordingFile } from './RecordingFile';
import { IOwnership } from './Ownership'
import { Location } from './Location'
import { Qr } from './Qr'
import { AdminMessageViewModel } from './AdminMessageViewModel';

export interface IAdminMessage {
    collectionLog?: CollectionLog; 
    file?: IRecordingFile;                  
    isAvailable?: boolean;
    location?: Location;         
    ownership?: IOwnership;        
    pinKey?: string;
    pinIcon?: string;
    project?: string;
    qr?: Qr;                     
}

// Optionally, you can also create a constructor function to create an instance of AdminMessage from AdminMessageViewModel
function createAdminMessageFromViewModel(pin: AdminMessageViewModel): IAdminMessage {
    return {
        collectionLog: pin.collectionLog,
        file: pin.file,
        location: pin.location,
        ownership: pin.ownership,
        pinIcon: pin.iconURL,
        pinKey: pin.key,
        project: pin.project,
        qr: pin.qr,
        isAvailable: pin.isAvailable
    };
}

export { createAdminMessageFromViewModel };
