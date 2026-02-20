import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login';
import { RegisterComponent } from './modules/auth/register/register';
import { ForgotPasswordComponent } from './modules/auth/forgot-password/forgot-password';
import { ProductListComponent } from './modules/product-list/products/product-list.component/product-list.component';
import { CustomerHomeComponent } from './modules/customer/customer-home/customer-home';
import { CartComponent } from './modules/customer/cart/cart';
import { WishlistComponent } from './modules/customer/wishlist/wishlist';
import { ProfileComponent } from './modules/customer/profile/profile';
import { OrdersComponent } from './modules/customer/orders/orders';
import { CheckoutComponent } from './modules/customer/checkout/checkout';
import { adminGuard } from './core/guards/admin-guard';
import { customerGuard } from './core/guards/customer-guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: CustomerHomeComponent, canActivate: [customerGuard] },
  { path: 'cart', component: CartComponent, canActivate: [customerGuard] },
  { path: 'wishlist', component: WishlistComponent, canActivate: [customerGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [customerGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [customerGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [customerGuard] },
  { path: 'admin', component: ProductListComponent, canActivate: [adminGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent }
];
