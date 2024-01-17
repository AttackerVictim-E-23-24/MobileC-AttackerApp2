import { LoginModel } from '../Model/LoginModel';

export class GeolocationLocal {

    saveGeolocation(latitude: number, longitude: number, currentTime: string) {
        const username = LoginModel.getInstance().getUsername();
        const geolocationData = this.getGeolocation();

        geolocationData.push({ latitude, longitude, currentTime });

        try {
            localStorage.setItem(`geolocationData_${username}`, JSON.stringify(geolocationData));
            console.log("Data saved to local storage");
        } catch (error) {
            throw new Error('Error saving data to local storage');
        }
    }

    getGeolocation() {
        const username = LoginModel.getInstance().getUsername();

        try {
            const geolocationData = localStorage.getItem(`geolocationData_${username}`);
            return geolocationData ? JSON.parse(geolocationData) : [];
        } catch (error) {
            throw new Error('Error getting data from local storage');
        }
    }

    clearGeolocation() {
        const username = LoginModel.getInstance().getUsername();

        try {
            localStorage.removeItem(`geolocationData_${username}`);
            console.log("Data cleared from local storage");
        } catch (error) {
            throw new Error('Error clearing data from local storage');
        }
    }
}