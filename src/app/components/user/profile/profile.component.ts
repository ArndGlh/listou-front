import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../../_services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  panelOpenState = false;
  public selectedTab: number;

  constructor(private token: TokenStorageService) {
    this.selectedTab = 1;
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
  }

  public display(section: number):void {
    this.selectedTab = section;
  }
}
