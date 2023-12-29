import { PluginListenerHandle } from '@capacitor/core';
import { Motion } from '@capacitor/motion';
import { MotionModel } from '../Model/MotionModel';
import { MotionRemote } from '../Remote/MotionRemote';

let accelHandler: PluginListenerHandle;

export class MotionRepository {
    private motionModel: MotionModel;
    private motionRemote: MotionRemote;

    constructor() {
        this.motionModel = new MotionModel();
        this.motionRemote = new MotionRemote();
    }

    startListening(callback: (isMoving: boolean) => void) {
        // Cuando los datos de aceleración cambian, actualiza el modelo
        accelHandler = Motion.addListener('accel', (event) => {
            this.motionModel.setTimestamp();
            this.motionModel.setAcceleration(event.acceleration);

            // Calcular la magnitud de la aceleración
            const magnitude = Math.sqrt(event.acceleration.x ** 2 + event.acceleration.y ** 2 + event.acceleration.z ** 2);

            // Si la magnitud es mayor que un cierto umbral, el dispositivo está en movimiento
            callback(magnitude > 1);
        });
    }

    stopListening() {
        if (accelHandler) {
            accelHandler.remove();
        }
    }
    
    sendData(isMoving: boolean, timestamp: Date) {
        this.motionRemote.sendMotion(isMoving, timestamp);
    }
}