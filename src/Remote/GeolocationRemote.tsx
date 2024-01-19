import axios from "axios";
import { BaseURL } from "./BaseURL";
import { LoginModel } from "../Model/LoginModel";

export class GeolocationRemote {
  async sendData(
    geolocationList: {
      latitude: number;
      longitude: number;
      currentTime: string;
    }[]
  ) {
    const username = LoginModel.getInstance().getUsername();

    try {
      const data = geolocationList.map((geo) => ({
        latitud: geo.latitude,
        longitud: geo.longitude,
        createdAt: geo.currentTime,
        usuarioDto: {
          userName: username,
        },
      }));

      console.log("geolocation data send",data);

      const response = await Promise.race([
        fetch(`${BaseURL.baseUrl}/users/setGeolocationUser`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Request timed out')), 2000)
        )
      ]);

      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === "ECONNABORTED") {
          throw {
            code: "TIMEOUT_ERROR",
            message:
              "La solicitud tardó demasiado tiempo, por favor verifica tu conexión a internet",
          };
        }
      }
      throw new Error("Error de red o del servidor"); 
    }
  }
}