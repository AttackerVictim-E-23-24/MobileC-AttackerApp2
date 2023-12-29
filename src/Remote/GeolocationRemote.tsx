import axios from 'axios';
import { BaseURL } from './BaseURL';

export class GeolocationRemote {
  async sendData(latitude: number, longitude: number, accuracy: number, timeStamp: Date) {
    try {
      const response = await axios.post(`${""}/Geolocation`, { latitude, longitude, accuracy, timeStamp });

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