// Assuming User and UserRealm are defined elsewhere
import { User } from './User';
import { UserRealm } from './UserRealm'; // Ensure this path is correct

class UserViewModel {
  key?: string;
  bio?: string;
  username?: string;
  image?: string;
  name?: string;
  recordings: string[] = [];
  social?: string;
  fcmToken?: string;

  constructor(user: User) {
    this.key = user.userKey;
    this.bio = user.bio;
    this.username = user.username;
    this.image = user.image;
    this.name = user.name;
    this.recordings = user.recordings;
    this.social = user.social;
    this.fcmToken = user.fcmToken;
  }

  static fromRealm(realm: UserRealm): UserViewModel {
    const viewModel = new UserViewModel({} as User); // Empty User, adjust as needed
    viewModel.key = realm.key;
    viewModel.bio = realm.bio;
    viewModel.username = realm.username;
    viewModel.image = realm.image;
    viewModel.name = realm.name;
    viewModel.recordings = [...realm.recordings];
    viewModel.social = realm.social;
    viewModel.fcmToken = realm.fcmToken;
    return viewModel;
  }
}

export { UserViewModel };
