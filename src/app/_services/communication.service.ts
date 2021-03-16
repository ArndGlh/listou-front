import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BugReport } from '../components/application-services/models/bugreport.model';
import { ComSubject } from '../components/application-services/models/com-subject';
import { Contact } from '../components/application-services/models/contact.model';
import { Suggestion } from '../components/application-services/models/suggestion.model';
import { TokenStorageService } from './token-storage.service';

const API_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  constructor(private http: HttpClient,
    private tokenStorageService: TokenStorageService) { }

    // POST ============================================================
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

    return this.http.post(API_URL + 'bugReport', bugreportData, { observe: 'response' });
  }

  public sendContact(contact: Contact): Observable<any>  {
    const user = this.tokenStorageService.getUser();
    const contactData = new FormData();

    contactData.append('userId', user.id);
    contactData.append('contactComment', contact.comment);

    return this.http.post(API_URL + 'contact', contactData, { observe: 'response' });
  }

  // GET ============================================================
  public getSuggestionSubjects(): Observable<ComSubject[]> {
    return this.http.get<ComSubject[]>(API_URL + 'suggestion/subjects');
  }

  public getSuggestions(): Observable<any> {
    return this.http.get(API_URL + 'suggestion');
  }

  public getBugReports(): Observable<any> {
    return this.http.get(API_URL + 'bugReport');
  }

  public getContacts(): Observable<any> {
    return this.http.get(API_URL + 'contact');
  }

  // PUT ============================================================
  public putSuggestions(suggestion: any): Observable<any>  {
    const suggestionData = new FormData();
    suggestionData.append('suggestionId', suggestion.notificationId);
    suggestionData.append('suggestionState', suggestion.state);

    return this.http.put(API_URL + 'suggestion', suggestionData, { observe: 'response' });
  }

  public putBugReport(bugReport: any): Observable<any>  {
    const bugReportData = new FormData();
    bugReportData.append('bugReportId', bugReport.notificationId);
    bugReportData.append('bugReportState', bugReport.state);

    return this.http.put(API_URL + 'bugReport', bugReportData, { observe: 'response' });
  }

  public putContact(contact: any): Observable<any>  {
    const contactData = new FormData();
    contactData.append('contactId', contact.notificationId);
    contactData.append('contactState', contact.state);

    return this.http.put(API_URL + 'contact', contactData, { observe: 'response' });
  }
}
