import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FileInput, FileValidator } from 'ngx-material-file-input';
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
  public retrievedImage: any;
  public base64Data: any;
  public retrieveResonse: any;
  public imageName: any;

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
          [FileValidator.maxContentSize(this.maxSize)]
        ]
      });
      this.avatarUrl = '';
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
    console.log($event);
    this.imageName = $event.target.files[0].name;
    this.selectedFile = $event.target.files[0];
  }

  public onUpload() {
    console.log(this.selectedFile);
    this.fileService.updateAvatar(this.selectedFile, this.imageName).subscribe( // TODO check value avatar file null
      (response) => {
        console.log(response);
        if (response.status === 200) {
          this.toastr.success('Mise a jour réussie !');
        } else {
          this.toastr.error('Mise a jour échouée !');
        }
      }
    );
  }

  //Gets called when the user clicks on retieve image button to get the image from back end
  public getImage() {
    const user = this.tokenStorageService.getUser();

    if(user.imageName !== null){
      // this.avatarUrl = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + this.arrayBufferToBase64(this.currentUser.avatar));
      this.fileService.getAvatar(user.imageName).subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.avatarUrl = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + this.base64Data);
        }
      );
    } else {
      this.avatarUrl = '//ssl.gstatic.com/accounts/ui/avatar_2x.png';
    }


  }
}