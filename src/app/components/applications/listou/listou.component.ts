import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { fadeIn } from 'src/app/shared/animations/fade-in';
import { EventService } from 'src/app/_services/event.service';
import { DialogCreateEventComponent } from './dialog-create-event/dialog-create-event.component';

@Component({
  selector: 'listou',
  templateUrl: './listou.component.html',
  styleUrls: ['./listou.component.scss'],
  animations: [
    fadeIn
  ]
})
export class ListouComponent implements OnInit {

  public aucunEvent: boolean;
  public newEvent: string[] = [];
  constructor(private router: Router,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private eventService: EventService) {
    this.aucunEvent = true;
   }

  ngOnInit(): void {
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
}
