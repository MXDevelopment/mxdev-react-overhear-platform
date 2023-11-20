import AsyncStorage from '@react-native-async-storage/async-storage';
import { Album } from '../../models/Album';

const MapVCConstants = {
    allAlbums: 'allAlbums'
};

export const saveAllAlbums = async () => {
    try {
        // Temporarily mock the FirebaseManager functionality or comment this out until FirebaseManager is ready
        // const albums = await FirebaseManager.sharedManager.getAllAlbums();
        const albums: Album[] = []; // Dummy data for now
        const data = JSON.stringify(albums);
        await AsyncStorage.setItem(MapVCConstants.allAlbums, data);
    } catch (error) {
        console.error("Error saving albums:", error);
    }
};

export const getAllAlbums = async (): Promise<Album[]> => {
    try {
        const savedAlbums = await AsyncStorage.getItem(MapVCConstants.allAlbums);
        if (savedAlbums) {
            return JSON.parse(savedAlbums) as Album[];
        }
    } catch (error) {
        console.error("Error fetching albums:", error);
    }
    return [];
};