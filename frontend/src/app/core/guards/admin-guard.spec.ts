import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';
import { vi } from 'vitest';
import { adminGuard } from './admin-guard';
import { TokenService } from '../services/token';

describe('adminGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => adminGuard(...guardParameters));

  let router: { navigate: ReturnType<typeof vi.fn> };
  let tokenService: {
    isTokenExpired: ReturnType<typeof vi.fn>;
    isAdmin: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    localStorage.clear();
    router = { navigate: vi.fn() };
    tokenService = {
      isTokenExpired: vi.fn(() => false),
      isAdmin: vi.fn(() => false)
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: router },
        { provide: TokenService, useValue: tokenService }
      ]
    });
  });

  it('allows admin user', () => {
    localStorage.setItem('token', 'valid-token');
    tokenService.isTokenExpired.mockReturnValue(false);
    tokenService.isAdmin.mockReturnValue(true);

    const result = executeGuard({} as any, {} as any);

    expect(result).toBe(true);
  });

  it('redirects customer user to /home', () => {
    localStorage.setItem('token', 'valid-token');
    tokenService.isTokenExpired.mockReturnValue(false);
    tokenService.isAdmin.mockReturnValue(false);
    vi.spyOn(window, 'alert').mockImplementation(() => {});

    const result = executeGuard({} as any, {} as any);

    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });
});
