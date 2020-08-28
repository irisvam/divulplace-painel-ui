import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '../_models/user';

import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { ɵNoopAnimationDriver } from '@angular/animations/browser';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  //private readonly API = `${environment.API}`;
  private readonly API = 'http://localhost:4200/api/divulplace-api-usuario/';

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(json: string) {
    return this.http.post<any>(`${this.API}login`, json)
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return user;
    }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
