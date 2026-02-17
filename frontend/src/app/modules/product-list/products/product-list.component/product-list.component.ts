import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../../core/services/product';
import { CartService } from '../../../../core/services/cart';
import { Product } from '../../../../modules/product';
import  {FormsModule} from '@angular/forms';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
constructor(private productService: ProductService,private cartService: CartService) {}
products: Product[] = [];
loading = true;
  ngOnInit() {
    this.productService.getProducts().subscribe((res: Product[]) => {
      this.products = res ?? [];
      this.loading = false;
    });
  }
    addToCart(id: number) {
      this.cartService.addToCart(id).subscribe({
        next: () => alert('Added to cart'),
        error: () => alert('Login required')
      });
    }
  }















