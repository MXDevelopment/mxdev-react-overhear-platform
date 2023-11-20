import { CollectionLog } from './CollectionLog';
import { File } from './File';
import { Ownership } from './Ownership'
import { Location } from './Location'
import { Qr } from './Qr'

interface AdminMessagePin {
    collectionLog?: CollectionLog; 
    file?: File;                  
    isAvailable?: boolean;
    location?: Location;         
    ownership?: Ownership;        
    pinKey?: string;
    pinIcon?: string;
    project?: string;
    qr?: Qr;                     
}

// Optionally, you can also create a constructor function to create an instance of AdminMessagePin from AdminPinViewModel
function createAdminMessagePinFromViewModel(pin: AdminPinViewModel): AdminMessagePin {
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

export { AdminMessagePin, createAdminMessagePinFromViewModel };
