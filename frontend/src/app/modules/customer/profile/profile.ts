import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserProfile, UserService } from '../../../core/services/user';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class ProfileComponent implements OnInit {
  profile: UserProfile | null = null;
  loading = true;
  saving = false;
  error = '';

  formData = {
    name: '',
    phone: '',
    address: ''
  };

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.loading = true;
    this.userService.getMyProfile().subscribe({
      next: (res) => {
        this.profile = res;
        this.formData = {
          name: res.name || '',
          phone: res.phone || '',
          address: res.address || ''
        };
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.error?.message || 'Failed to load profile';
        this.loading = false;
      }
    });
  }

  saveProfile() {
    if (!this.formData.name.trim()) {
      alert('Name is required');
      return;
    }

    this.saving = true;
    this.userService.updateMyProfile(this.formData).subscribe({
      next: (res) => {
        this.profile = res;
        this.saving = false;
        alert('Profile updated');
      },
      error: (err) => {
        this.saving = false;
        alert(err?.error?.message || 'Failed to update profile');
      }
    });
  }
}
