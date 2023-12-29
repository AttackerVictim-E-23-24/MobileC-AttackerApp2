export class MotionModel {
    private acceleration: { x: number, y: number, z: number };
    private timestamp: Date|false;

    constructor() {
        this.acceleration = { x: 0, y: 0, z: 0 };
        this.timestamp = false;
    }

    getAcceleration() { 
        return this.acceleration;
    }

    getTimestamp() {
        return this.timestamp;
    }

    setAcceleration(acceleration: { x: number, y: number, z: number }) {
        this.acceleration = acceleration;
    }

    setTimestamp() {
        this.timestamp = new Date();
    }

    getInactivityTime() {
        if (this.timestamp instanceof Date) {
            return (new Date()).getTime() - this.timestamp.getTime();
            
        }
        console.log('No se puede calcular el tiempo de inactividad');
        return 0;
    }

    isMoving() {
        return this.acceleration.x > 0 || this.acceleration.y > 0 || this.acceleration.z > 0;
    }    

}