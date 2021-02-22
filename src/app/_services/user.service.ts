import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from '../components/user/models/user.model';
import { Role } from '../components/user/models/role.model';
import { TokenStorageService } from './token-storage.service';

const API_URL = 'http://localhost:8080/test/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersub = new Subject<User>();
  currentUser: User;

  constructor(private http: HttpClient,
    private tokenStorageService: TokenStorageService) {
    let roleTemp = [new Role(0, '')];
    this.currentUser = new User('', '', roleTemp , 0);
  }

  emitUserSubject() {
    this.usersub.next(this.currentUser);
  }

  login(user: User){
    this.currentUser = user;
    this.emitUserSubject();
  }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  updateUsername(username: string): Observable<any> {
    const uploadUserData = new FormData();
    const user = this.tokenStorageService.getUser();

    uploadUserData.append('username', username);

    return this.http.post(API_URL + 'username', uploadUserData, { observe: 'response' });
  }
}
