import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { FileInput } from 'ngx-material-file-input';

const API_URL = 'http://localhost:8080/avatar/';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) {
  }

  public updateAvatar(fileInput: FileInput): Observable<any>  {
    const file_form: FileInput = fileInput;
    const file = file_form.files[0];

    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(API_URL + 'upload', formData);
  }
}