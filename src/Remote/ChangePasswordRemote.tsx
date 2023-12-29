import axios from 'axios';
import { BaseURL } from './BaseURL';

export class ChangePasswordRemote {

    async sendEmail(email: string) {
        const emailWithoutDomain = email.split('@')[0];
        try {
            const response = await axios.get(`${BaseURL.baseUrl}/users/recPassword/${emailWithoutDomain}`);
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    async changePassword(email: string, code: string, newPassword: string) {
        try {
            const response = await axios.get(`${BaseURL.baseUrl}/users/recPassword/${email}/${code}/${newPassword}`);
            return response;
        } catch (error) {
            console.error(error);
        }
    }
}