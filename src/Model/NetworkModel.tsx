export class NetworkModel {
    private status: boolean;
    private timestamp: Date|false;

    constructor() {
        this.status = false;
        this.timestamp = false;
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