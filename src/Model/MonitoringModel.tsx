// MonitoringModel.ts
export class MonitoringModel {
    private static instance: MonitoringModel;
    private frecuency: number;
    private inactivityTime: number;
    private offlineTime: number;
    private minDistance: number;
  
    private constructor() {
      this.frecuency = 120;
      this.inactivityTime = 280;
      this.offlineTime = 280;
      this.minDistance = 6;
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