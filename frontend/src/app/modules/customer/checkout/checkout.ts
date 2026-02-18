import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartItem, CartService } from '../../../core/services/cart';
import { OrderService } from '../../../core/services/order';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class CheckoutComponent implements OnInit {
  items: CartItem[] = [];
  loading = true;
  placingOrder = false;
  error = '';
  shippingAddress = '';
  paymentMethod: 'COD' | 'Stripe' | 'PayPal' = 'COD';

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartService.getCart().subscribe({
      next: (res) => {
        this.items = Array.isArray(res) ? res : [];
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.error?.message || 'Failed to load cart';
        this.loading = false;
      }
    });
  }

  getTotal(): number {
    return this.items.reduce((sum, item) => {
      return sum + Number(item.quantity) * Number(item.Product.price || 0);
    }, 0);
  }

  placeOrder() {
    if (!this.shippingAddress.trim()) {
      alert('Shipping address is required');
      return;
    }

    this.placingOrder = true;
    this.orderService.placeOrder({
      shippingAddress: this.shippingAddress,
      paymentMethod: this.paymentMethod,
      mockPaymentSuccess: true
    }).subscribe({
      next: (res) => {
        alert(res.message || 'Order placed successfully');
        this.placingOrder = false;
        this.router.navigate(['/orders']);
      },
      error: (err) => {
        alert(err?.error?.message || 'Order placement failed');
        this.placingOrder = false;
      }
    });
  }
}
