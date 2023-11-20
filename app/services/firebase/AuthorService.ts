import AsyncStorage from '@react-native-async-storage/async-storage';
import { Author } from '../../models/Author'; 

const MapVCConstants = {
    allAuthors: 'allAuthors'
};

export const saveAllAuthors = async () => {
    try {
        const authors = await FirebaseManager.sharedManager.getAllAuthors(); // Adjust this line to match your actual Firebase call
        const data = JSON.stringify(authors);
        await AsyncStorage.setItem(MapVCConstants.allAuthors, data);
    } catch (error) {
        console.error("Error saving authors:", error);
    }
};

export const getAllAuthors = async (): Promise<Author[]> => {
    try {
        const savedAuthors = await AsyncStorage.getItem(MapVCConstants.allAuthors);
        if (savedAuthors) {
            return JSON.parse(savedAuthors) as Author[];
        }
    } catch (error) {
        console.error("Error fetching authors:", error);
    }
    return [];
};