export interface Qr {
    forUser?: string;
    uniqueCode?: string;
}

export class QrRealm {
    forUser?: string;
    uniqueCode?: string;

    constructor(qr: Qr) {
        this.forUser = qr.forUser;
        this.uniqueCode = qr.uniqueCode;
    }
}
