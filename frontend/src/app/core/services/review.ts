import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  name?: string;
  email: string;
}

export interface Product {
  id: number;
  name: string;
}

export interface Review {
  id: number;
  productId: number;
  userId: number;
  rating: number;
  comment: string;
  approved: boolean;
  createdAt: string;
  updatedAt: string;
  User?: User;
  Product?: Product;
}

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private API = 'http://localhost:5000/api/reviews';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  createReview(productId: number, rating: number, comment: string): Observable<Review> {
    return this.http.post<Review>(`${this.API}`, { productId, rating, comment }, { 
      headers: this.getAuthHeaders() 
    });
  }

  getProductReviews(productId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.API}/product/${productId}`);
  }

  getPendingReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.API}/admin/pending`, { 
      headers: this.getAuthHeaders() 
    });
  }

  approveReview(id: number): Observable<Review> {
    return this.http.put<Review>(`${this.API}/admin/approve/${id}`, {}, { 
      headers: this.getAuthHeaders() 
    });
  }

  updateReview(id: number, rating: number, comment: string): Observable<Review> {
    return this.http.put<Review>(`${this.API}/admin/${id}`, { rating, comment }, { 
      headers: this.getAuthHeaders() 
    });
  }

  deleteReview(id: number): Observable<any> {
    return this.http.delete(`${this.API}/admin/${id}`, { 
      headers: this.getAuthHeaders() 
    });
  }
}
