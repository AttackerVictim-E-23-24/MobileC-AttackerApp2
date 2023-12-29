import { Geolocation } from '@capacitor/geolocation';
import { GeolocationModel } from '../Model/GeolocationModel';
import { GeolocationRemote } from '../Remote/GeolocationRemote';

export class GeolocationRepository{
    private geolocationModel: GeolocationModel;
    private geolocationRemote: GeolocationRemote;

    constructor(model: GeolocationModel){
        this.geolocationModel = model;
        this.geolocationRemote = new GeolocationRemote();
    }

    async setCurrentPosition(): Promise<void>{
        const coordinates = await Geolocation.getCurrentPosition();
        this.geolocationModel.setLatitude(coordinates.coords.latitude);
        this.geolocationModel.setLongitude(coordinates.coords.longitude);
        this.geolocationModel.setAccuracy(coordinates.coords.accuracy);
        this.geolocationModel.setTimestamp(new Date(coordinates.timestamp));
    }

    async sendData(): Promise<void> {
        // Enviar los datos a GeolocationRemote
        this.geolocationRemote.sendData(
            this.geolocationModel.getLatitude(),
            this.geolocationModel.getLongitude(),
            this.geolocationModel.getAccuracy(),
            this.geolocationModel.getTimestamp()
        );
    }
}