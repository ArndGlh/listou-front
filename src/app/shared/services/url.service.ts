import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

const API_URL = 'http://localhost:8080/api/test/';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor(private http: HttpClient) {
  }

  getFooterUrls(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }
}
