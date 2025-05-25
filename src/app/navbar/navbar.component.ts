import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  isAdmin: boolean = false;
  isAuthenticated: boolean = false;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.isAdmin = payload.scope === 'ROLE_ADMIN';
        this.isAuthenticated = true;
      } catch (err) {
        console.error('Failed to decode token:', err);
      }
    }
  }

  handleLogout() {
    localStorage.removeItem('token');
    this.isAdmin = false;
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }
}
