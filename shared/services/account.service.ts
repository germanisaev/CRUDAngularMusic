import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';

const httpOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json')
};

@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;
    private REST_API_SERVER: string = environment.apiUrl;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }
    /*
    login(username, password) {
        //debugger;
        return this.http.post<User>(`${environment.apiUrl}/users/authenticate`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }
    */
    login(username, password) {
        //debugger;
        return this.http.post<User>(`${this.REST_API_SERVER}/identity/login`, { username, password }, httpOptions)
            .pipe(map(
                user => {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('user', JSON.stringify(user));
                    localStorage.setItem('token', JSON.stringify(user.Token));
                    this.userSubject.next(user);
                    return user;
                }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    register(user: User) {
        //debugger;
        return this.http.post(`${this.REST_API_SERVER}/identity/register`, JSON.stringify(user), httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }

    getAll() {
        return this.http.get<User[]>(`${this.REST_API_SERVER}/users`);
    }

    getById(id: string) {
        return this.http.get<User>(`${this.REST_API_SERVER}/users/${id}`);
    }

    update(id, params) {
        return this.http.put(`${this.REST_API_SERVER}/users/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue.Id) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${this.REST_API_SERVER}/users/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue.Id) {
                    this.logout();
                }
                return x;
            }));
    }

    private handleError(error: HttpErrorResponse) {
        let errorMessage = 'Unknown error!';
        if (error.error instanceof ErrorEvent) {
            // Client-side errors
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // Server-side errors
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        //window.alert(errorMessage);
        return throwError(errorMessage);
    }
}