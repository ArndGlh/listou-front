import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ComSubject } from '../components/application-services/models/com-subject';
import { Suggestion } from '../components/application-services/models/suggestion.model';
import { TokenStorageService } from './token-storage.service';

const API_URL = 'http://localhost:8080/communication/';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  constructor(private http: HttpClient,
    private tokenStorageService: TokenStorageService) { }

  public sendSuggestion(suggestion: Suggestion): Observable<any>  {
    const user = this.tokenStorageService.getUser();
    const suggestionData = new FormData();

    suggestionData.append('userId', user.id);
    suggestionData.append('suggestionSubject', suggestion.subjectSuggestion);
    suggestionData.append('suggestionComment', suggestion.comment);

    return this.http.post(API_URL + 'suggestion', suggestionData, { observe: 'response' });
  }

  public getSuggestionSubjects(): Observable<ComSubject[]> {
    return this.http.get<ComSubject[]>(API_URL + 'suggestion/subjects');
  }
}
