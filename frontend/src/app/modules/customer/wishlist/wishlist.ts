import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WishlistItem, WishlistService } from '../../../core/services/wishlist';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css'
})
export class WishlistComponent implements OnInit {
  items: WishlistItem[] = [];
  loading = true;
  error = '';

  constructor(private wishlistService: WishlistService) {}

  ngOnInit() {
    this.loadWishlist();
  }

  loadWishlist() {
    this.loading = true;
    this.wishlistService.getWishlist().subscribe({
      next: (res) => {
        this.items = Array.isArray(res) ? res : [];
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.error?.message || 'Failed to load wishlist';
        this.loading = false;
      }
    });
  }

  removeItem(id: number) {
    this.wishlistService.removeWishlistItem(id).subscribe({
      next: () => this.loadWishlist(),
      error: (err) => alert(err?.error?.message || 'Failed to remove item')
    });
  }

  moveToCart(id: number) {
    this.wishlistService.moveToCart(id, 1).subscribe({
      next: () => {
        alert('Moved to cart');
        this.loadWishlist();
      },
      error: (err) => alert(err?.error?.message || 'Failed to move item')
    });
  }
}
