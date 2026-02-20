import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../modules/product';

export interface WishlistItem {
  id: number;
  productId: number;
  userId: number;
  Product: Product;
}

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private API = 'http://localhost:5000/api/wishlist';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getWishlist(): Observable<WishlistItem[]> {
    return this.http.get<WishlistItem[]>(this.API, { headers: this.getAuthHeaders() });
  }

  addToWishlist(productId: number): Observable<WishlistItem> {
    return this.http.post<WishlistItem>(this.API, { productId }, { headers: this.getAuthHeaders() });
  }

  removeWishlistItem(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.API}/${id}`, { headers: this.getAuthHeaders() });
  }

  moveToCart(id: number, quantity: number = 1): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.API}/${id}/move-to-cart`,
      { quantity },
      { headers: this.getAuthHeaders() }
    );
  }
}
