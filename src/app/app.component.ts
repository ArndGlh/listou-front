import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { User } from './components/user/models/user.model';
import { TokenStorageService } from './_services/token-storage.service';
import { UserService } from './_services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  currentUser: User;
  userSubscription: Subscription;

  constructor(private tokenStorageService: TokenStorageService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService) {
      this.currentUser = new User();
      this.userSubscription = new Subscription();
    }

  ngOnInit(): void {
    this.userSubscription = this.userService.usersub.subscribe(
      (user: User) => {
        this.currentUser = user;
        this.isLoggedIn = true;
        this.toastr.success('Connexion réussie !');
      }
    );

    this.iconRegistry.addSvgIcon('white-home', this.sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/home-white-18dp.svg'));
    this.iconRegistry.addSvgIcon('account', this.sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/account_circle-white-18dp.svg'));
    this.iconRegistry.addSvgIcon('menu', this.sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/menu-white-18dp.svg'));

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.currentUser = new User();
    this.isLoggedIn = false;
    this.router.navigate(['home']);
    this.toastr.success('Déconnexion réussie !');
  }

  public go(url: string){
    this.router.navigate([url]);
  }
}
