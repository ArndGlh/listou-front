import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Url } from '../../models/url.model';
import { UrlService } from '../../services/url.service';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  private footerUrls: Url[];

  constructor(private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private router: Router,
    private urlService: UrlService) {
      this.footerUrls = [];
    }

  ngOnInit(): void {
    this.iconRegistry.addSvgIcon('app-store', this.sanitizer.bypassSecurityTrustResourceUrl('../../../assets/icons/apple-app-store.svg'));
    // this.urlService.getFooterUrls().subscribe(
    //   data => {
    //     this.footerUrls = data;
    //   },
    //   err => {
    //     // this.footerUrls = JSON.parse(err.error).message;
    //   }
    // );
  }

  public go(url: string){
    url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstleyVEVO";
    window.open(url, "_blank");
  }
}
