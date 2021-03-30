import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { BoardService } from 'src/app/_services/board.service';
import { CommunicationService } from 'src/app/_services/communication.service';
import { Notifications } from '../models/notifications.model';
import { DialogDetailsComponent } from './dialog-details/dialog-details.component';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.scss'],
  styles: [],
  providers: [ConfirmationService]
})
export class BoardAdminComponent implements OnInit {

    public data: Notifications[] = [];
    public notifToSave: any;

    constructor(private communicationService: CommunicationService,
      public dialog: MatDialog,
      private toastr: ToastrService,
      private boardService: BoardService) { }

    ngOnInit(){
        this.boardService.getNotifications().subscribe(res => {
            this.data = res;
        });
    }

    public openDialog(notif: any): void {
        const dialogRef = this.dialog.open(DialogDetailsComponent, {
          width: '650px',
          height: '700px',
          data: notif
        });

        dialogRef.afterClosed().subscribe(result => {
          if(result){
            this.notifToSave = result;
            this.saveNotif();
          }
        });
      }

    public saveNotif(){
        this.notifToSave.oldNotif.state = this.notifToSave.form.state;

        switch(this.notifToSave.oldNotif.type){
            case 'Suggestion':
                this.communicationService.putSuggestions(this.notifToSave.oldNotif).subscribe(res => {
                    if (res.status === 200) {
                        this.toastr.success('Suggestion modifiée !');
                    } else {
                        this.toastr.error('Echec de la modification de la suggestion !');
                    }
                });
                break;
            case 'Bug Reports':
                this.communicationService.putBugReport(this.notifToSave.oldNotif).subscribe(res => {
                    if (res.status === 200) {
                        this.toastr.success('Bug report modifié !');
                    } else {
                        this.toastr.error('Echec de la modification du bug report !');
                    }
                });
                break;
            case 'Contacts':
                this.communicationService.putContact(this.notifToSave.oldNotif).subscribe(res => {
                    if (res.status === 200) {
                        this.toastr.success('Demande de contact modifiée !');
                    } else {
                        this.toastr.error('Echec de la modification de la demande de contact !');
                    }
                });
                break;
        }

        if(this.notifToSave.form.comment !== ''){
            this.boardService.notifUser(this.notifToSave.form.comment, this.notifToSave.oldNotif.userId, this.constructSubject(), this.notifToSave.oldNotif.text).subscribe(res => {
                if (res.status === 200) {
                    this.toastr.success('Réponse envoyée !');
                } else {
                    this.toastr.error('Echec de l\'envoi de la réponse !');
                }
            });
        }
    }

    public constructSubject():string {
        return 'RE: ' + this.notifToSave.oldNotif.type + ' > ' + this.notifToSave.oldNotif.category;
    }
    public replaceUnderscore(str: string): string{
        return str.replace('_', ' ');
    }

    public stateClass(state: string):string {
        switch(state){
            case 'NOUVEAU':
                return 'stateNouveau';
            case 'EN_COURS':
                return 'stateEnCours';
            case 'FINI':
                return 'stateFini';
            default:
                return 'stateNouveau';
        }
    }
}
