import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserManager from './UserManager'; 
import UserDao from './UserDao';
import { UserViewModel } from './UserViewModel';
import { Project } from './Project';

class AuthManager {
  static justLoggedIn = true;
  private static instance: AuthManager;

  private constructor() {}

  public static get shared(): AuthManager {
    if (!AuthManager.instance) {
      AuthManager.instance = new AuthManager();
    }
    return AuthManager.instance;
  }

  selectProject = (project: Project): void => {
    AsyncStorage.setItem('selectedProject', project.projectName)
      .catch((error) => console.error('Error saving selectedProject:', error));
  };

  getPreviousSelectedProjectKey = async (): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem('selectedProject');
    } catch (error) {
      console.error('Error getting selectedProject:', error);
      return null;
    }
  };

  isLoggedInOnce = async (): Promise<boolean> => {
    try {
      const loggedInOnce = await AsyncStorage.getItem('isLoggedInOnce');
      return loggedInOnce === 'true';
    } catch (error) {
      console.error('Error getting isLoggedInOnce:', error);
      return false;
    }
  };

  setLoggedInOnce = async (): Promise<void> => {
    try {
      await AsyncStorage.setItem('isLoggedInOnce', 'true');
    } catch (error) {
      console.error('Error setting isLoggedInOnce:', error);
    }
  };

  static fcmToken: string | null = null;

  checkAuthentication = async (completion: (loggedIn: boolean) => void): Promise<void> => {
    const currentAuthUser = auth().currentUser;

    if (!currentAuthUser) {
      await this.anonymousSignIn(completion);
    } else {
      try {
        const userReturn = await UserManager.getCurrentUser(currentAuthUser.uid);
        if (userReturn) {
          UserDao.shared.saveCurrentUser(userReturn);
          completion(true);
        } else {
          // Handle anonymous user or user not found
          this.handleAnonymousOrNotFoundUser(currentAuthUser, completion);
        }
      } catch (error) {
        console.error('Error getting current user:', error);
        completion(false);
      }
    }
  };

  private handleAnonymousOrNotFoundUser = (currentAuthUser: any, completion: (loggedIn: boolean) => void): void => {
    const user: UserViewModel = {
      key: currentAuthUser.uid,
      bio: null, 
      username: null, 
      image: null, 
      name: null, 
      recordings: [], // default empty array
      social: null, 
      fcmToken: AuthManager.fcmToken 
    };
    UserDao.shared.saveCurrentUserWithFB(user);
    completion(true);
  };
  

  private anonymousSignIn = async (completion: (loggedIn: boolean) => void): Promise<void> => {
    try {
      const authResult = await auth().signInAnonymously();
      const user: UserViewModel = {
        key: authResult.user.uid,
        bio: null, 
        username: null, 
        image: null, 
        name: null, 
        recordings: [], // default empty array
        social: null, 
        fcmToken: AuthManager.fcmToken 
      };
      UserDao.shared.saveCurrentUserWithFB(user);
      completion(true);
    } catch (error) {
      console.error('Anonymous sign-in failed', error);
      completion(false);
    }
  };
  

  removeAnonymousUser = async (completion: (success: boolean) => void): Promise<void> => {
    const anonymousUser = auth().currentUser;
    if (anonymousUser?.isAnonymous) {
      try {
        await anonymousUser.delete();
        completion(true);
      } catch (error) {
        console.error('Unable to remove anonymous user', error);
        completion(false);
      }
    } else {
      completion(true);
    }
  };
}

export default AuthManager;
