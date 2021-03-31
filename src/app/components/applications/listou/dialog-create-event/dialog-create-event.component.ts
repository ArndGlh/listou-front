import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDetailsComponent } from 'src/app/components/boards/board-admin/dialog-details/dialog-details.component';

@Component({
  selector: 'app-dialog-create-event',
  templateUrl: './dialog-create-event.component.html',
  styleUrls: ['./dialog-create-event.component.scss']
})
export class DialogCreateEventComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogDetailsComponent>,
    // @Inject(MAT_DIALOG_DATA) public notif: any,
    private fb: FormBuilder) { }


    public createEventFormGroup!: FormGroup;

  ngOnInit(): void {
    this.createEventFormGroup = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(5)]],
      description: ['', [Validators.maxLength(1000)]],
      startDate: ['', [Validators.required]],
      duration: [''],
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
    this.dialogRef.close({'form': this.createEventFormGroup.value});
  }

  public onAutocompleteSelected($event: any){
    console.log(this.createEventFormGroup);
    this.createEventFormGroup.value['location'] = $event.formatted_address;
  }
}
