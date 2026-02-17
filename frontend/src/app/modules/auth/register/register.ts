import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.html'
})
export class RegisterComponent {

  name = '';
  email = '';
  password = '';
  message = '';

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    this.auth.register({
      name: this.name,
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => {
        this.message = "Account created successfully";
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.message = err.error?.message || "Registration failed";
      }
    });
  }
}
