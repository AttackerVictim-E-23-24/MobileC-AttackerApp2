export class MotionModel {
    private movement: { x: number, y: number, z: number };
    private timestamp: Date;

    constructor() {
        this.movement = { x: 0, y: 0, z: 0 };
        this.timestamp = new Date();
    }

    getMovement() { 
        return this.movement;
    }

    getTimestamp() {
        return this.timestamp;
    }

    setMovement(alpha: number, beta: number, gamma: number) {
        this.movement.x = alpha;
        this.movement.y = beta;
        this.movement.z = gamma;
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
        return this.movement.x > 0 || this.movement.y > 0 || this.movement.z > 0;
    }    

}