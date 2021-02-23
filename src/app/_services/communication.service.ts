import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ComSubject } from '../components/application-services/models/com-subject';
import { TokenStorageService } from './token-storage.service';

const API_URL = 'http://localhost:8080/communication/';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  constructor(private http: HttpClient,
    private tokenStorageService: TokenStorageService) { }

  public updateAvatar(fileInput: File): Observable<any>  {
    const uploadImageData = new FormData();
    const user = this.tokenStorageService.getUser();

    uploadImageData.append('imageFile', fileInput);
    uploadImageData.append('userId', user.id);

    return this.http.post(API_URL + 'upload', uploadImageData, { observe: 'response' });
  }

  public getSuggestionSubjects(): Observable<ComSubject[]> {
    return this.http.get<ComSubject[]>(API_URL + 'suggestion/subjects');
  }
}
