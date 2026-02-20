import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
  Product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
  };
}

export interface Order {
  id: number;
  totalAmount: number;
  status: string;
  shippingAddress: string;
  paymentMethod: 'COD' | 'Stripe' | 'PayPal';
  paymentStatus: 'Pending' | 'Paid' | 'Failed' | 'Refunded';
  trackingNumber?: string;
  estimatedDeliveryDate?: string;
  refundStatus?: string;
  createdAt: string;
  OrderItems: OrderItem[];
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private API = 'http://localhost:5000/api/orders';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  placeOrder(payload: {
    shippingAddress: string;
    paymentMethod: 'COD' | 'Stripe' | 'PayPal';
    mockPaymentSuccess?: boolean;
  }): Observable<{ message: string; order: Order }> {
    return this.http.post<{ message: string; order: Order }>(
      this.API,
      payload,
      { headers: this.getAuthHeaders() }
    );
  }

  getMyOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.API}/my`, {
      headers: this.getAuthHeaders()
    });
  }

  cancelMyOrder(orderId: number): Observable<{ message: string; order: Order }> {
    return this.http.put<{ message: string; order: Order }>(
      `${this.API}/${orderId}/cancel`,
      {},
      { headers: this.getAuthHeaders() }
    );
  }
}
