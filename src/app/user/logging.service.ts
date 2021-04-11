import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AppService} from './app.service';
import {User} from './user';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  constructor(private http: HttpClient, private appService: AppService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  login(username: string, password: string) {
    return this.http.post<any>('users/authenticate', { username, password }).pipe(map(user => {
      console.log(JSON.stringify(user));
      if (user && user.token) {
        console.log(JSON.stringify(user));
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.appService.setUserLoggedIn(true);
        return user;
      }

    }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.appService.setUserLoggedIn(false);
    this.currentUserSubject.next(null);
  }
}
