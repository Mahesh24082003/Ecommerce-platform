import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from '../services/token';

export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const tokenService = inject(TokenService);

  const token = localStorage.getItem('token');

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  if (tokenService.isTokenExpired()) {
    localStorage.removeItem('token');
    router.navigate(['/login']);
    return false;
  }

  if (tokenService.isAdmin()) {
    return true;
  }

  // User is not admin, redirect to customer home.
  alert('Access denied! You do not have admin privileges.');
  router.navigate(['/home']);
  return false;
};
