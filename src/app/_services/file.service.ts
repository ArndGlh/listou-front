import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const API_URL = 'http://localhost:8080/avatar/';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient,
    private tokenStorageService: TokenStorageService) {
  }

  public updateAvatar(fileInput: File): Observable<any>  {
    const uploadImageData = new FormData();
    const user = this.tokenStorageService.getUser();

    uploadImageData.append('imageFile', fileInput);
    uploadImageData.append('userId', user.id);

    return this.http.post(API_URL + 'upload', uploadImageData, { observe: 'response' });
  }

  public getAvatar(): Observable<any> {
    return this.http.get(API_URL + this.tokenStorageService.getUser().id);
  }
}