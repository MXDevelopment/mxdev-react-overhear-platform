import db from '../services/firebase/firebase'; // Import Firestore instance
import { collection, getDocs, getDoc, doc } from 'firebase/firestore';

// Define TypeScript interfaces for your album and other types as needed
interface Album {
  albumKey: string;
  name: string;
  projectKey: string;
  userKey: string;
}

const AlbumManager = {
  getAllAlbums: async (): Promise<Album[]> => {
    try {
      const querySnapshot = await getDocs(collection(db, 'albums'));
      const albums: Album[] = [];
      querySnapshot.forEach((doc) => {
        const album = { albumKey: doc.id, ...doc.data() } as Album;
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
      const albumDocRef = doc(db, 'albums', albumKey);
      const albumDoc = await getDoc(albumDocRef);
      if (!albumDoc.exists()) {
        console.log("No album found");
        return null;
      }
      return { albumKey: albumDoc.id, ...albumDoc.data() } as Album;
    } catch (error) {
      console.log("Error fetching album:", error);
      return null;
    }
  }
};

export default AlbumManager;
