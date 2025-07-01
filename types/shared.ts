export interface LatLong {
    lat: number,
    long: number,
}

export type Alarm = {
    id: number;
    sound: string;
    label: string;
    vibrate: boolean;
    repeat: boolean;
    coords: string;
    radius: number;
    active: boolean;
}