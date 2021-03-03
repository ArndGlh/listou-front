import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { fadeIn } from 'src/app/shared/animations/fade-in';
import { CommunicationService } from 'src/app/_services/communication.service';
import { BugReport } from '../models/bugreport.model';

@Component({
  selector: 'app-bug-report',
  templateUrl: './bug-report.component.html',
  styleUrls: ['./bug-report.component.scss'],
  animations: [
    fadeIn
  ]
})
export class BugReportComponent implements OnInit {
  public bugreportFormGroup!: FormGroup;
  public bugreportSubjects!: any[];
  public bugreportEnvoyee = false;

  constructor(private communicationService: CommunicationService,
    private fb: FormBuilder,
    private toastr: ToastrService
    ) {}

  ngOnInit(): void {
    this.communicationService.getSuggestionSubjects().subscribe(
      (sub: any[]) => {
        this.bugreportSubjects = [];
        sub.forEach(subi => {
          this.bugreportSubjects.push({name: this.transfo(subi.name), value: subi.name});
        })

        this.bugreportFormGroup = this.fb.group({
          bugreportSubject: ['', Validators.required],
          comment: ['', [Validators.required, Validators.maxLength(1000), Validators.minLength(10)]]
        });
      }
    );
  }

  public transfo(str: string): string{
    str = str.replace('_', ' ');
    str = str.toLowerCase();
    str = str.charAt(0).toUpperCase() + str.substring(1, str.length);
    return str;
  }

  public onSubmit(): void{
    console.log(this.bugreportFormGroup);
    let bugreportRequest = new BugReport(this.bugreportFormGroup.controls['bugreportSubject'].value, this.bugreportFormGroup.controls['comment'].value);
    console.log(bugreportRequest);

    this.communicationService.sendBugreport(bugreportRequest).subscribe(
      (response) => {
        if (response.status === 200) {
          this.bugreportEnvoyee = true;
          this.toastr.success('Notification de bug envoyée !');
        } else {
          this.toastr.error('Envoi de la notification de bug échoué !');
        }
      }
    );
  }
}
