import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API = 'http://localhost:5000/api/auth';
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post(`${this.API}/login`, data);
  }

  register(data: any) {
    return this.http.post(`${this.API}/register`, data);
  }

  setToken(token: string, rememberMe: boolean = false) {
    localStorage.setItem('token', token);
    if (rememberMe) {
      localStorage.setItem('rememberMe', 'true');
    }
    this.isLoggedInSubject.next(true);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return this.hasToken();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('rememberMe');
    this.isLoggedInSubject.next(false);
  }

  isRemembered(): boolean {
    return localStorage.getItem('rememberMe') === 'true';
  }
}
