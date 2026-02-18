import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../modules/product';

export interface CartItem {
  id: number;
  quantity: number;
  productId: number;
  userId: number;
  Product: Product;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

 private API = 'http://localhost:5000/api/cart';



  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  addToCart(productId: number, quantity: number = 1) {
    return this.http.post(
      this.API,
      { productId, quantity },
      { headers: this.getAuthHeaders() }
    );
  }

  getCart(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.API, { headers: this.getAuthHeaders() });
  }

  updateCartItem(id: number, quantity: number): Observable<CartItem> {
    return this.http.put<CartItem>(`${this.API}/${id}`, { quantity }, { headers: this.getAuthHeaders() });
  }

  removeCartItem(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.API}/${id}`, { headers: this.getAuthHeaders() });
  }
}
