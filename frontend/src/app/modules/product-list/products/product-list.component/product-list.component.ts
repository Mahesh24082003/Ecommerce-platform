import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../../core/services/product';
import { CartService } from '../../../../core/services/cart';
import { ReviewService, Review } from '../../../../core/services/review';
import { Product } from '../../../../modules/product';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private reviewService: ReviewService
  ) {}

  products: Product[] = [];
  filteredProducts: Product[] = [];
  loading = true;
  error: string = '';
  showForm = false;
  editingId: number | null = null;
  quantity: { [key: number]: number } = {};
  
  // Search and Filter
  searchQuery: string = '';
  filterCategory: string = '';
  filterMinPrice: number = 0;
  filterMaxPrice: number = 100000;
  categories: string[] = [];
  
  // Review management
  showReviews = false;
  selectedProductId: number | null = null;
  reviews: Review[] = [];
  pendingReviews: Review[] = [];
  showPendingReviews = false;
  
  // Review form
  showReviewForm = false;
  reviewFormData = { rating: 5, comment: '' };
  editingReviewId: number | null = null;

  formData: Partial<Product> = {
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: '',
    imageUrl: ''
  };

  ngOnInit() {
    console.log('ProductListComponent initialized');
    this.loadProducts();
  }

  loadProducts() {
    console.log('Loading products...');
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (res: Product[]) => {
        console.log('Products received:', res);
        this.products = Array.isArray(res) ? res : [];
        this.products.forEach(p => this.quantity[p.id] = 1);
        this.extractCategories();
        this.applyFilters();
        this.loading = false;
        console.log('Loading complete. Products count:', this.products.length);
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

  openForm() {
    this.showForm = true;
    this.editingId = null;
    this.formData = {
      name: '',
      description: '',
      price: 0,
      stock: 0,
      category: '',
      imageUrl: ''
    };
  }

  editProduct(product: Product) {
    this.editingId = product.id;
    this.formData = { ...product };
    this.showForm = true;
  }

  saveProduct() {
    if (!this.formData.name || !this.formData.price) {
      alert('Please fill in all required fields');
      return;
    }

    console.log('Saving product:', this.formData);

    if (this.editingId) {
      this.productService.updateProduct(this.editingId, this.formData).subscribe({
        next: () => {
          alert('Product updated successfully');
          this.showForm = false;
          this.resetFilters();
          setTimeout(() => this.loadProducts(), 100);
        },
        error: (err) => {
          console.error('Error updating product:', err);
          alert('Failed to update product: ' + (err.error?.message || err.message || 'Unknown error'));
        }
      });
    } else {
      this.productService.addProduct(this.formData).subscribe({
        next: (res) => {
          console.log('Product added:', res);
          alert('Product added successfully');
          this.showForm = false;
          this.resetFilters();
          setTimeout(() => this.loadProducts(), 100);
        },
        error: (err) => {
          console.error('Error adding product:', err);
          alert('Failed to add product: ' + (err.error?.message || err.message || 'Unknown error'));
        }
      });
    }
  }

  cancelForm() {
    this.showForm = false;
    this.editingId = null;
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          alert('Product deleted successfully');
          this.resetFilters();
          this.loadProducts();
        },
        error: (err) => {
          console.error('Error deleting product:', err);
          alert('Failed to delete product');
        }
      });
    }
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

  // Review methods
  openProductReviews(productId: number) {
    this.selectedProductId = productId;
    this.showReviews = true;
    this.loadProductReviews(productId);
  }

  loadProductReviews(productId: number) {
    this.reviewService.getProductReviews(productId).subscribe({
      next: (res) => {
        this.reviews = res ?? [];
      },
      error: (err) => {
        console.error('Error fetching reviews:', err);
        this.reviews = [];
      }
    });
  }

  loadPendingReviews() {
    this.reviewService.getPendingReviews().subscribe({
      next: (res) => {
        this.pendingReviews = res ?? [];
        this.showPendingReviews = true;
        if (this.pendingReviews.length === 0) {
          console.log('No pending reviews');
        } else {
          console.log('Pending reviews loaded:', this.pendingReviews);
        }
      },
      error: (err) => {
        console.error('Error fetching pending reviews:', err);
        alert('Failed to load pending reviews: ' + (err.error?.message || err.message || 'Unknown error'));
      }
    });
  }

  openReviewForm() {
    this.showReviewForm = true;
    this.editingReviewId = null;
    this.reviewFormData = { rating: 5, comment: '' };
  }

  editReview(review: Review) {
    this.editingReviewId = review.id;
    this.reviewFormData = { rating: review.rating, comment: review.comment };
    this.showReviewForm = true;
  }

  saveReview() {
    if (!this.reviewFormData.comment) {
      alert('Please enter a comment');
      return;
    }

    if (this.editingReviewId) {
      this.reviewService.updateReview(this.editingReviewId, this.reviewFormData.rating, this.reviewFormData.comment).subscribe({
        next: () => {
          alert('Review updated successfully');
          this.showReviewForm = false;
          this.selectedProductId && this.loadProductReviews(this.selectedProductId);
        },
        error: (err) => {
          console.error('Error updating review:', err);
          alert('Failed to update review');
        }
      });
    } else if (this.selectedProductId) {
      this.reviewService.createReview(this.selectedProductId, this.reviewFormData.rating, this.reviewFormData.comment).subscribe({
        next: () => {
          alert('Review submitted successfully');
          this.showReviewForm = false;
          this.loadProductReviews(this.selectedProductId!);
        },
        error: (err) => {
          console.error('Error creating review:', err);
          alert('Failed to create review');
        }
      });
    }
  }

  cancelReviewForm() {
    this.showReviewForm = false;
    this.editingReviewId = null;
  }

  approveReview(id: number) {
    this.reviewService.approveReview(id).subscribe({
      next: () => {
        alert('Review approved');
        this.loadPendingReviews();
      },
      error: (err) => {
        console.error('Error approving review:', err);
        alert('Failed to approve review');
      }
    });
  }

  deleteReview(id: number, isPending: boolean = false) {
    if (confirm('Are you sure you want to delete this review?')) {
      this.reviewService.deleteReview(id).subscribe({
        next: () => {
          alert('Review deleted successfully');
          if (isPending) {
            this.loadPendingReviews();
          } else if (this.selectedProductId) {
            this.loadProductReviews(this.selectedProductId);
          }
        },
        error: (err) => {
          console.error('Error deleting review:', err);
          alert('Failed to delete review');
        }
      });
    }
  }

  closeReviewsPanel() {
    this.showReviews = false;
    this.selectedProductId = null;
  }

  closePendingReviews() {
    this.showPendingReviews = false;
  }

  getReviewerName(review: Review): string {
    return review.User?.name || 'Anonymous';
  }

  getProductName(review: Review): string {
    return review.Product?.name || 'Unknown Product';
  }
}













