import axios from 'axios';
import { BaseURL } from './BaseURL';
import { LoginModel } from '../Model/LoginModel';

export class MotionRemote {
    public async sendMotion(isMoving: boolean, timeStamp: Date) {
        const username = LoginModel.getInstance().getUsername();

        const movimientoData = [
            {
              movimiento: isMoving,
              fecha: timeStamp
            }
          ];
          
            console.log("movimientoData", movimientoData);
        try {
            const response = await fetch(`${BaseURL.baseUrl}/users/setMovimiento/${username}`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(movimientoData)
            });

            console.log("response, ", response);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            return responseData;
        } catch (error) {
            if ((error as Error).name === 'AbortError') {
                throw { code: 'TIMEOUT_ERROR', message: 'La solicitud tardó demasiado tiempo, por favor verifica tu conexión a internet' };
            }
            throw new Error('Error de red o del servidor');
        }
    }
}