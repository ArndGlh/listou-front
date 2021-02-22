import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {
  @Input() tabNumber!: number;

  constructor() {

   }

  ngOnInit(): void {

  }
}