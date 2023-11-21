
import Realm from 'realm';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { UserViewModel } from './UserViewModel';
import { UserRealm } from './UserRealm'

class UserDao {
  private static instance: UserDao;
  private realm: Realm;

  private constructor() {
    this.realm = new Realm({ schema: [UserRealm] }); 
  }

  public static get shared(): UserDao {
    if (!UserDao.instance) {
      UserDao.instance = new UserDao();
    }
    return UserDao.instance;
  }

  saveCurrentUser = async (user: UserViewModel): Promise<void> => {
    this.deleteCurrentUser();
    this.realm.write(() => {
      this.realm.create('UserRealm', user, Realm.UpdateMode.Modified);
    });
  };

  saveCurrentUserWithFB = async (user: UserViewModel): Promise<void> => {
    this.saveCurrentUser(user);
    const currentAuthUser = auth().currentUser;
    if (currentAuthUser && !currentAuthUser.isAnonymous) {
      firestore().collection('users').doc(currentAuthUser.uid).set(user); // Adapt this based on your Firestore structure
    }
  };

  getCurrentUser = (): UserViewModel | null => {
    const userRealmObj = this.realm.objects('UserRealm')[0];
    if (!userRealmObj) return null;

    return UserViewModel.fromRealm(userRealmObj);
  };

  deleteCurrentUser = (): void => {
    this.realm.write(() => {
      this.realm.deleteAll();
    });
  };
}

export default UserDao;
