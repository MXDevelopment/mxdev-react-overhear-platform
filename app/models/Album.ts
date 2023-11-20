export class Album {
    albumKey: string | null;
    name: string | null;
    projectKey: string | null;
    userKey: string | null;

    constructor(albumKey: string | null, name: string | null, projectKey: string | null, userKey: string | null) {
        this.albumKey = albumKey;
        this.name = name;
        this.projectKey = projectKey;
        this.userKey = userKey;
    }
}
