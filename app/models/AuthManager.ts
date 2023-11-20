// AuthManager.ts
// Overhear
// Created by Andrew Graham on 10/10/2017.
// © 2017 Overhear. All rights reserved.

import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserManager from './UserManager'; // Import or define UserManager
import UserDao from './UserDao'; // Import or define UserDao
import { User } from './User'; // Define your models
import { UserViewModel } from './UserViewModel'
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

  selectProject = async (project: Project): Promise<void> => {
    await AsyncStorage.setItem('selectedProject', project.projectName);
  };

  getPreviousSelectedProjectKey = async (): Promise<string | null> => {
    return await AsyncStorage.getItem('selectedProject');
  };

  isLoggedInOnce = async (): Promise<boolean> => {
    const loggedInOnce = await AsyncStorage.getItem('isLoggedInOnce');
    return loggedInOnce === 'true';
  };

  setLoggedInOnce = async (): Promise<void> => {
    await AsyncStorage.setItem('isLoggedInOnce', 'true');
  };

  static fcmToken: string | null = null;

  checkAuthentication = async (completion: (loggedIn: boolean) => void): Promise<void> => {
    const currentAuthUser = auth().currentUser;
    const currentDBUser = UserDao.shared.getCurrentUser();

    if (!currentAuthUser && !currentDBUser) {
      await this.anonymousSignIn(completion);
    } else if (currentAuthUser) {
      UserManager.getCurrentUser(currentAuthUser.uid, (userReturn: UserViewModel | null) => {
        if (userReturn) {
          UserDao.shared.saveCurrentUser(userReturn);
          completion(true);
        } else {
          // Handle anonymous user
          const user = new User(currentAuthUser.uid); // Adjust as per your model
          UserDao.shared.saveCurrentUserWithFB(user);
          completion(true);
        }
      });
    } else {
      completion(false);
    }
  };

  private anonymousSignIn = async (completion: (loggedIn: boolean) => void): Promise<void> => {
    try {
      const authResult = await auth().signInAnonymously();
      const user = new User(authResult.user.uid); // Adjust as per your model
      UserDao.shared.saveCurrentUserWithFB(user);
      completion(true);
    } catch (error) {
      console.error("Anonymous sign-in failed", error);
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
        console.error("Unable to remove anonymous user", error);
        completion(false);
      }
    } else {
      completion(true);
    }
  };
}

export default AuthManager;
