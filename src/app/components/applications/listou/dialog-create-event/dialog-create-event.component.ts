import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogDetailsComponent } from 'src/app/components/boards/board-admin/dialog-details/dialog-details.component';

@Component({
  selector: 'app-dialog-create-event',
  templateUrl: './dialog-create-event.component.html',
  styleUrls: ['./dialog-create-event.component.scss']
})
export class DialogCreateEventComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogDetailsComponent>,
    private fb: FormBuilder,
    private dateAdapter: DateAdapter<any>) { }
    public minDate: Date = new Date();
    public createEventFormGroup!: FormGroup;

  ngOnInit(): void {
    this.createEventFormGroup = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(5)]],
      description: ['', [Validators.maxLength(1000)]],
      startDate: ['', [Validators.required]],
      duration: ['', [Validators.maxLength(50)]],
      location: ['', [Validators.required]]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public close(){
    this.dialogRef.close();
  }

  public valid(){
    this.createEventFormGroup.controls.startDate.enable();
    this.dialogRef.close(this.createEventFormGroup.value);
  }

  public onAutocompleteSelected($event: any){
    this.createEventFormGroup.controls.location.setValue($event.formatted_address);
  }

  public changeDateEvent($event: any){
    this.createEventFormGroup.controls.startDate.setValue(new Date($event.value).getTime());
  }
}
