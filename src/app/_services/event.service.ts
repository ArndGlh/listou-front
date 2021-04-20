import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const API_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient,
    private tokenStorageService: TokenStorageService) { }

  public createEvent(event: any): Observable<any>  {
    const user = this.tokenStorageService.getUser();
    const eventData = new FormData();

    eventData.append('userId', user.id);
    eventData.append('titleEvent', event.title);
    eventData.append('descriptionEvent', event.description);
    eventData.append('startDateEvent', event.startDate);
    eventData.append('locationEvent', event.location);
    eventData.append('durationEvent', event.duration);

    return this.http.post(API_URL + 'event', eventData, { observe: 'response' });
  }

  public getEvent(): Observable<any> {
    return this.http.get(API_URL + 'event/' + this.tokenStorageService.getUser().id);
  }
}
