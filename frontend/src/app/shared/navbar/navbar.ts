import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import { TokenService } from '../../core/services/token';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  showUserMenu = false;
  isAdmin = false;
  isCustomer = false;
  private destroy$ = new Subject<void>();

  constructor(
    private auth: AuthService, 
    private router: Router,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    // Subscribe to login state changes
    this.auth.isLoggedIn$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(status => {
      this.isLoggedIn = status;
      this.isAdmin = this.tokenService.isAdmin();
      this.isCustomer = this.tokenService.isCustomer();
    });

    // Initial check
    this.isLoggedIn = this.auth.isLoggedIn();
    this.isAdmin = this.tokenService.isAdmin();
    this.isCustomer = this.tokenService.isCustomer();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  logout() {
    this.auth.logout();
    this.isLoggedIn = false;
    this.isAdmin = false;
    this.isCustomer = false;
    this.showUserMenu = false;
    this.router.navigate(['/login']);
  }

  closeUserMenu() {
    this.showUserMenu = false;
  }
}
