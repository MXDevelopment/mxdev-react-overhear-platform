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

  static fromRealm(realmObject: UserRealm): UserViewModel {
    // Create a User object from the UserRealm object
    const user: User = {
      userKey: realmObject.key,
      bio: realmObject.bio,
      username: realmObject.username,
      image: realmObject.image,
      name: realmObject.name,
      recordings: realmObject.recordings,
      social: realmObject.social,
      fcmToken: realmObject.fcmToken
    };

    return new UserViewModel(user);
  }
}

export { UserViewModel };
