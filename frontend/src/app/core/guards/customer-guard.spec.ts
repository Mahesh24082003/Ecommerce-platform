import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';
import { vi } from 'vitest';
import { customerGuard } from './customer-guard';
import { TokenService } from '../services/token';

describe('customerGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => customerGuard(...guardParameters));

  let router: { navigate: ReturnType<typeof vi.fn> };
  let tokenService: {
    isTokenExpired: ReturnType<typeof vi.fn>;
    isCustomer: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    localStorage.clear();
    router = { navigate: vi.fn() };
    tokenService = {
      isTokenExpired: vi.fn(() => false),
      isCustomer: vi.fn(() => false)
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: router },
        { provide: TokenService, useValue: tokenService }
      ]
    });
  });

  it('allows customer user', () => {
    localStorage.setItem('token', 'valid-token');
    tokenService.isTokenExpired.mockReturnValue(false);
    tokenService.isCustomer.mockReturnValue(true);

    const result = executeGuard({} as any, {} as any);

    expect(result).toBe(true);
  });

  it('redirects admin user to /admin', () => {
    localStorage.setItem('token', 'valid-token');
    tokenService.isTokenExpired.mockReturnValue(false);
    tokenService.isCustomer.mockReturnValue(false);

    const result = executeGuard({} as any, {} as any);

    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/admin']);
  });
});
