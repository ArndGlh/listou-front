import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from '../components/user/models/user.model';
import { Role } from '../components/user/models/role.model';
import { TokenStorageService } from './token-storage.service';

const API_URL = 'http://localhost:8080/user/';

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

  updateUsername(username: string): Observable<any> {
    const uploadUserData = new FormData();
    const user = this.tokenStorageService.getUser();

    uploadUserData.append('username', username);
    uploadUserData.append('userId', user.id);
    return this.http.post(API_URL + 'username', uploadUserData, { observe: 'response' });
  }
}
