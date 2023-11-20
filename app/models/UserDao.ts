import Realm from 'realm';
import { UserViewModel } from '../models'; // Update with correct import path
import UserManager from './UserManager'; // Ensure correct import path
import auth from '@react-native-firebase/auth';

class UserDao {
  static shared = new UserDao();

  private realm: Realm;

  constructor() {
    this.realm = new Realm({ schema: [UserRealm.schema] });
  }

  saveCurrentUser(user: UserViewModel): void {
    this.deleteCurrentUser();
    const userRealm = new UserRealm(user);
    this.realm.write(() => {
      this.realm.create(UserRealm.schema.name!, userRealm, Realm.UpdateMode.Modified);
    });
  }

  saveCurrentUserWithFB(user: UserViewModel): void {
    this.deleteCurrentUser();
    const userRealm = new UserRealm(user);
    this.realm.write(() => {
      this.realm.create(UserRealm.schema.name!, userRealm, Realm.UpdateMode.Modified);
    });

    const currentAuthUser = auth().currentUser;
    if (currentAuthUser && !currentAuthUser.isAnonymous) {
      UserManager.sharedManager.updateUser(user);
    }
  }

  getCurrentUser(): UserViewModel | null {
    const user = this.realm.objects<UserRealm>(UserRealm.schema.name!)[0];
    return user ? new UserViewModel(user) : null;
  }

  deleteCurrentUser(): void {
    const users = this.realm.objects(UserRealm.schema.name!);
    this.realm.write(() => {
      this.realm.delete(users);
    });
  }
}

// Define UserRealm schema here (adjust the fields as needed)
class UserRealm {
  static schema: Realm.ObjectSchema = {
    name: 'UserRealm',
    properties: {
      // Define the properties that match UserViewModel here
      // Example: username: 'string?',
      // Ensure the types match your UserViewModel properties
    },
  };

  // Constructor to initialize UserRealm object from UserViewModel
  constructor(user: UserViewModel) {
    // Map UserViewModel properties to UserRealm properties here
    // Example: this.username = user.username;
  }
}

export default UserDao;
