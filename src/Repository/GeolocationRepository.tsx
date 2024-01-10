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

    async sendData(): Promise<any> {
        // Enviar los datos a GeolocationRemote
        console.log(this.geolocationModel.getLatitude());
        const response = await this.geolocationRemote.sendData([
            {
                latitude: this.geolocationModel.getLatitude(),
                longitude: this.geolocationModel.getLongitude(),
                currentTime: this.geolocationModel.getTimestamp().toISOString()
            }
        ]);

        return response;
    }
}