// Assuming UserViewModel and Social are defined elsewhere in your project.
import { UserViewModel } from './UserViewModel';

class User {
  userKey?: string;
  bio?: string;
  fcmToken?: string;
  image?: string;
  name?: string;
  recordings: string[] = [];
  social?: string;
  username?: string;

  constructor(userModel: UserViewModel) {
    this.userKey = userModel.key;
    this.bio = userModel.bio;
    this.fcmToken = userModel.fcmToken;
    this.image = userModel.image;
    this.name = userModel.name;
    this.recordings = userModel.recordings;
    this.username = userModel.username;
    this.social = userModel.social;
  }

  // You can also add a static method to create an instance from a plain object if needed
  static fromObject(obj: {
    userKey?: string,
    bio?: string,
    fcmToken?: string,
    image?: string,
    name?: string,
    username?: string,
    recordings: string[],
    social?: string,
  }): User {
    return new User({
      key: obj.userKey,
      bio: obj.bio,
      fcmToken: obj.fcmToken,
      image: obj.image,
      name: obj.name,
      recordings: obj.recordings,
      username: obj.username,
      social: obj.social
    } as UserViewModel); // Casting to UserViewModel assuming it has a similar structure
  }
}

export { User };
