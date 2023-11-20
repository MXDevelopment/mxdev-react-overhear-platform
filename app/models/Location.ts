export interface GeoPointModel {
    lat: number | null;
    long: number | null;
}

export interface Location {
    geoPoint: GeoPointModel | null;
    radius: number | null;
}
