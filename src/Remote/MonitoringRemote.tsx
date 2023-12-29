import axios from 'axios';
import { BaseURL } from './BaseURL';

export class MonitoringRemote {
    
    private dataLoaded: boolean = false;


    async getMonitoringData(username: string): Promise<{frecuency: number, inactivityTime: number, offlineTime: number, minDistance: number}> {
        if (this.dataLoaded) {
            throw new Error('Data already loaded');
        }
        const response = await axios.post(`${""}/monitoring`, { username });

        this.dataLoaded = true;
        
        return {
            frecuency: response.data.frecuency,
            inactivityTime: response.data.inactivityTime,
            offlineTime: response.data.offlineTime,
            minDistance: response.data.minDistance
        };
    }
}