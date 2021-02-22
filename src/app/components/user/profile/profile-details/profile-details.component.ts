import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { FileValidator } from 'ngx-material-file-input';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { FileService } from 'src/app/_services/file.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';
import { User } from '../../models/user.model';

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
  public userSubscription: Subscription;
  private currentUser: any;

  public selectedFile!: File;
  public base64Data: any;
  public hasGoodExtension = true;
  // public sendAvatarButtonDisabled: boolean;

  constructor(private _fb: FormBuilder,
    private fileService: FileService,
    private toastr: ToastrService,
    private tokenStorageService: TokenStorageService,
    private sanitizer : DomSanitizer,
    private userService: UserService) {
      this.userSubscription = new Subscription();
      this.form = this._fb.group({
        avatarFile: [
          undefined,
          [ FileValidator.maxContentSize(this.maxSize),
            RxwebValidators.extension({extensions:["jpeg","png", "jpg"]})
          ]
        ]
      });
      this.avatarUrl = '';
      // this.sendAvatarButtonDisabled = (this.selectedFile == undefined || !this.hasGoodExtension) &&
   }

  ngOnInit(): void {
    this.userSubscription = this.userService.usersub.subscribe(
      (user: User) => {
        this.currentUser = user;
      }
    );

    this.getImage();
  }

  // ================================================================================================================
  public onFileChanged($event: any) {
    console.log(this.form);
    if($event.target.files[0]){
      this.validateType($event);
      this.selectedFile = $event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = () => {
        let file = reader.result ?? '';
        this.avatarUrl = this.sanitizer.bypassSecurityTrustUrl(file.toString());
      };
    }
  }

  public validateType($event: any): void{
    let currentExt = $event.target.files[0].type;
    const acceptedExtensions = ['image/jpeg', 'image/jpg', 'image/png'];

    this.hasGoodExtension = acceptedExtensions.findIndex(el => el == currentExt) != -1;
  }

  public onUpload() {
    this.fileService.updateAvatar(this.selectedFile).subscribe( // TODO check value avatar file null
      (response) => {
        if (response.status === 200) {
          this.toastr.success('Mise a jour réussie !');
        } else {
          this.toastr.error('Mise a jour échouée !');
        }
      }
    );
  }

  public getImage() {
    this.fileService.getAvatar().subscribe(
      res => {
        if(res.avatar !== null){
          this.avatarUrl = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + res.avatar);
        } else {
          this.avatarUrl = "//ssl.gstatic.com/accounts/ui/avatar_2x.png";
        }

      }
    );
  }
}