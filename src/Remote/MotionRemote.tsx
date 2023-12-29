import axios from 'axios';
import { BaseURL } from './BaseURL';
import { LoginModel } from '../Model/LoginModel';

export class MotionRemote {


    public async sendMotion(isMoving: boolean, timeStamp: Date) {
        const username = LoginModel.getInstance().getUsername();

        try {
            const response = await axios.post(`${BaseURL.baseUrl}/users/setMovimiento`, {
                username: username,
                movimiento: [
                    {
                        isMoving: isMoving,
                        currenTime: timeStamp
                    }
                ]
            },{timeout: 5000});

            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.code === 'ECONNABORTED') {
                    throw { code: 'TIMEOUT_ERROR', message: 'La solicitud tardó demasiado tiempo, por favor verifica tu conexión a internet' };
                }
            }
            throw new Error('Error de red o del servidor');
        }
    }
}