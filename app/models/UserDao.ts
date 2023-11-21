import Realm from 'realm';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { UserViewModel } from './UserViewModel';
import { UserRealm } from './UserRealm';

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

  private convertToUserRealm(realmObject: any): UserRealm {
    return {
      id: realmObject.id,
      key: realmObject.key,
      bio: realmObject.bio,
      username: realmObject.username,
      image: realmObject.image,
      name: realmObject.name,
      recordings: realmObject.recordings,
      fcmToken: realmObject.fcmToken,
      social: realmObject.social
    };
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
      firestore().collection('users').doc(currentAuthUser.uid).set(user);
    }
  };

  getCurrentUser = (): UserViewModel | null => {
    const userRealmObj = this.realm.objects('UserRealm')[0];
    if (!userRealmObj) return null;

    const userRealm = this.convertToUserRealm(userRealmObj);
    return UserViewModel.fromRealm(userRealm);
  };

  deleteCurrentUser = (): void => {
    this.realm.write(() => {
      this.realm.deleteAll();
    });
  };
}

export default UserDao;


