import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { fadeIn } from 'src/app/shared/animations/fade-in';
import { AuthService } from '../../../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [
    fadeIn
  ]
})
export class RegisterComponent implements OnInit {

  public username = '';
  public email = '';
  public password = '';
  public show: boolean;

  constructor(private authService: AuthService,
    private toastr: ToastrService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer) {
      this.show = false;
    }

  ngOnInit(): void {
    this.iconRegistry.addSvgIcon('eye', this.sanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/remove_red_eye-white-18dp.svg'));

  }

  public onSubmit(): void {
    this.authService.register(this.username, this.email, this.password).subscribe(
      data => {
        console.log(data);
        this.toastr.success('Inscription réussie !');
      },
      err => {
        this.toastr.error('Inscription échouée !');
        // this.errorMessage = err.error.message;
      }
    );
  }

  togglePassword() {
    this.show = !this.show;
  }
}
