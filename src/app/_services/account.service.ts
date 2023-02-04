import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { enviroment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = enviroment.apiUrl;
  private currectUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currectUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currectUserSource.next(user);
        }
      })
    );
  }

  register(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map(user => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currectUserSource.next(user);
        }
      })
    );
  }

  setCurrentUser(user: User) {
    this.currectUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currectUserSource.next(null);
  }
}
