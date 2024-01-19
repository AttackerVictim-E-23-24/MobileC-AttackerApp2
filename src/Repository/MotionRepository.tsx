import { PluginListenerHandle } from '@capacitor/core';
import { Motion } from '@capacitor/motion';
import { MotionModel } from '../Model/MotionModel';
import { MotionRemote } from '../Remote/MotionRemote';
import { MotionLocal } from '../Local/MotionLocal';

let rotationHandler: PluginListenerHandle;

export class MotionRepository {
    private currentMotion: MotionModel;
    private previousMotion: MotionModel;
    private motionRemote: MotionRemote;

    constructor() {
        this.currentMotion = new MotionModel();
        this.previousMotion = new MotionModel();
        this.motionRemote = new MotionRemote();
    }

    startListening(callback: (isMoving: boolean) => void) {
        // Cuando los datos de rotación cambian, actualiza el modelo
        rotationHandler = Motion.addListener('orientation', (event) => {
            this.previousMotion.setMovement(this.currentMotion.getMovement().x, this.currentMotion.getMovement().y, this.currentMotion.getMovement().z);
            this.currentMotion.setTimestamp();
            this.currentMotion.setMovement(event.alpha, event.beta, event.gamma);

            // Calcular la diferencia en la rotación
            const deltaAlpha = Math.abs(this.currentMotion.getMovement().x - this.previousMotion.getMovement().x);
            const deltaBeta = Math.abs(this.currentMotion.getMovement().y - this.previousMotion.getMovement().y);
            const deltaGamma = Math.abs(this.currentMotion.getMovement().z - this.previousMotion.getMovement().z);

            // Si la diferencia es mayor que un cierto umbral, el dispositivo está en movimiento
            callback(deltaAlpha > .5 || deltaBeta > .5 || deltaGamma > .5);
        });
    }

    stopListening() {
        if (rotationHandler) {
            rotationHandler.remove();
        }
    }
    
    async sendData(movimientoData: { movimiento: boolean, fecha: Date }) {
        const motionLocal = new MotionLocal();
    
        // Save new data to local storage
        motionLocal.saveMotion(movimientoData.movimiento, movimientoData.fecha);
    
        const storedMovimientoData = motionLocal.getMotion();
    
        // Send all data here.
        const response = await this.motionRemote.sendMotion(storedMovimientoData);
    
        // If the data is sent successfully, clear it from local storage
        if (response) {
            motionLocal.clearMotion();
        }
    }
}