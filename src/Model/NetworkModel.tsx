export class NetworkModel {
    private static instance: NetworkModel;
    private status: boolean;
    private timestamp: Date;

    private constructor() {
        this.status = false;
        this.timestamp = new Date();
    }

    static getInstance(): NetworkModel {
        if (!NetworkModel.instance) {
            NetworkModel.instance = new NetworkModel();
        }
        return NetworkModel.instance;
    }

    getStatus() {
        return this.status;
    }

    setStatus(status: boolean) {
        this.status = status;
    }   

    getTimestamp() {
        return this.timestamp;
    }

    setTimestamp() {
        this.timestamp = new Date();
    }
}