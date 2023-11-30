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
  animations: [fadeIn],
})
export class HomeComponent implements OnInit {
  public niceruImage = 'assets/logos/ouaisouaisouais_logo_light.png';

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit(): void {}

  goRegister() {
    this.router.navigate(['register']);
  }

  goConnect() {
    this.router.navigate(['login']);
  }
}
