import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserManager from './UserManager'; // Ensure correct import path
import UserDao from './UserDao'; // 
import { User } from './User'; 
import { UserViewModel } from './UserViewModel'

class AuthManager {
    static shared = new AuthManager();
    static justLoggedIn = true;
    static fcmToken: string | null = null;

    async selectProject(projectName: string) {
        await AsyncStorage.setItem('selectedProject', projectName);
    }

    async getPreviousSelectedProjectKey(): Promise<string | null> {
        return await AsyncStorage.getItem('selectedProject');
    }

    async isLoggedInOnce(): Promise<boolean> {
        const isLoggedIn = await AsyncStorage.getItem('isLoggedInOnce');
        return isLoggedIn === 'true';
    }

    async setLoggedInOnce() {
        await AsyncStorage.setItem('isLoggedInOnce', 'true');
    }

    static async setFcmToken(token: string) {
        AuthManager.fcmToken = token;
        const currentUser = auth().currentUser;
        if (currentUser && AuthManager.fcmToken) {
            UserManager.sharedManager.registerFCMToken(currentUser, AuthManager.fcmToken);
        }
    }

    async checkAuthentication(completion: (isLoggedIn: boolean | null) => void) {
        console.log("No auth check yet");
        const currentAuthUser = auth().currentUser;
        const currentDBUser = await UserDao.shared.getCurrentUser();

        if (!currentAuthUser && !currentDBUser) {
            this.anonymousSignIn(loggedIn => {
                completion(loggedIn);
                if (loggedIn) {
                    console.log("Anonymous login done");
                }
            });
        } else if (currentAuthUser) {
            UserManager.sharedManager.getCurrentUser(currentAuthUser.uid, userReturn => {
                if (userReturn) {
                    UserDao.shared.saveCurrentUser(userReturn);
                    completion(true);
                } else {
                    const newUser = new User({ userKey: currentAuthUser.uid, username: this.getUniqueID(), ... });
                    UserDao.shared.saveCurrentUserWithFB(newUser);
                    completion(true);
                }
            });
        } else {
            this.anonymousSignIn(loggedIn => {
                completion(loggedIn);
            });
        }
    }

    async getCurrentUserFb(userId: string) {
        UserManager.sharedManager.getCurrentUser(userId, user => {
            if (user) {
                UserDao.shared.saveCurrentUser(user);
            }
        });
    }

    private anonymousSignIn(completion: (isLoggedIn: boolean) => void) {
        auth().signInAnonymously()
            .then(authResult => {
                const newUser = new User({ userKey: authResult.user.uid, username: this.getUniqueID(), ... });
                UserDao.shared.saveCurrentUserWithFB(newUser);
                completion(true);
            })
            .catch(error => {
                console.error("Anonymous sign-in failed", error);
                completion(false);
            });
    }

    async removeAnonymousUser(completion: (success: boolean) => void) {
        const currentUser = auth().currentUser;
        if (currentUser?.isAnonymous) {
            currentUser.delete()
                .then(() => completion(true))
                .catch(error => {
                    console.error("Error removing anonymous user", error);
                    completion(false);
                });
        } else {
            completion(true);
        }
    }

    private getUniqueID(): string {
        // Implement logic to generate a unique ID or use an external library
        return 'unique-id'; // Placeholder
    }
}

export default AuthManager;
