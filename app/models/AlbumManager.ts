import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

const db = firebase.firestore();

// Define TypeScript interfaces for your album and other types as needed
interface Album {
  key: string;
  // Add other album properties
}

const AlbumManager = {
  getAllAlbums: async (): Promise<Album[]> => {
    try {
      const querySnapshot = await db.collection('albums').get();
      const albums: Album[] = [];
      querySnapshot.forEach((doc) => {
        const album = doc.data() as Album;
        albums.push(album);
      });
      return albums;
    } catch (error) {
      console.log("Error getting albums:", error);
      return [];
    }
  },

  getAlbum: async (albumKey: string): Promise<Album | null> => {
    try {
      const doc = await db.collection('albums').doc(albumKey).get();
      if (!doc.exists) {
        console.log("No album found");
        return null;
      }
      return doc.data() as Album;
    } catch (error) {
      console.log("Error fetching album:", error);
      return null;
    }
  }
};

export default AlbumManager;
