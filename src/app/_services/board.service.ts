import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const API_URL = 'http://localhost:8080/board/';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

    constructor(private http: HttpClient,
        private tokenStorageService: TokenStorageService) { }

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

    public notifUser(comment: string, userId: string, subject: string, userComment: string): Observable<any>{
        const userData = new FormData();

        userData.append('userId', userId);
        userData.append('notificationComment', comment);
        userData.append('subject', subject);
        userData.append('userComment', userComment);

        return this.http.post(API_URL + '', userData, { observe: 'response' });
    }
}