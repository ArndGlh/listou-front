import { Component, OnInit } from '@angular/core';
import { SvgIconsService } from 'src/app/_services/svgIcons.service';
import { Url } from '../../models/url.model';
import { UrlService } from '../../services/url.service';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  private footerUrls: Url[];

  public appleIconUrl: string;
  public facebookIconUrl: string;
  public youtubeIconUrl: string;
  public twitterIconUrl: string;

  constructor(
    private urlService: UrlService,
    private svgIconsService: SvgIconsService
  ) {
    this.footerUrls = [];
  }

  ngOnInit(): void {
    this.appleIconUrl = this.svgIconsService.getAppleIcon();
    this.facebookIconUrl = this.svgIconsService.getFacebookIcon();
    this.youtubeIconUrl = this.svgIconsService.getYoutubeIcon();
    this.twitterIconUrl = this.svgIconsService.getTwitterIcon();

    this.urlService.getFooterUrls().subscribe(
      (data) => {
        this.footerUrls = data;
      },
      (err) => {
        // this.footerUrls = JSON.parse(err.error).message;
      }
    );
  }

  public go(urlType: string): void {
    if (urlType === 'youtube') {
      window.open('http://y2u.be/dQw4w9WgXcQ', '_blank');
    } else {
      let urlToGo = this.getUrlFromType(urlType);
      window.open(urlToGo, '_blank');
    }
  }

  public getUrlFromType(urlType: string): string {
    for (let i = 0; i < this.footerUrls.length; i++) {
      if (this.footerUrls[i]['name'] === urlType) {
        return this.footerUrls[i]['url'];
      }
    }
    return '';
  }
}
