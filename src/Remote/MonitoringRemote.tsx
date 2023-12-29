import axios from 'axios';
import { BaseURL } from './BaseURL';

export class MonitoringRemote {
    
    private dataLoaded: boolean = false;


    async getMonitoringData(username: string): Promise<{frecuency: number, inactivityTime: number, offlineTime: number, minDistance: number}> {
        if (this.dataLoaded) {
            throw new Error('Data already loaded');
        }
        const response = await axios.get(`${BaseURL.baseUrl}/monitoreo/getMonitoreo/${username}/3`, { timeout: 5000 });
    
        this.dataLoaded = true;
        
        return {
            frecuency: response.data.respuesta.frecuency,
            inactivityTime: response.data.respuesta.inactivityTime,
            offlineTime: response.data.respuesta.offlineTime,
            minDistance: response.data.respuesta.minDistance
        };
    }
}