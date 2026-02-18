import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order, OrderService } from '../../../core/services/order';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.html',
  styleUrl: './orders.css'
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  loading = true;
  error = '';

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.loading = true;
    this.orderService.getMyOrders().subscribe({
      next: (res) => {
        this.orders = Array.isArray(res) ? res : [];
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.error?.message || 'Failed to load orders';
        this.loading = false;
      }
    });
  }

  cancelOrder(orderId: number) {
    this.orderService.cancelMyOrder(orderId).subscribe({
      next: () => {
        alert('Order cancelled');
        this.loadOrders();
      },
      error: (err) => {
        alert(err?.error?.message || 'Failed to cancel order');
      }
    });
  }

  canCancel(status: string) {
    return status === 'Pending' || status === 'Processing';
  }
}
