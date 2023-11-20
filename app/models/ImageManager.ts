import storage from '@react-native-firebase/storage';

class ImageManager {
  private storageRef = storage().ref();

  async getImage(imageURL: string): Promise<string | null> {
    try {
      const imageRef = this.storageRef.child(imageURL);
      const url = await imageRef.getDownloadURL();
      return url;
    } catch (error) {
      console.log("Unable to download image:", error);
      return null;
    }
  }

  async getAuthorImage(authorImage: string): Promise<string | null> {
    try {
      const url = await this.getImage(authorImage);
      return url || 'defaultAuthorImageUrl'; // Replace with URL or local path to a default author image
    } catch (error) {
      console.log("Error fetching author image:", error);
      return 'defaultAuthorImageUrl'; // Replace with URL or local path to a default author image
    }
  }

  async getAnnotationImage(pinImageURL: string, targetSize: { width: number, height: number }): Promise<string | null> {
    try {
      const url = await this.getImage(pinImageURL);
      // Additional logic to handle image resizing if necessary
      return url;
    } catch (error) {
      console.log("Error fetching annotation image:", error);
      return null;
    }
  }
}

export default new ImageManager();
