// LoginRepository.tsx

import { LoginRemote } from '../Remote/LoginRemote';
import { LoginModel } from '../Model/LoginModel';

export class LoginRepository {
  private loginRemote: LoginRemote;
  private loginModel: LoginModel;

  constructor() {
    this.loginRemote = new LoginRemote();
    this.loginModel = LoginModel.getInstance();
  }

  async login(username: string, password: string) {
    this.loginModel.username = username;
    this.loginModel.password = password;
    return this.loginRemote.requestLogin(this.loginModel.username, this.loginModel.password);
  }

  getUsername() {
    return this.loginModel.username;
  }
}