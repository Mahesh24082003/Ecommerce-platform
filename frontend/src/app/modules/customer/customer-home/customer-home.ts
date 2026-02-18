import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../core/services/product';
import { CartService } from '../../../core/services/cart';
import { WishlistService } from '../../../core/services/wishlist';
import { Product } from '../../../modules/product';

@Component({
  selector: 'app-customer-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-home.html',
  styleUrl: './customer-home.css'
})
export class CustomerHomeComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  loading = true;
  error: string = '';
  quantity: { [key: number]: number } = {};
  
  // Search and Filter
  searchQuery: string = '';
  filterCategory: string = '';
  filterMinPrice: number = 0;
  filterMaxPrice: number = 100000;
  categories: string[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (res: Product[]) => {
        this.products = Array.isArray(res) ? res : [];
        this.products.forEach(p => this.quantity[p.id] = 1);
        this.extractCategories();
        this.applyFilters();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.error = 'Failed to load products';
        this.products = [];
        this.loading = false;
      }
    });
  }

  extractCategories() {
    const uniqueCategories = new Set(this.products.map(p => p.category).filter(c => c && c.trim()));
    this.categories = Array.from(uniqueCategories).sort();
  }

  applyFilters() {
    this.filteredProducts = this.products.filter(product => {
      const matchesSearch = !this.searchQuery || 
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      const matchesCategory = !this.filterCategory || product.category === this.filterCategory;
      
      const matchesPrice = product.price >= this.filterMinPrice && product.price <= this.filterMaxPrice;
      
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }

  onSearchChange() {
    this.applyFilters();
  }

  onFilterChange() {
    this.applyFilters();
  }

  resetFilters() {
    this.searchQuery = '';
    this.filterCategory = '';
    this.filterMinPrice = 0;
    this.filterMaxPrice = 100000;
    this.applyFilters();
  }

  addToCart(id: number) {
    const product = this.products.find((p) => p.id === id);
    const qty = this.quantity[id] || 1;

    if (!product) {
      alert('Product not found');
      return;
    }

    if (qty < 1) {
      alert('Quantity must be at least 1');
      return;
    }

    if (qty > product.stock) {
      alert(`Only ${product.stock} item(s) in stock`);
      this.quantity[id] = product.stock > 0 ? product.stock : 1;
      return;
    }

    this.cartService.addToCart(id, qty).subscribe({
      next: () => alert(`Added ${qty} item(s) to cart`),
      error: (err) => alert(err?.error?.message || 'Failed to add to cart')
    });
  }

  addToWishlist(id: number) {
    this.wishlistService.addToWishlist(id).subscribe({
      next: () => alert('Added to wishlist'),
      error: (err) => alert(err?.error?.message || 'Failed to add to wishlist')
    });
  }
}
