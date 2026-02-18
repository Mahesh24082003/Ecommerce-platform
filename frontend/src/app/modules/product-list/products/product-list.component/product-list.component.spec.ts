import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ProductService } from '../../../../core/services/product';
import { CartService } from '../../../../core/services/cart';
import { ReviewService } from '../../../../core/services/review';
import { ProductListComponent } from './product-list.component';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListComponent],
      providers: [
        {
          provide: ProductService,
          useValue: {
            getProducts: () => of([])
          }
        },
        {
          provide: CartService,
          useValue: {
            addToCart: () => of({})
          }
        },
        {
          provide: ReviewService,
          useValue: {
            getProductReviews: () => of([]),
            getPendingReviews: () => of([]),
            updateReview: () => of({}),
            createReview: () => of({}),
            approveReview: () => of({}),
            deleteReview: () => of({})
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
