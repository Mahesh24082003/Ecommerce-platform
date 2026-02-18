import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from '../services/token';

export const customerGuard: CanActivateFn = () => {
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

  if (tokenService.isCustomer()) {
    return true;
  }

  // Non-customer users should be sent to their allowed landing page.
  router.navigate(['/admin']);
  return false;
};
