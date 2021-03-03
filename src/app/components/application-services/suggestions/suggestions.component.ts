import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { fadeIn } from 'src/app/shared/animations/fade-in';
import { CommunicationService } from 'src/app/_services/communication.service';
import { ComSubject } from '../models/com-subject';
import { Suggestion } from '../models/suggestion.model';

@Component({
  selector: 'suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.scss'],
  animations: [
    fadeIn
  ]
})
export class SuggestionsComponent implements OnInit {

  public suggestionFormGroup!: FormGroup;
  public suggestionSubjects!: any[];
  public suggestionEnvoyee = false;

  constructor(private communicationService: CommunicationService,
    private fb: FormBuilder,
    private toastr: ToastrService
    ) {}

  ngOnInit(): void {
    this.communicationService.getSuggestionSubjects().subscribe(
      (sub: any[]) => {
        this.suggestionSubjects = [];
        sub.forEach(subi => {
          this.suggestionSubjects.push({name: this.transfo(subi.name), value: subi.name});
        })

        this.suggestionFormGroup = this.fb.group({
          suggestionSubject: ['', Validators.required],
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
    let suggestionRequest = new Suggestion(this.suggestionFormGroup.controls['suggestionSubject'].value, this.suggestionFormGroup.controls['comment'].value);

    this.communicationService.sendSuggestion(suggestionRequest).subscribe(
      (response) => {
        if (response.status === 200) {
          this.suggestionEnvoyee = true;
          this.toastr.success('Suggestion envoyée !');
        } else {
          this.toastr.error('Envoi de la suggestion échoué !');
        }
      }
    );
  }
}
