import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { User } from './components/user/models/user.model';
import { SvgIconsService } from './_services/svgIcons.service';
import { TokenStorageService } from './_services/token-storage.service';
import { UserService } from './_services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  firstLogin: boolean;

  currentUser: any;
  userSubscription: Subscription;

  // Icons
  public homeIconUrl: string;
  public accountIconUrl: string;
  public menuIconUrl: string;
  public niceruImage = '../../assets/logos/niceru_logo2.png';

  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService,
    private svgIconsService: SvgIconsService
  ) {
    this.userSubscription = new Subscription();
    this.firstLogin = true;
  }

  ngOnInit(): void {
    this.userSubscription = this.userService.usersub.subscribe((user: User) => {
      this.currentUser = user;
      this.isLoggedIn = true;
      if (this.firstLogin) {
        this.toastr.success('Connexion réussie !');
      }
      this.firstLogin = false;
    });

    this.homeIconUrl = this.svgIconsService.getHomeIcon();
    this.accountIconUrl = this.svgIconsService.getAccountIcon();
    this.menuIconUrl = this.svgIconsService.getMenuIcon();

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
    this.currentUser = null;
    this.isLoggedIn = false;
    this.showAdminBoard = false;
    this.showModeratorBoard = false;
    this.router.navigate(['home']);
    this.toastr.success('Déconnexion réussie !');
  }

  public go(url: string) {
    this.router.navigate([url]);
  }
}
