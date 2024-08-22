import { makeAutoObservable } from 'mobx';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  username: string;
}

class UserStore {
  isAuthenticated: boolean = false;
  user: string = '';

  constructor() {
    makeAutoObservable(this);
    this.initializeAuthState();
  }

  initializeAuthState() {
    const token: string | null = localStorage.getItem('access_token');
    if (token) {
      this.isAuthenticated = true;
      this.user = this.decodeToken(token);
    }
  }

  login(token: string) {
    localStorage.setItem('access_token', token);
    this.isAuthenticated = true;
    this.user = this.decodeToken(token);
  }

  logout() {
    localStorage.removeItem('access_token');
    this.isAuthenticated = false;
    this.user = '';
  }

  decodeToken(token: string) {
    try {
      const { username }: JwtPayload = jwtDecode<JwtPayload>(token);
      return username;
    } catch (error) {
      console.error('Invalid token:', error);
      return '';
    }
  }
}

const userStore: UserStore = new UserStore();
export default userStore;
