import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FileInput, FileValidator } from 'ngx-material-file-input';
import { ToastrService } from 'ngx-toastr';
import { FileService } from 'src/app/_services/file.service';

@Component({
  selector: 'profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {
  @Input() tabNumber!: number;
  public form: FormGroup;
  readonly maxSize = 200000;

  constructor(private _fb: FormBuilder,
    private fileService: FileService,
    private toastr: ToastrService) {
    this.form = this._fb.group({
      avatarFile: [
        undefined,
        [FileValidator.maxContentSize(this.maxSize)]
      ]
    });
   }

  ngOnInit(): void {
  }

  public onSubmit(){
    this.fileService.updateAvatar(this.form.get('avatarFile')!.value).subscribe(
      data => {
        console.log(data);
        this.toastr.success('Mise a jour réussie !');
      },
      err => {
        this.toastr.error('Mise a jour échouée !');
      }
    );
  }
}