import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { fadeIn } from 'src/app/shared/animations/fade-in';
import { EventService } from 'src/app/_services/event.service';
import { DialogCreateEventComponent } from './dialog-create-event/dialog-create-event.component';
import { Event } from './models/event.model';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';

@Component({
  selector: 'listou',
  templateUrl: './listou.component.html',
  styleUrls: ['./listou.component.scss'],
  animations: [
    fadeIn,
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ]
})
export class ListouComponent implements OnInit {

  public events: Event[] = [];
  public aucunEvent: boolean;
  public showDetailsEvenement: boolean;
  public eventToDisplay!: Event;
  public newEvent: string[] = [];
  gridColumns = 4;

  constructor(private router: Router,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private eventService: EventService) {
    this.aucunEvent = true;
    this.showDetailsEvenement = false;
   }

  ngOnInit(): void {
    this.eventService.getEvent().subscribe(result => {
      console.log(result);
      this.aucunEvent = result.length < 1;
      this.events = result;
    });
  }

  public openDialogCreateEvent(): void {
    const dialogRef = this.dialog.open(DialogCreateEventComponent, {
      width: '650px',
      height: '700px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.newEvent = result;
        this.eventService.createEvent(this.newEvent).subscribe(
          (response) => {
            if (response.status === 200) {
              this.toastr.success('Evènement créé !');
            } else {
              this.toastr.error('Création de l\'évènement échouée !');
            }
          }
        );
      }
    });
  }

  public showDetailsEvent(index: number){
    this.eventToDisplay = this.events[index];
    this.showDetailsEvenement = true;
  }
}
