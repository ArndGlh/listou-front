import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { FileInput } from 'ngx-material-file-input';
import { TokenStorageService } from './token-storage.service';

const API_URL = 'http://localhost:8080/avatar/';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient,
    private tokenStorageService: TokenStorageService) {
  }

  // public updateAvatarold(fileInput: FileInput): Observable<any>  {
  //   const user = this.tokenStorageService.getUser();
  //   const file_form: FileInput = fileInput;
  //   const file = file_form.files[0];

  //   const formData = new FormData();
  //   formData.append('file', file);
  //   formData.append('userId', user.id);

  //   return this.http.post(API_URL + 'upload', formData);

  // }

  public updateAvatar(fileInput: File, fileName: string,): Observable<any>  {
    const uploadImageData = new FormData();
    const user = this.tokenStorageService.getUser();

    uploadImageData.append('imageFile', fileInput, fileName);
    uploadImageData.append('userId', user.id);

    return this.http.post(API_URL + 'upload', uploadImageData, { observe: 'response' });
  }

  public getAvatar(imageName: string): Observable<any> {
    const getImageData = new FormData();
    getImageData.append('imageName', imageName);
    return this.http.post(API_URL, getImageData);
  }
}