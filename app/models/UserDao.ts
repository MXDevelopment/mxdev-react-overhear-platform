import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import Realm from 'realm';
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
    const userRealm = new UserRealm();
    userRealm.id = realmObject.id;
    userRealm.key = realmObject.key;
    userRealm.bio = realmObject.bio;
    userRealm.username = realmObject.username;
    userRealm.image = realmObject.image;
    userRealm.name = realmObject.name;
    userRealm.recordings = realmObject.recordings;
    userRealm.fcmToken = realmObject.fcmToken;
    userRealm.social = realmObject.social;
    return userRealm;
}

  saveCurrentUser = async (user: UserViewModel): Promise<void> => {
    this.deleteCurrentUser();
    this.realm.write(() => {
      this.realm.create('UserRealm', user, Realm.UpdateMode.Modified);
    });
  };

   saveCurrentUserWithFB = async (user: UserViewModel): Promise<void> => {
    this.saveCurrentUser(user);
    if (user.key) {
      await setDoc(doc(db, 'users', user.key), user);
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


