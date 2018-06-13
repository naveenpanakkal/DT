import {Attribute, Component, Directive} from '@angular/core';
import {IonicPage, NavController, NavParams, MenuController,AlertController,PopoverController} from 'ionic-angular';
import {MaintabsPage} from '../maintabs/maintabs';
import {OAuthService} from "angular-oauth2-oidc";
import {AuthProvider} from '../../providers/auth/auth';
import {LanguageProvider} from '../../providers/language/language';
import {JwtHelper} from 'angular2-jwt';
import {Keyboard} from '@ionic-native/keyboard';
import {Http, Headers, RequestOptions} from '@angular/http';
import {SecurityUtility} from '../../shared/securityutility';
import 'rxjs/Rx';
import {Utils} from "../../shared/utils";
import {VoyagesearchresultPage} from "../voyagesearchresult/voyagesearchresult";

/*
* ===========================================================================
* Copyright 2017 Dubai Trade.
* All Rights Reserved
* ===========================================================================
*
*  login.ts file contains LoginPage class which holds functions to
*  handle the UI navigation logic for the login page.
*
*/

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [Utils],
})



export class LoginPage {
  pattern: string="abcd";
  user = {
    username: '',
    password: ''
  };

  loginFailed: boolean = false;
  jwtHelper: JwtHelper = new JwtHelper();
  attention: string;
  enterNamePassword: string;
  alert: string;
  dissmisTxt:string;
  okTxt:string;

  constructor(public lang: LanguageProvider, private auth: AuthProvider, public http: Http, public keyboard: Keyboard,public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public menu: MenuController,
           public utils:Utils) {
  }

  keyUpValidate(e,format) {
    this.utils.keyUpValidate(e,format);
  }


  ionViewDidEnter() {
    this.menu.swipeEnable(false, 'menu1');
    this.menu.close();

    this.keyboard.onKeyboardShow().subscribe(() => {
      this.lang.footerif = true
    })
    this.keyboard.onKeyboardHide().subscribe(() => {
      this.lang.footerif = false
    })
  }

  keypressvalidate(ev,data) {
    let elementChecker: string;
    let format = /^[a-z0-9 ]*$/i;
    elementChecker = ev.target.value;
    if(!format.test(elementChecker)){

    }
  }


  closefoot() {
    this.lang.footerif = true;
  }

  public keyboardCheck() {
    if (this.lang.footerif) {
      return true;
    }
    else {
      return false;
    }

  }


  login(event, username, password) {
    localStorage.clear();
    event.preventDefault();
    this.alert = this.utils.getLocaleString("alert");
    this.attention = this.utils.getLocaleString("attention");
    this.enterNamePassword = this.utils.getLocaleString("enter_name_password");
    this.okTxt = this.utils.getLocaleString("ok_text");
    this.dissmisTxt = this.utils.getLocaleString("dismiss_txt");
    if(username == '' || password == '') {
      let alert = this.alertCtrl.create({
        title: this.attention,
        subTitle: this.enterNamePassword,
        buttons: [this.okTxt]
      });
      alert.present();
    } else {
      this.auth.login(username, password)
        .subscribe(
          response => {
            localStorage.setItem('token', response.access_token);
            localStorage.setItem('PRIVILEGES', JSON.stringify(response.UserInfo.servicePrivilege));
            localStorage.setItem('CLIENT_CODE', response.UserInfo.clientCode);
            localStorage.setItem('LOGGEDINUSER', response.UserInfo.username);
            this.navCtrl.setRoot(MaintabsPage);
          },
          error => {
            let alert = this.alertCtrl.create({
              title: this.alert,
              subTitle: error,
              buttons: [this.dissmisTxt]
            });
            alert.present();
          });
    }
  }

  keyboardClose() {
    this.keyboard.close();
  }
  openVoyageService (){
    localStorage.clear();
    this.navCtrl.push(VoyagesearchresultPage, {isOpenService: true});
  }

}
