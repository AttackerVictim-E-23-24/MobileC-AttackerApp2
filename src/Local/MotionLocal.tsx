import { LoginModel } from '../Model/LoginModel';

export class MotionLocal {
    public saveMotion(isMoving: boolean, timeStamp: Date) {
        const username = LoginModel.getInstance().getUsername();
    
        const newMotionData = {
            movimiento: isMoving,
            fecha: timeStamp
        };
    
        try {
            // Get existing motion data
            const existingMotionData = JSON.parse(localStorage.getItem(`motionData_${username}`) || '[]');
    
            // Add new motion data to existing motion data
            existingMotionData.push(newMotionData);
    
            // Save the updated motion data back to local storage
            localStorage.setItem(`motionData_${username}`, JSON.stringify(existingMotionData));
    
            console.log("Data saved to local storage");
        } catch (error) {
            throw new Error('Error saving data to local storage');
        }
    }

    public getMotion() {
        const username = LoginModel.getInstance().getUsername();

        try {
            const movimientoData = JSON.parse(localStorage.getItem(`motionData_${username}`) || '[]');
            console.log("movimientoData all", movimientoData);
            return movimientoData;
        } catch (error) {
            throw new Error('Error reading data from local storage');
        }
    }

    public clearMotion() {
        const username = LoginModel.getInstance().getUsername();
    
        try {
            localStorage.removeItem(`motionData_${username}`);
            console.log("Data cleared from local storage");
        } catch (error) {
            throw new Error('Error clearing data from local storage');
        }
    }
}