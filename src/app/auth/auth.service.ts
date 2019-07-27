import { Injectable } from '@angular/core';
import urljoin from 'url-join';
import { environment } from '../../environments/environment';
import { User } from './user.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()

export class AuthService {
    usersUrl: string;
    currentUser?: User;

    constructor(private http: HttpClient,
        private router: Router) {
        this.usersUrl = urljoin(environment.apiUrl, 'auth');
        if (this.isLoggedIn()) {
            const { userId, email, firstName, lastName } = JSON.parse(localStorage.getItem('user'));
            this.currentUser = new User(email, null, firstName, lastName, userId);
        }
    }

    signin(user: User) {
        const body = JSON.stringify(user);
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post(urljoin(this.usersUrl, 'signin'), body, { headers })
            .pipe(
                map((response: any) => {
                    this.login(response);
                    return response;
                }),
                // catchError((error: Response) => throwError(error.json()))
                catchError(this.handleError)
            );
    }

    signup(user: User) {
        const body = JSON.stringify(user);
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post(urljoin(this.usersUrl, 'signup'), body, { headers })
            .pipe(
                map((response: any) => {
                    this.login(response);
                    return response;
                }),
                catchError(this.handleError)
            );
    }

    login = ({ token, userId, firstName, lastName, email }) => {
        this.currentUser = new User(email, null, firstName, lastName, userId);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify({ userId, firstName, lastName, email }));
        this.router.navigateByUrl('/');
    }

    isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }

    logout() {
        localStorage.clear();
        this.currentUser = null;
        this.router.navigateByUrl('/');
    }

   
    private handleError(err: HttpErrorResponse) {
        if (err.error instanceof ErrorEvent) {
            console.error('An error ocurred: ', err.error.message);
        } else {
            console.log('err not instanceof ErrorEvent');
            console.error(err.error);
        }

        return throwError('something bad happened; please try again later.');
    }

}