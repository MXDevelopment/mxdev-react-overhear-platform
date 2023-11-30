import { db } from '../firebase/firebase';
import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
import { IGeoFenceQR } from './GeoFenceQR';

// Define TypeScript interfaces for your project and other types as needed
interface Project {
    key?: string; 
    projectName?: string;
    projectOwner?: string;
    shortDescription?: string;
    website?: string;
    icon?: string;
    geoFenceQR?: IGeoFenceQR;
    pins?: string[];
    permission?: string[];
    isAvailable?: boolean;
    isQREnabled?: boolean;
    isDeliverPinsSequentially?: boolean;
    isSequentialEnabled?: boolean;
}

const ProjectManager = {
  observeProjects: async (): Promise<Project[]> => {
    try {
      const querySnapshot = await getDocs(collection(db, 'projects'));
      const projects: Project[] = [];
      querySnapshot.forEach((docSnapshot) => {
        const project = { key: docSnapshot.id, ...docSnapshot.data() } as Project;
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
      const projectDocRef = doc(db, 'projects', projectKey);
      const projectDoc = await getDoc(projectDocRef);
      if (!projectDoc.exists()) {
        console.log("No project found");
        return null;
      }
      return { key: projectDoc.id, ...projectDoc.data() } as Project;
    } catch (error) {
      console.log("Error fetching project:", error);
      return null;
    }
  },

  // Assuming 'pin' has a 'project' property with the project ID and a 'pinType' property
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
