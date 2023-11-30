import { db } from '../firebase/firebase'; 
import { collection, getDocs } from 'firebase/firestore';
import { IAdminMessage } from './AdminMessage';


export const AdminMessageManager = {
    getAllAdminMessages: async (): Promise<IAdminMessage[]> => {
        try {
            const querySnapshot = await getDocs(collection(db, 'adminMessages'));
            const adminMessages: IAdminMessage[] = [];
            querySnapshot.forEach((doc) => {
                const adminMessage = { key: doc.id, ...doc.data() } as IAdminMessage;
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


