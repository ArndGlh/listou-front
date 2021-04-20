import { Injectable } from '@angular/core';

const appleIcon = '../../assets/icons/apple-app-store.svg';
const facebookIcon = '../../assets/icons/facebook.svg';
const youtubeIcon = '../../assets/icons/youtube.svg';
const twitterIcon = '../../assets/icons/twitter.svg';
const homeIcon = '../../assets/icons/home-white-18dp.svg';
const accountIcon = '../../assets/icons/account_circle-white-18dp.svg';
const menuIcon = '../../assets/icons/menu-white-18dp.svg';

@Injectable({
  providedIn: 'root'
})
export class SvgIconsService {

    constructor() {}

    public getAppleIcon(){
        return appleIcon;
    }

    public getFacebookIcon(){
        return facebookIcon;
    }

    public getYoutubeIcon(){
        return youtubeIcon;
    }

    public getTwitterIcon(){
        return twitterIcon;
    }

    public getHomeIcon(){
        return homeIcon;
    }

    public getAccountIcon(){
        return accountIcon;
    }

    public getMenuIcon(){
        return menuIcon;
    }
}