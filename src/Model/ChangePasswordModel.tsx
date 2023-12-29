export class ChangePasswordModel {
    private static instance: ChangePasswordModel;
    public email: string;
    public code: string;
    public newPassword: string;

    private constructor() {
        this.email = '';
        this.code = '';
        this.newPassword = '';
    }

    public static getInstance(): ChangePasswordModel {
        if (!ChangePasswordModel.instance) {
            ChangePasswordModel.instance = new ChangePasswordModel();
        }
        return ChangePasswordModel.instance;
    }

    getEmail() {
        return this.email;
    }

    getCode() {
        return this.code;
    }

    getNewPassword() {
        return this.newPassword;
    }

    setEmail(email: string) {
        this.email = email;
    }

    setCode(code: string) {
        this.code = code;
    }

    setNewPassword(newPassword: string) {
        this.newPassword = newPassword;
    }
}