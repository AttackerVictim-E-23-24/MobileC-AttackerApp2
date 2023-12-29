import { Network } from '@capacitor/network';
import { NetworkModel } from '../Model/NetworkModel';

export class NetworkRepository {
    private networkModel: NetworkModel;

    constructor() {
        this.networkModel = NetworkModel.getInstance();
    }

    async checkNetworkStatus() {
        const status = await Network.getStatus();
        this.networkModel.setStatus(status.connected);
        this.networkModel.setTimestamp();
    }

    getNetworkStatus() {
        return this.networkModel.getStatus();
    }

    getNetworkStatusTimestamp() {
        return this.networkModel.getTimestamp();
    }
}