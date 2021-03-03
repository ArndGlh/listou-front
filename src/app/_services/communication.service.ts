import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BugReport } from '../components/application-services/models/bugreport.model';
import { ComSubject } from '../components/application-services/models/com-subject';
import { Contact } from '../components/application-services/models/contact.model';
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

  public sendBugreport(bugreport: BugReport): Observable<any>  {
    const user = this.tokenStorageService.getUser();
    const bugreportData = new FormData();

    bugreportData.append('userId', user.id);
    bugreportData.append('bugreportSubject', bugreport.subjectBugreport);
    bugreportData.append('bugreportComment', bugreport.comment);

    return this.http.post(API_URL + 'bugreport', bugreportData, { observe: 'response' });
  }

  public sendContact(contact: Contact): Observable<any>  {
    const user = this.tokenStorageService.getUser();
    const contactData = new FormData();

    contactData.append('userId', user.id);
    contactData.append('contactComment', contact.comment);

    return this.http.post(API_URL + 'contact', contactData, { observe: 'response' });
  }

  public getSuggestionSubjects(): Observable<ComSubject[]> {
    return this.http.get<ComSubject[]>(API_URL + 'suggestion/subjects');
  }
}
