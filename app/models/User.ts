
export class User {
    userKey: string | null;
    bio: string | null;
    fcmToken: string | null;
    image: string | null;
    name: string | null;
    username: string | null;
    recordings: string[];
    social: string | null;
    
    constructor(userKey, bio, fcmToken, image, name, username, recordings = [], social) {
        this.userKey = userKey;
        this.bio = bio;
        this.fcmToken = fcmToken;
        this.image = image;
        this.name = name;
        this.username = username;
        this.recordings = recordings;
        this.social = social;
    }
}
