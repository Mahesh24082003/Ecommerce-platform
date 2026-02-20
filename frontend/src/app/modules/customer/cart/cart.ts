import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartItem, CartService } from '../../../core/services/cart';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class CartComponent implements OnInit {
  items: CartItem[] = [];
  loading = true;
  checkingOut = false;
  error = '';

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.loading = true;
    this.error = '';
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

  updateQuantity(item: CartItem) {
    const qty = Number(item.quantity);

    if (qty > item.Product.stock) {
      alert(`Only ${item.Product.stock} item(s) in stock`);
      item.quantity = item.Product.stock > 0 ? item.Product.stock : 1;
      return;
    }

    if (!qty || qty < 1) {
      item.quantity = 1;
      return;
    }

    this.cartService.updateCartItem(item.id, qty).subscribe({
      next: () => {},
      error: (err) => {
        alert(err?.error?.message || 'Failed to update quantity');
        this.loadCart();
      }
    });
  }

  removeItem(itemId: number) {
    this.cartService.removeCartItem(itemId).subscribe({
      next: () => {
        this.items = this.items.filter((x) => x.id !== itemId);
      },
      error: (err) => {
        alert(err?.error?.message || 'Failed to remove item');
      }
    });
  }

  getLineTotal(item: CartItem): number {
    return Number(item.quantity) * Number(item.Product.price || 0);
  }

  getTotal(): number {
    return this.items.reduce((sum, item) => sum + this.getLineTotal(item), 0);
  }

  checkout() {
    this.router.navigate(['/checkout']);
  }
}
