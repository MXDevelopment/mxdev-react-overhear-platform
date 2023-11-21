import { ITags } from "./Tags";

export class Pin {
    albumKey: string | null;
    pinDescription: string | null;
    isAvailable: boolean | null;
    location: Location | null;
    name: string | null;
    pinIcon: string | null;
    pinKey: string | null;
    pinType: string | null;
    project: string | null;
    qrPath: string | null;
    tags: ITags | null;
    sequentialOrderLogic: string | null;
    sequentialOrderNum: number | null;
    isDeliverPinsSequentially: boolean | null;

    constructor(albumKey: string | null, pinDescription: string | null, isAvailable: boolean | null, location: Location | null, name: string | null, pinIcon: string | null, pinKey: string | null, pinType: string | null, project: string | null, qrPath: string | null, tags: ITags | null, sequentialOrderLogic: string | null, sequentialOrderNum: number | null, isDeliverPinsSequentially: boolean | null) {
        this.albumKey = albumKey;
        this.pinDescription = pinDescription;
        this.isAvailable = isAvailable;
        this.location = location;
        this.name = name;
        this.pinIcon = pinIcon;
        this.pinKey = pinKey;
        this.pinType = pinType;
        this.project = project;
        this.qrPath = qrPath;
        this.tags = tags;
        this.sequentialOrderLogic = sequentialOrderLogic;
        this.sequentialOrderNum = sequentialOrderNum;
        this.isDeliverPinsSequentially = isDeliverPinsSequentially;
    }
}
