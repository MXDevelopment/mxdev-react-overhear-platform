export interface IOwnership {
    recordingAuthor: string | null;
    recordingNarrator: string | null;
    recordingOwner: string | null;
}

export class OwnershipRealm {
    recordingAuthor: string | null = null;
    recordingNarrator: string | null = null;
    recordingOwner: string | null = null;

    constructor(ownership: IOwnership) {
        this.recordingAuthor = ownership.recordingAuthor;
        this.recordingNarrator = ownership.recordingNarrator;
        this.recordingOwner = ownership.recordingOwner;
    }
}
