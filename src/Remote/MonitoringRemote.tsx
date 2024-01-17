import axios from 'axios';
import { BaseURL } from './BaseURL';

export class MonitoringRemote {
    
    private dataLoaded: boolean = false;


    async getMonitoringData(username: string): Promise<{frecuency: number, inactivityTime: number, offlineTime: number, minDistance: number}> {
        if (this.dataLoaded) {
            throw new Error('Data already loaded');
        }
        const response = await axios.get(`${BaseURL.baseUrl}/monitoreo/getMonitoreo/${username}`, { timeout: 5000 });
    
        this.dataLoaded = true;
        console.log(response.data);

        return {
            frecuency: response.data.frecuencia,
            inactivityTime: response.data.tiempoInactividad,
            offlineTime: response.data.tiempoOffline,
            minDistance: response.data.distanciaAlejamiento
        };
    }
}