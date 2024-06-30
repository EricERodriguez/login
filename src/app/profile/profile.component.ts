import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  username = '';
  email = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.getProfile(token).subscribe(
        (response) => {
          this.username = response.username;
          this.email = response.email;
        },
        (error) => {
          console.error('Failed to fetch profile', error);
        }
      );
    } else {
      this.router.navigate(['/login']);
    }
  }

  updateProfile() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService
        .updateProfile(token, this.username, this.email)
        .subscribe(
          (response) => {
            console.log('Profile updated', response);
          },
          (error) => {
            console.error('Failed to update profile', error);
          }
        );
    }
  }

  deleteProfile() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.deleteProfile(token).subscribe(
        (response) => {
          localStorage.removeItem('token');
          this.router.navigate(['/register']);
        },
        (error) => {
          console.error('Failed to delete profile', error);
        }
      );
    }
  }
}
