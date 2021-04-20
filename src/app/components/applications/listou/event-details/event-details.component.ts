import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Event } from '../models/event.model';

@Component({
  selector: 'event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  @Output() showDetailsEvenement = new EventEmitter<boolean>();
  @Input() event!: Event;

  constructor() { }

  ngOnInit(): void {
  }

  public precedent(){
    this.showDetailsEvenement.emit(false);
  }
}
function input() {
  throw new Error('Function not implemented.');
}

