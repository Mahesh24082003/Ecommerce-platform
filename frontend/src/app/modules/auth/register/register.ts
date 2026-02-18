import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent implements OnInit {

  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  message = '';
  error = '';
  loading = false;
  showPassword = false;
  showConfirmPassword = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    // If user is already logged in, redirect to home
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validateForm(): boolean {
    this.error = '';
    this.message = '';

    if (!this.name.trim()) {
      this.error = 'Name is required';
      return false;
    }

    if (this.name.trim().length < 2) {
      this.error = 'Name must be at least 2 characters';
      return false;
    }

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

    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match';
      return false;
    }

    return true;
  }

  register() {
    if (!this.validateForm()) {
      return;
    }

    this.loading = true;
    this.error = '';
    this.message = '';

    console.log('Attempting registration with email:', this.email);

    this.auth.register({
      name: this.name,
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => {
        console.log('Registration successful');
        this.message = 'Account created successfully! Redirecting to login...';
        this.loading = false;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },
      error: (err) => {
        console.error('Registration error:', err);
        this.loading = false;
        this.error = err.error?.message || 'Registration failed. Please try again.';
      }
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
