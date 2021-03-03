import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { fadeIn } from 'src/app/shared/animations/fade-in';
import { CommunicationService } from 'src/app/_services/communication.service';
import { Contact } from '../models/contact.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations: [
    fadeIn
  ]
})
export class ContactComponent implements OnInit {
  public contactFormGroup!: FormGroup;
  public contactEnvoyee = false;

  constructor(private communicationService: CommunicationService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
      this.contactFormGroup = this.fb.group({
        comment: ['', [Validators.required, Validators.maxLength(1000), Validators.minLength(10)]]
      });
  }

  public onSubmit(): void{
    let contactRequest = new Contact(this.contactFormGroup.controls['comment'].value);

    this.communicationService.sendContact(contactRequest).subscribe(
      (response) => {
        if (response.status === 200) {
          this.contactEnvoyee = true;
          this.toastr.success('Message de contact envoyé !');
        } else {
          this.toastr.error('Envoi du message de contact échoué !');
        }
      }
    );
  }
}
