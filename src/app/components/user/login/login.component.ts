import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { fadeIn } from 'src/app/shared/animations/fade-in';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from '../../../_services/auth.service';
import { TokenStorageService } from '../../../_services/token-storage.service';
import { Role } from '../models/role.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    fadeIn
  ]
})
export class LoginComponent implements OnInit {

  public username = '';
  public password = '';
  public show: boolean;

  isLoggedIn = false;
  roles: string[] = [];

  constructor(private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private toastr: ToastrService,
    private userService: UserService,
    private router: Router,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer) {
      this.show = false;
     }

  ngOnInit(): void {
    this.iconRegistry.addSvgIcon('eye', this.sanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/remove_red_eye-white-18dp.svg'));

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  public onSubmit(): void {
    this.authService.login(this.username, this.password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        // this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;

        let roles: Role[] = [];
        let i = 0;
        data.roles.forEach((role: Role) => {
          let r = new Role(i, role.name);
          roles.push(r);
          i++;
        });

        this.userService.login(data);
        this.router.navigate(['/home']);
      },
      err => {
        this.toastr.error('Connexion échouée !');
      }
    );
  }

  togglePassword() {
    this.show = !this.show;
  }
}
