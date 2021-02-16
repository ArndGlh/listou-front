import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FileInput, FileValidator } from 'ngx-material-file-input';
import { ToastrService } from 'ngx-toastr';
import { FileService } from 'src/app/_services/file.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {
  @Input() tabNumber!: number;
  public form: FormGroup;
  readonly maxSize = 200000;

  public avatarUrl: SafeUrl;

  constructor(private _fb: FormBuilder,
    private fileService: FileService,
    private toastr: ToastrService,
    private tokenStorageService: TokenStorageService,
    private sanitizer : DomSanitizer) {
    this.form = this._fb.group({
      avatarFile: [
        undefined,
        [FileValidator.maxContentSize(this.maxSize)]
      ]
    });
    this.avatarUrl = '';
   }

  ngOnInit(): void {

    const user = this.tokenStorageService.getUser();
    if(user.avatar != null){
      let reader = new FileReader();
      reader.readAsDataURL(user.avatar);
      this.avatarUrl = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + reader.result);
    } else {
      this.avatarUrl = '//ssl.gstatic.com/accounts/ui/avatar_2x.png';
    }





  }

  public onSubmit(){
    this.fileService.updateAvatar(this.form.get('avatarFile')!.value).subscribe( // TODO check value avatarfile null
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