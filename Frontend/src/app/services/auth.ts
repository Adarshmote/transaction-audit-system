import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private adminLoggedIn = false;

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin123') {
      this.adminLoggedIn = true;
      return true;
    }
    return false;
  }

  isLoggedIn(): boolean {
    return this.adminLoggedIn;
  }

  logout() {
    this.adminLoggedIn = false;
  }
}
