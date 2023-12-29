// MonitoringModel.ts
export class MonitoringModel {
    private static instance: MonitoringModel;
    private frecuency: number;
    private inactivityTime: number;
    private offlineTime: number;
    private minDistance: number;
  
    private constructor() {
      this.frecuency = 30;
      this.inactivityTime = 90;
      this.offlineTime = 90;
      this.minDistance = 100;
    }
  
    public static getInstance(): MonitoringModel {
      if (!MonitoringModel.instance) {
        MonitoringModel.instance = new MonitoringModel();
      }
      return MonitoringModel.instance;
    }
  

    getFrecuency(): number {
        return this.frecuency;
    }

    setFrecuency(frecuency: number): void {
        this.frecuency = frecuency;
    }

    getInactivityTime(): number {
        return this.inactivityTime;
    }

    setInactivityTime(inactivityTime: number): void {
        this.inactivityTime = inactivityTime;
    }

    getOfflineTime(): number {
        return this.offlineTime;
    }

    setOfflineTime(offlineTime: number): void {
        this.offlineTime = offlineTime;
    }

    getMinDistance(): number {
        return this.minDistance;
    }

    setMinDistance(minDistance: number): void {
        this.minDistance = minDistance;
    }

}