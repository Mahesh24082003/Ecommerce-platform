import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { LoginComponent } from './login';
import { AuthService } from '../../../core/services/auth';
import { TokenService } from '../../../core/services/token';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceMock: {
    isLoggedIn: ReturnType<typeof vi.fn>;
    isRemembered: ReturnType<typeof vi.fn>;
    login: ReturnType<typeof vi.fn>;
    setToken: ReturnType<typeof vi.fn>;
  };
  let tokenServiceMock: {
    isAdmin: ReturnType<typeof vi.fn>;
  };
  let router: Router;
  let navigateSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(async () => {
    authServiceMock = {
      isLoggedIn: vi.fn(() => false),
      isRemembered: vi.fn(() => false),
      login: vi.fn(),
      setToken: vi.fn()
    };

    tokenServiceMock = {
      isAdmin: vi.fn(() => false)
    };

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: authServiceMock },
        { provide: TokenService, useValue: tokenServiceMock }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('redirects logged-in admin to /admin on init', () => {
    authServiceMock.isLoggedIn.mockReturnValue(true);
    tokenServiceMock.isAdmin.mockReturnValue(true);

    component.ngOnInit();

    expect(navigateSpy).toHaveBeenCalledWith(['/admin']);
  });

  it('redirects logged-in customer to /home on init', () => {
    authServiceMock.isLoggedIn.mockReturnValue(true);
    tokenServiceMock.isAdmin.mockReturnValue(false);

    component.ngOnInit();

    expect(navigateSpy).toHaveBeenCalledWith(['/home']);
  });

  it('navigates admin to /admin after successful login', () => {
    vi.useFakeTimers();
    component.email = 'admin@test.com';
    component.password = 'secret123';
    authServiceMock.login.mockReturnValue(of({ token: 'admin-token' }));
    tokenServiceMock.isAdmin.mockReturnValue(true);

    component.login();
    vi.advanceTimersByTime(1000);

    expect(authServiceMock.setToken).toHaveBeenCalledWith('admin-token', false);
    expect(navigateSpy).toHaveBeenCalledWith(['/admin']);
    vi.useRealTimers();
  });

  it('navigates customer to /home after successful login', () => {
    vi.useFakeTimers();
    component.email = 'customer@test.com';
    component.password = 'secret123';
    authServiceMock.login.mockReturnValue(of({ token: 'customer-token' }));
    tokenServiceMock.isAdmin.mockReturnValue(false);

    component.login();
    vi.advanceTimersByTime(1000);

    expect(authServiceMock.setToken).toHaveBeenCalledWith('customer-token', false);
    expect(navigateSpy).toHaveBeenCalledWith(['/home']);
    vi.useRealTimers();
  });
});
