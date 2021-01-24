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
    this.urlService.getFooterUrls().subscribe(
      data => {
        this.footerUrls = data;
        console.log(this.footerUrls);
      },
      err => {
        // this.footerUrls = JSON.parse(err.error).message;
      }
    );
  }

  public go(urlType: string): void{
    let urlToGo = this.getUrlFromType(urlType);
    window.open(urlToGo, "_blank");
  }

  public getUrlFromType(urlType: string): string{
      for(let i = 0; i < this.footerUrls.length; i ++) {
          if(this.footerUrls[i]['name'] === urlType) {
              return this.footerUrls[i]['url'];
          }
      }
      return '';
  }
}
