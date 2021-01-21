import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public username: string = '';
  public email: string = '';
  public password: string = '';

  constructor(private authService: AuthService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
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
}
