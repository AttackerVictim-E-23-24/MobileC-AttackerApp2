import { ChangePasswordModel } from '../Model/ChangePasswordModel';
import { LoginModel } from '../Model/LoginModel';
import { ChangePasswordRemote } from '../Remote/ChangePasswordRemote'; // Importa ChangePasswordRemote

export class ChangePasswordRepository {
    private changePasswordModel: ChangePasswordModel;
    private loginModel: LoginModel;
    private changePasswordRemote: ChangePasswordRemote; // Agrega changePasswordRemote

    constructor() {
        this.changePasswordModel = ChangePasswordModel.getInstance();
        this.loginModel = LoginModel.getInstance();
        this.changePasswordRemote = new ChangePasswordRemote(); // Inicializa changePasswordRemote
    }

    async sendEmail(email: string) {
        const response = await this.changePasswordRemote.sendEmail(email);
        this.changePasswordModel.setEmail(email);
        return response;
    }
    
    async updatePassword(email: string, code: string, newPassword: string) {
        const response = await this.changePasswordRemote.changePassword(email, code, newPassword);
        this.changePasswordModel.setCode(code);
        this.changePasswordModel.setNewPassword(newPassword);
        
    
        if (response?.status === 200) {
            this.loginModel.setPassword(newPassword);
        }
    
        return response;
    }
}