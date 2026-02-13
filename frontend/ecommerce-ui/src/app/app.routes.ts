import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login';
import { RegisterComponent } from './modules/auth/register/register';
import { ProductListComponent } from './modules/product-list/products/product-list.component/product-list.component';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: '', component: ProductListComponent,canActivate: [authGuard] },   // homepage after login
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];
