import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
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
  content?: string;

  public listouImage: string;
  public mangaUpdateImage: string;
  public akwaKonJouImage: string;
  public faiblesseImage: string;
  private isLoggedIn = false;

  public searched = false;

  public gemmes = [
    { value: 'Quintessence de la terre', viewValue: 'Ambre immaculée taillée' },
    {
      value: "Quintessence de l'âme",
      viewValue: 'Améthyste immaculée taillée',
    },
    {
      value: "Quintessence de l'eau",
      viewValue: 'Aigue marine immaculée taillée',
    },
    { value: 'Quintessence du feu', viewValue: 'Cornaline immaculée taillée' },
    { value: 'Quintessence de la vie', viewValue: 'Diamant immaculée taillée' },
    {
      value: 'Quintessence de la terre',
      viewValue: 'Emeraude immaculée taillée',
    },
    { value: "Quintessence de l'air", viewValue: 'Jaspe immaculée taillée' },
    {
      value: "Quintessence de l'âme",
      viewValue: 'Malachite immaculée taillée',
    },
    {
      value: 'Quintessence de la mort',
      viewValue: 'Pierre de lune immaculée taillée',
    },
    { value: 'Quintessence de la vie', viewValue: 'Onyx immaculée taillée' },
    { value: "Quintessence de l'âme", viewValue: 'Opale immaculée taillée' },
    { value: 'Quintessence du feu', viewValue: 'Rubis immaculée taillée' },
    { value: 'Quintessence de la mort', viewValue: 'Saphir immaculée taillée' },
    { value: "Quintessence de l'air", viewValue: 'Topaze immaculée taillée' },
  ];

  public gemmeACrafter: any;
  public gemmeNb = 0;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) {
    this.listouImage = '../../assets/images/app-listou.jpg';
    this.mangaUpdateImage = '../../assets/images/app-manga.jpg';
    this.akwaKonJouImage = '../../assets/images/app-akwakonjou.jpg';
    this.faiblesseImage = '../../assets/images/forces.png';
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
  }

  gemmeACrafterChange(gemme: string): void {}

  calculate(): void {
    if (this.gemmeACrafter && this.gemmeNb) {
      this.searched = true;
    }
  }

  public stripGemme(gem: string): string {
    return gem.replace('taillée', '');
  }

  public quintessenceToEssence(gem: string): string {
    return gem.replace('Quintessence', 'Essence');
  }

  public quintessenceToVolutes(gem: string): string {
    return gem.replace('Quintessence', 'Volutes');
  }

  public quintessenceToGrains(gem: string): string {
    return gem.replace('Quintessence', 'Grain');
  }

  public go(url: string): void {
    if (!this.isLoggedIn) {
      url = 'login';
    }
    this.router.navigate([url]);
  }

  public goExt(url: string): void {
    window.open(url, '_blank');
  }
}
