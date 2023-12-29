export class LoginModel {
    private static instance: LoginModel;
    public username: string;
    public password: string;
    public isLoggedIn: boolean;

    private constructor() {
        this.username = '';
        this.password = '';
        this.isLoggedIn = false;
    }

    public static getInstance(): LoginModel {
        if (!LoginModel.instance) {
            LoginModel.instance = new LoginModel();
        }
        return LoginModel.instance;
    }

    getUsername() {
        return this.username;
    }

    getPassword() {
        return this.password;
    }

    getIsLoggedIn() {
        return this.isLoggedIn;
    }

    setUsername(username: string) {
        this.username = username;
    }

    setPassword(password: string) {
        this.password = password;
    }

    setIsLoggedIn(isLoggedIn: boolean) {
        this.isLoggedIn = isLoggedIn;
    }

}