import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

const db = firebase.firestore();

// Define TypeScript interfaces for your project and other types as needed
interface Project {
  key: string;
  isQREnabled: boolean;
  isAvailable: boolean; 
  // Add other project properties
}

const ProjectManager = {
  observeProjects: async (): Promise<Project[]> => {
    try {
      const querySnapshot = await db.collection('projects').get();
      const projects: Project[] = [];
      querySnapshot.forEach((doc) => {
        const project = doc.data() as Project;
        if (project.isAvailable) {
          projects.push(project);
        }
      });
      return projects;
    } catch (error) {
      console.log("Error getting projects:", error);
      return [];
    }
  },

  getProject: async (projectKey: string): Promise<Project | null> => {
    try {
      const doc = await db.collection('projects').doc(projectKey).get();
      if (!doc.exists) {
        console.log("No project found");
        return null;
      }
      return doc.data() as Project;
    } catch (error) {
      console.log("Error fetching project:", error);
      return null;
    }
  },

  checkPinEnableForQRCodeOrNot: async (pin: any): Promise<boolean> => {
    try {
      const project = await ProjectManager.getProject(pin.project);
      if (project && project.isQREnabled && pin.pinType === "qrCode") {
        return true;
      }
      return false;
    } catch (error) {
      console.log("Error checking QR code enablement:", error);
      return false;
    }
  }
};

export default ProjectManager;
