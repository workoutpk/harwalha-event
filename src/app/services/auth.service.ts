import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../interfaces/login-response';
import { LoginRequest } from '../interfaces/login-request';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://staging.harwalah.com/api/v1/event/organizer/login'; // Replace with your actual API endpoint
    private currentUserSubject = new BehaviorSubject<LoginResponse | null>(null);
    public currentUser$ = this.currentUserSubject.asObservable();

    constructor(private http: HttpClient) {
        // Check for existing token in localStorage on service initialization
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            this.currentUserSubject.next(JSON.parse(storedUser));
        }
    }

    login(loginRequest: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(this.apiUrl, loginRequest).pipe(
            tap(response => {
                // Store user details and jwt token in local storage
                localStorage.setItem('currentUser', JSON.stringify(response));
                // localStorage.setItem('token', response.token);
                this.currentUserSubject.next(response);
            }),
            catchError(error => {
                console.error('Login failed', error);
                throw error;
            })
        );
    }

    logout() {
        // Remove user from local storage and reset current user subject
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        this.currentUserSubject.next(null);
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem('token');
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }
}
