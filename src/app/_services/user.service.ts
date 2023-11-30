import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../components/user/models/user.model';
import { Role } from '../components/user/models/role.model';
import { TokenStorageService } from './token-storage.service';

const API_URL = 'http://localhost:8080/user/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersub = new BehaviorSubject<User>(null);

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {}

  emitUserSubject() {}

  setUserSubject(user: User) {
    this.usersub.next(user);
  }

  getUserSubject(): Observable<User> {
    return this.usersub.asObservable();
  }

  updateUsername(username: string): Observable<any> {
    const uploadUserData = new FormData();
    const user = this.tokenStorageService.getUser();

    uploadUserData.append('username', username);
    uploadUserData.append('userId', user.id);
    return this.http.post(API_URL + 'username', uploadUserData, {
      observe: 'response',
    });
  }

  updateEmail(email: string): Observable<any> {
    const uploadUserData = new FormData();
    const user = this.tokenStorageService.getUser();

    uploadUserData.append('email', email);
    uploadUserData.append('userId', user.id);
    return this.http.post(API_URL + 'email', uploadUserData, {
      observe: 'response',
    });
  }

  updatePassword(password: string): Observable<any> {
    const uploadUserData = new FormData();
    const user = this.tokenStorageService.getUser();

    uploadUserData.append('password', password);
    uploadUserData.append('userId', user.id);
    return this.http.post(API_URL + 'password', uploadUserData, {
      observe: 'response',
    });
  }
}
