import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from '../../../_services/auth.service';
import { TokenStorageService } from '../../../_services/token-storage.service';
import { Role } from '../models/role.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public username = '';
  public password = '';

  isLoggedIn = false;
  roles: string[] = [];

  constructor(private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private toastr: ToastrService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  public onSubmit(): void {

    this.authService.login(this.username, this.password).subscribe(
      data => {
        console.log(data);
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        // this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;

        let roles: Role[] = [];
        let i = 0;
        data.roles.forEach((role: string) => {
          let r = new Role(i, role);
          roles.push(r);
          i++;
        });

        let user = new User(data.id, data.username, data.email, roles);
        this.userService.login(user);
        this.router.navigate(['/home']);
      },
      err => {
        this.toastr.error('Connexion échouée !');
        // this.errorMessage = err.error.message;
      }
    );
  }
}
