import { LoginModel } from '../Model/LoginModel';

export class GeolocationLocal {

    public saveGeolocation(latitude: number, longitude: number, currentTime: Date) {
        const username = LoginModel.getInstance().getUsername();
    
        const newGeolocationData = {
            latitude: latitude,
            longitude: longitude,
            currentTime: null
        };
    
        try {
            // Get existing geolocation data
            const existingGeolocationData = JSON.parse(localStorage.getItem(`geolocationData_${username}`) || '[]');
    
            // Add new geolocation data to existing geolocation data
            existingGeolocationData.push(newGeolocationData);
    
            // Save the updated geolocation data back to local storage
            localStorage.setItem(`geolocationData_${username}`, JSON.stringify(existingGeolocationData));
    
            console.log("geolocation data local", existingGeolocationData);
    
            // If there are 5 locations, send the data
            if (existingGeolocationData.length === 5) {
                // Call a method to send the data
                // You will need to implement this method
                this.clearGeolocation();
            }
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