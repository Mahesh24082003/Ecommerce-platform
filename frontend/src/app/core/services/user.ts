import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  role: 'admin' | 'customer';
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API = 'http://localhost:5000/api/users';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getMyProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.API}/me`, {
      headers: this.getAuthHeaders()
    });
  }

  updateMyProfile(payload: Partial<Pick<UserProfile, 'name' | 'phone' | 'address'>>): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.API}/me`, payload, {
      headers: this.getAuthHeaders()
    });
  }
}
