import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { fadeIn } from 'src/app/shared/animations/fade-in';
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
  constructor(private router: Router,
    public dialog: MatDialog) {
    this.aucunEvent = true;
   }

  ngOnInit(): void {
  }

  public openDialogCreateEvent(): void {
    const dialogRef = this.dialog.open(DialogCreateEventComponent, {
      width: '650px',
      height: '700px'
      // height: '700px',
      // data: notif
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        // this.notifToSave = result;
        // this.saveNotif();
      }
    });
}
}
