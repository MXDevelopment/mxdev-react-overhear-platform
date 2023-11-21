import db from '../services/firebase/firebase'; // Import Firestore instance
import { collection, getDocs } from 'firebase/firestore';
import { CollectionLog } from './CollectionLog';
import { IRecordingFile } from './RecordingFile';
import { Ownership } from './Ownership';
import { Qr } from './Qr';

// Define TypeScript interface for your Admin Message
interface AdminMessage {
    collectionLog?: CollectionLog; 
    file?: IRecordingFile;                  
    isAvailable?: boolean;
    location?: Location;         
    ownership?: Ownership;        
    pinKey?: string;
    pinIcon?: string;
    project?: string;
    qr?: Qr;    
}

const AdminMessageManager = {
    getAllAdminMessages: async (): Promise<AdminMessage[]> => {
        try {
            const querySnapshot = await getDocs(collection(db, 'adminMessages'));
            const adminMessages: AdminMessage[] = [];
            querySnapshot.forEach((doc) => {
                const adminMessage = { key: doc.id, ...doc.data() } as AdminMessage;
                adminMessages.push(adminMessage);
            });
            return adminMessages;
        } catch (error) {
            console.log("Error getting admin messages:", error);
            return [];
        }
    },

    // Add other methods if necessary, such as getting a single admin message
};

export default AdminMessageManager;
