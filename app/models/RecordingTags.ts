// Export the interface
export interface RecordingTags {
    genreTags?: string[];
    subjectTags?: string[];
}

// Export the realm class
export class RecordingTagsRealm {
    genreTags: string[] = [];
    subjectTags: string[] = [];

    constructor(tags: RecordingTags) {
        this.genreTags = tags.genreTags ?? [];
        this.subjectTags = tags.subjectTags ?? [];
    }
}

// Export the view model class
export class RecordingTagsViewModel {
    genreTags?: string[];
    subjectTags?: string[];

    constructor(tags: RecordingTags) {
        this.genreTags = tags.genreTags;
        this.subjectTags = tags.subjectTags;
    }
}
