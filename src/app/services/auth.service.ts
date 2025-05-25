import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  UserProfile,
} from '../model/auth.model';
import { tap } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = environment.apiUrl + '/auth';
  private authToken = new BehaviorSubject<string | null>(
    localStorage.getItem('token')
  );

  constructor(private http: HttpClient) {}

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, request).pipe(
      tap((response) => {
        localStorage.setItem('token', response['access-token']);
        this.authToken.next(response['access-token']);
      })
    );
  }

  register(request: RegisterRequest): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, request);
  }

  getProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.API_URL}/profile`);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.authToken.next(null);
  }

  getToken(): string | null {
    return this.authToken.value;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  authStatus() {
    return this.authToken.asObservable();
  }
}
