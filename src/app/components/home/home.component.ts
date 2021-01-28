import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { fadeIn } from 'src/app/shared/animations/fade-in';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    fadeIn
  ]
})
export class HomeComponent implements OnInit {
  content?: string;

  public listouImage: string;
  public mangaUpdateImage: string;
  private isLoggedIn = false;

  constructor(private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private tokenStorageService: TokenStorageService) {
      this.listouImage = '../../assets/images/app-listou.jpg'
      this.mangaUpdateImage = '../../assets/images/app-manga.jpg';
    }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    this.userService.getPublicContent().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

  public go(url: string):void{
    if(!this.isLoggedIn){
      url = 'login';
    }
    this.router.navigate([url]);
  }
}
