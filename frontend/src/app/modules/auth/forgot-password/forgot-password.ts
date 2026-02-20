import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordService } from '../../../core/services/password';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css'
})
export class ForgotPasswordComponent {
  step: 'email' | 'reset' = 'email';
  email: string = '';
  resetToken: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  loading = false;
  message: string = '';
  error: string = '';

  constructor(private passwordService: PasswordService, private router: Router) {}

  requestReset() {
    if (!this.email) {
      this.error = 'Please enter your email address';
      return;
    }

    this.loading = true;
    this.error = '';
    this.message = '';

    this.passwordService.forgotPassword(this.email).subscribe({
      next: (res) => {
        this.resetToken = res.resetToken;
        this.message = 'Reset token generated. Check the console or use the token below to reset your password.';
        console.log('Reset Token:', res.resetToken);
        this.step = 'reset';
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to request password reset';
        this.loading = false;
      }
    });
  }

  resetPasswordSubmit() {
    if (!this.resetToken) {
      this.error = 'Reset token is missing';
      return;
    }

    if (!this.newPassword || !this.confirmPassword) {
      this.error = 'Please enter and confirm your new password';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }

    if (this.newPassword.length < 6) {
      this.error = 'Password must be at least 6 characters';
      return;
    }

    this.loading = true;
    this.error = '';

    this.passwordService.resetPassword(this.resetToken, this.newPassword).subscribe({
      next: () => {
        this.message = 'Password reset successfully! Redirecting to login...';
        this.loading = false;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to reset password';
        this.loading = false;
      }
    });
  }

  backToLogin() {
    this.router.navigate(['/login']);
  }
}
