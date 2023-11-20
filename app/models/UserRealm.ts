import Realm from 'realm';
import { UserViewModel } from './UserViewModel';

class UserRealm extends Realm.Object {
    id?: string;
    key?: string;
    bio?: string;
    username?: string;
    image?: string;
    name?: string;
    recordings: string[] = [];
    fcmToken?: string;
    social?: string;

    constructor(user?: UserViewModel) {
        super(null as any, null as any);
        if (user) {
            this.id = user.key;
            this.key = user.key;
            this.bio = user.bio;
            this.username = user.username;
            this.image = user.image;
            this.name = user.name;
            this.recordings = user.recordings;
            this.fcmToken = user.fcmToken;
            this.social = user.social;
        }
    }

    static schema: Realm.ObjectSchema = {
        name: 'UserRealm',
        primaryKey: 'id',
        properties: {
            id: 'string?',
            key: 'string?',
            bio: 'string?',
            username: 'string?',
            image: 'string?',
            name: 'string?',
            recordings: 'string[]',
            fcmToken: 'string?',
            social: 'string?'
        }
    };
}

export { UserRealm };