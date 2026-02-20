import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../../modules/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private API = 'http://localhost:5000/api/products';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API);
  }

  addProduct(product: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(this.API, product, { 
      headers: this.getAuthHeaders() 
    });
  }

  updateProduct(id: number, product: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.API}/${id}`, product, { 
      headers: this.getAuthHeaders() 
    });
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.API}/${id}`, { 
      headers: this.getAuthHeaders() 
    });
  }
}
