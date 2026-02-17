import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

 private API = 'http://localhost:5000/api/cart';



  constructor(private http: HttpClient) {}

  addToCart(productId:number) {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(this.API,
      { productId: productId, quantity: 1 },
      { headers }
    );
  }
}
