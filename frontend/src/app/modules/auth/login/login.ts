import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { TokenService } from '../../../core/services/token';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';
  rememberMe = false;
  message = '';
  error = '';
  loading = false;
  showPassword = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    // If user is already logged in, redirect to home
    if (this.auth.isLoggedIn()) {
      this.navigateByRole();
    }
    
    // Check if user had "Remember Me" enabled
    if (this.auth.isRemembered()) {
      this.rememberMe = true;
    }
  }

  private navigateByRole() {
    if (this.tokenService.isAdmin()) {
      this.router.navigate(['/admin']);
      return;
    }

    this.router.navigate(['/home']);
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validateForm(): boolean {
    this.error = '';
    this.message = '';

    if (!this.email.trim()) {
      this.error = 'Email is required';
      return false;
    }

    if (!this.validateEmail(this.email)) {
      this.error = 'Please enter a valid email address';
      return false;
    }

    if (!this.password) {
      this.error = 'Password is required';
      return false;
    }

    if (this.password.length < 6) {
      this.error = 'Password must be at least 6 characters';
      return false;
    }

    return true;
  }

  login() {
    if (!this.validateForm()) {
      return;
    }

    this.loading = true;
    this.error = '';
    this.message = '';

    console.log('Attempting login with email:', this.email);

    this.auth.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res: any) => {
        console.log('Login response received:', res);
        this.auth.setToken(res.token, this.rememberMe);
        this.message = 'Login successful! Redirecting...';
        this.loading = false;
        setTimeout(() => {
          console.log('Navigating based on role...');
          this.navigateByRole();
        }, 1000);
      },
      error: (err) => {
        console.error('Login error:', err);
        this.loading = false;
        this.error = err.error?.message || 'Invalid email or password';
      }
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
