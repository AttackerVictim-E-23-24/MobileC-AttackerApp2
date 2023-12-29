import axios from "axios";
import { BaseURL } from "./BaseURL";

export class LoginRemote {
  public async requestLogin(username: string, password: string) {

    try {
      const response = await axios.get(
        `${BaseURL.baseUrl}/users/authUser/${username}/${password}/3`,
        { timeout: 5000 }
      );

      const data = response.data;

      if (data.respuesta !== true) {
        throw new Error(
          `HTTP error! status: ${response.status}. Message: ${data.mensaje}`
        );
      }

      return data;
    } catch (error) {
      console.error(error);
    }
  }
}
