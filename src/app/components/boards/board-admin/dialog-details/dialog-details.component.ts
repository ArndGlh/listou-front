import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-details',
  templateUrl: './dialog-details.component.html',
  styleUrls: ['./dialog-details.component.scss']
})
export class DialogDetailsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public notif: any,
    private fb: FormBuilder) { }

    public notificationFormGroup!: FormGroup;

  ngOnInit(): void {
    this.notificationFormGroup = this.fb.group({
      comment: ['', [Validators.maxLength(1000), Validators.minLength(10)]],
      state: [this.notif.state]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public close(){
    this.dialogRef.close();
  }

  public valid(){
    this.dialogRef.close({'form': this.notificationFormGroup.value, 'oldNotif': this.notif});
  }
}
