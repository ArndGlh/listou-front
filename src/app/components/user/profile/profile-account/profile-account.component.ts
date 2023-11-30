import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'profile-account',
  templateUrl: './profile-account.component.html',
  styleUrls: ['./profile-account.component.scss'],
})
export class ProfileAccountComponent implements OnInit {
  public userSubscription: Subscription;
  private currentUser: any;

  public email: string;
  public emailTemp: string;
  public password: string;
  public passwordConfirm: string;

  constructor(
    private tokenStorageService: TokenStorageService,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.email = '';
    this.emailTemp = '';
    this.password = '';
    this.passwordConfirm = '';
    this.userSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.userSubscription = this.userService
      .getUserSubject()
      .subscribe((user: User) => {
        this.currentUser = user;
      });
    this.email = this.tokenStorageService.getUser()['email'];
    this.emailTemp = this.email;
  }

  public onSubmit() {
    if (this.email !== this.emailTemp) {
      this.userService.updateEmail(this.email).subscribe((response) => {
        if (response.status === 200) {
          this.userService.getUserSubject().subscribe((user) => {
            user.email = this.email;
          });
          this.userService.emitUserSubject();
          this.toastr.success("Mise a jour réussie de l'email !");
        } else {
          this.toastr.error("Mise a jour de l'email échouée !");
        }
      });
    }

    if (
      this.password != '' &&
      this.passwordConfirm != '' &&
      this.password === this.passwordConfirm
    ) {
      this.userService.updatePassword(this.password).subscribe((response) => {
        if (response.status === 200) {
          this.userService.getUserSubject().subscribe((user) => {
            user.email = this.email;
          });
          this.userService.emitUserSubject();
          this.toastr.success('Mise a jour réussie du mot de passe !');
        } else {
          this.toastr.error('Mise a jour du mot de passe échouée !');
        }
      });
    } else if (
      this.password != '' &&
      this.passwordConfirm != '' &&
      this.password !== this.passwordConfirm
    ) {
      this.toastr.error('Les mot de passes ne sont pas les mêmes !');
    }
  }
}
