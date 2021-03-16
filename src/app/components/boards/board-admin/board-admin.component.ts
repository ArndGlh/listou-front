import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { forkJoin, of } from 'rxjs';
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

    public suggestions: any;
    public bugreports: any;
    public contacts: any;
    public notifications: Notifications[] = [];

    public notif: any;
    public notifToSave: any;

    constructor(private communicationService: CommunicationService,
      public dialog: MatDialog,
      private toastr: ToastrService,
      private boardService: BoardService) { }

    ngOnInit() {
      forkJoin([
        this.communicationService.getSuggestions(),
        this.communicationService.getBugReports(),
        this.communicationService.getContacts(),]).subscribe(t=> {
          this.suggestions = t[0];
          this.bugreports = t[1];
          this.contacts = t[2];
          this.constructProducts();
      });
    }

    public constructProducts() {
        this.suggestions.forEach((sugg: any) => {
            this.notifications.push({
                notificationId: sugg.idSuggestion,
                userId: sugg.user.idUser,
                username: sugg.user.username,
                text: sugg.text,
                type: 'Suggestion',
                category: sugg.suggestionType.name,
                date: sugg.suggestionDate,
                state: sugg.state.name
            })
        });
        this.bugreports.forEach((bugR: any) => {
            this.notifications.push({
                notificationId : bugR.idBugReport,
                userId: bugR.user.idUser,
                username: bugR.user.username,
                text: bugR.text,
                type: 'Bug Reports',
                category: bugR.suggestionType.name,
                date: bugR.bugReportDate,
                state: bugR.state.name
            })
        });
        this.contacts.forEach((cont: any) => {
            this.notifications.push({
                notificationId : cont.idContact,
                userId: cont.user.idUser,
                username: cont.user.username,
                text: cont.text,
                type: 'Contacts',
                category: 'CONTACTS',
                date: cont.contactDate,
                state: cont.state.name
            })
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
        switch(this.notifToSave.oldNotif.type){
            case 'Suggestion':
                this.notifToSave.oldNotif.state = this.notifToSave.form.state;
                forkJoin([
                    this.communicationService.putSuggestions(this.notifToSave.oldNotif),
                    this.notifToSave.form.comment == '' ? of() : this.boardService.notifUser(this.notifToSave.form.comment, this.notifToSave.oldNotif.userId)]).subscribe((t: any[])=> {
                        if (t[0].status === 200) {
                            this.toastr.success('Suggestion modifiée !');
                        } else {
                            this.toastr.error('Echec de la modification de la suggestion !');
                        }
                        if (t[1].status === 200) {
                            this.toastr.success('Réponse envoyée !');
                        } else {
                            this.toastr.error('Echec de l\'envoi de la réponse !');
                        }
                });
                break;
            case 'Bug Reports':
                this.notifToSave.oldNotif.state = this.notifToSave.form.state;
                forkJoin([
                    this.communicationService.putBugReport(this.notifToSave.oldNotif),
                    this.notifToSave.form.comment == '' ? of() : this.boardService.notifUser(this.notifToSave.form.comment, this.notifToSave.oldNotif.userId)]).subscribe((t: any[])=> {
                        if (t[0].status === 200) {
                            this.toastr.success('Bug report modifié !');
                        } else {
                            this.toastr.error('Echec de la modification du bug report !');
                        }
                        if (t[1].status === 200) {
                            this.toastr.success('Réponse envoyée !');
                        } else {
                            this.toastr.error('Echec de l\'envoi de la réponse !');
                        }
                });
                break;
            case 'Contacts':
                this.notifToSave.oldNotif.state = this.notifToSave.form.state;
                forkJoin([
                    this.communicationService.putContact(this.notifToSave.oldNotif),
                    this.notifToSave.form.comment == '' ? of() : this.boardService.notifUser(this.notifToSave.form.comment, this.notifToSave.oldNotif.userId)]).subscribe((t: any[])=> {
                        if (t[0].status === 200) {
                            this.toastr.success('Demande de contact modifiée !');
                        } else {
                            this.toastr.error('Echec de la modification de la demande de contact !');
                        }
                        if (t[1].status === 200) {
                            this.toastr.success('Réponse envoyée !');
                        } else {
                            this.toastr.error('Echec de l\'envoi de la réponse !');
                        }
                });
                break;
        }
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
