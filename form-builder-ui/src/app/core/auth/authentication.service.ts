import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { User } from '../../shared/models/user.model';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('jwt'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  isAdmin() {
    return _.isEqual(this.currentUserValue.role, 'Admin');
  }

  login(email: string, password: string) {
    return this.http
      .post<User>(`${environment.config.user.login}`, { email, password })
      .pipe(
        map(response => {
          if (response && response.token) {
            localStorage.setItem('jwt', JSON.stringify(response));
            this.currentUserSubject.next(response);
          }
          return response;
        })
      );
  }

  logout() {
    localStorage.removeItem('jwt');
    this.currentUserSubject.next(null);
  }
}
