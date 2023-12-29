// GeolocationModel.ts
export class GeolocationModel {
    private latitude: number;
    private longitude: number;
    private accuracy: number;
    private timestamp: Date;

    constructor() {
        this.latitude = 0;
        this.longitude = 0;
        this.accuracy = 0;
        this.timestamp = new Date();
    }

    getLatitude(): number {
        return this.latitude;
    }

    setLatitude(latitude: number): void {
        this.latitude = latitude;
    }

    getLongitude(): number {
        return this.longitude;
    }

    setLongitude(longitude: number): void {
        this.longitude = longitude;
    }

    getAccuracy(): number {
        return this.accuracy;
    }

    setAccuracy(accuracy: number): void {
        this.accuracy = accuracy;
    }

    getTimestamp(): Date {
        return this.timestamp;
    }

    setTimestamp(timestamp: Date): void {
        this.timestamp = timestamp;
    }
}