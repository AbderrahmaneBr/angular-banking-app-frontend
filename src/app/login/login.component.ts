import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        try {
          const token = response['access-token'];
          localStorage.setItem('token', token);
          this.isLoading = false;
          // Simple redirect to home page
          window.location.href = '/';
        } catch (err) {
          console.error('Token decode error:', err);
          this.errorMessage = 'Failed to process authentication token';
          this.isLoading = false;
        }
      },
      error: (err) => {
        console.error('Login error:', err);
        this.errorMessage = 'Authentication failed';
        this.isLoading = false;
      },
    });
  }
}
