import { Geolocation } from '@capacitor/geolocation';
import { GeolocationModel } from '../Model/GeolocationModel';
import { GeolocationRemote } from '../Remote/GeolocationRemote';
import { GeolocationLocal } from '../Local/GeolocationLocal';

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

    async sendData(
        latitude: number,
        longitude: number,
        timestamp: Date
    ): Promise<any> {
        const geolocationLocal = new GeolocationLocal();
    
        // Save new data to local storage
        geolocationLocal.saveGeolocation(
            latitude,
           longitude,
            timestamp,
        );
    
        const storedLocationData = geolocationLocal.getGeolocation();
    
        // Send all data here.
        const response = await this.geolocationRemote.sendData(storedLocationData);
    
        // If the data is sent successfully, clear it from local storage
        if (response) {
            geolocationLocal.clearGeolocation();
        }
    
        return response;
    }
}