import { MonitoringModel } from '../Model/MonitoringModel';
import { MonitoringRemote } from '../Remote/MonitoringRemote';

export class MonitoringRepository {
    private monitoringModel: MonitoringModel;
    private monitoringRemote: MonitoringRemote;

    constructor() {
        this.monitoringModel = MonitoringModel.getInstance();
        this.monitoringRemote = new MonitoringRemote();
    }

    async fetchMonitoringData(username: string) {
        const data = await this.monitoringRemote.getMonitoringData(username);
        console.log("datos de la peticion:",data);
        this.monitoringModel.setFrecuency(data.frecuency);
        this.monitoringModel.setInactivityTime(data.inactivityTime);
        this.monitoringModel.setOfflineTime(data.offlineTime);
        this.monitoringModel.setMinDistance(data.minDistance);
    }

    getFrecuency() {
        // Convert frequency from seconds to milliseconds
        return this.monitoringModel.getFrecuency() * 1000;
    }


}