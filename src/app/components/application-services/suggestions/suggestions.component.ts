import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fadeIn } from 'src/app/shared/animations/fade-in';
import { CommunicationService } from 'src/app/_services/communication.service';
import { ComSubject } from '../models/com-subject';

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

  constructor(private communicationService: CommunicationService,
    private fb: FormBuilder) {}

  ngOnInit(): void {
    this.communicationService.getSuggestionSubjects().subscribe(
      (sub: any[]) => {
        this.suggestionSubjects = [];
        sub.forEach(subi => {
          this.suggestionSubjects.push({name: this.transfo(subi.name), value: subi.name});
        })

        this.suggestionFormGroup = this.fb.group({
          suggestionSubject: ['', Validators.required],
          comment: ['', [Validators.required, Validators.maxLength(1000)]]
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
    console.log(this.suggestionFormGroup);
  }
}
