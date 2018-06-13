import {Component, ViewChild, Input, HostListener, ElementRef, Renderer} from '@angular/core';
import {Platform, Nav, AlertController, NavController, App, Content, Events, IonicApp} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';
import {LoginPage} from '../pages/login/login';


import {Keyboard} from '@ionic-native/keyboard';

import {TrucksearchPage} from '../pages/trucksearch/trucksearch';
import {SettingsPage} from '../pages/settings/settings';

import {AuthProvider} from '../providers/auth/auth';

@Component({
  templateUrl: 'app.html'
})

export class Mawani {
  @ViewChild(Content) contents: Content;
  rootPage: any = LoginPage;
  alert: any;


  @ViewChild(Nav) navCnt: Nav;

  nav: any;
  showSubmenu: boolean = false;
  pages: Array<{ title: string, component: any, image: string, showDetails: boolean }>;
  public innerHeightOfDevice: string;
  public keyboardHOpenTimer: number = 0;
  public keyboardHideTimer: number = 0;
  public keyboardAppeared: boolean = false;
  public preventScrollContentPadding: boolean = true;

  constructor(private auth: AuthProvider, public keyboard: Keyboard, public platform: Platform,
              statusBar: StatusBar, splashScreen: SplashScreen, public alertCtrl: AlertController, private ionicApp: IonicApp,
              private elRef: ElementRef, private renderer: Renderer, public app: App) {


    this.pages = [
      {title: 'About Us', component: SettingsPage, image: 'information-circle', showDetails: false},
      {title: 'Change Password', component: TrucksearchPage, image: 'lock', showDetails: false},
      {title: 'Settings', component: HomePage, image: 'settings', showDetails: false},
      {title: 'Logout', component: LoginPage, image: 'power', showDetails: false}
    ];

    //document.addEventListener("scroll", this.doElementScroll);
    platform.ready().then(() => {
      // document.addEventListener("click", this.doElementScroll);
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      splashScreen.hide();
      let innerClientDevHight: any = platform.height();
      this.innerHeightOfDevice = innerClientDevHight + "px !important;"
      document.querySelector('ion-app').setAttribute("style", "height:" + this.innerHeightOfDevice);
      document.querySelector('ng-component').setAttribute("style", "height:" + this.innerHeightOfDevice);
      if (this.platform.is("android")) {
        this.keyboardHideTimer = 50;
        this.keyboardHOpenTimer = 0;
        //this.keyboard.disableScroll(false);
        statusBar.styleDefault();
      }
      else {
        this.keyboardHideTimer = 350;
        this.keyboardHOpenTimer = 350;
        statusBar.hide();
      }

      this.keyboard.disableScroll(true);
      this.keyboard.onKeyboardShow().subscribe(ek => {
        document.body.classList.add('keyboard-is-open');
        // if(this.preventScrollContentPadding == true) {
        setTimeout(function () {
          let elementsHtml = document.querySelectorAll('ion-content');
          var currentHight = (platform.height() - parseInt(ek.keyboardHeight)) + 50;
          for (var i = 0; i < elementsHtml.length; i++) {
            if (elementsHtml[i].children[1].className === "scroll-content" && elementsHtml[i].hasAttribute("id")) {
              var prevStyle = elementsHtml[i].children[0].getAttribute("style")
              if (platform.height() < 760) {
                // elementsHtml[i].children[1].setAttribute("style", prevStyle+"margin-bottom:215px;padding-bottom:"+parseInt(ek.keyboardHeight)+ "px !important;");

                elementsHtml[i].children[1].setAttribute("style", prevStyle + "margin-bottom:" + (parseInt(ek.keyboardHeight)+50) + "px !important;padding-bottom:" + parseInt(ek.keyboardHeight) + "px !important;");
              } else {
                // elementsHtml[i].children[1].setAttribute("style", prevStyle+"margin-bottom:300px !important;padding-bottom:"+parseInt(ek.keyboardHeight)+ "px !important;");
                elementsHtml[i].children[1].setAttribute("style", prevStyle + "margin-bottom:" + (parseInt(ek.keyboardHeight) + 50) + "px !important;");
              }
            }

            // var prevStyle= elementsHtml[i].children[0].getAttribute("style")
            // if(platform.height() < 760){
            //   elementsHtml[i].children[1].setAttribute("style", prevStyle+"margin-bottom:215px;padding-bottom:"+parseInt(ek.keyboardHeight)+ "px !important;");
            // }else {
            //   elementsHtml[i].children[1].setAttribute("style", prevStyle+"margin-bottom:400px;padding-bottom:"+parseInt(ek.keyboardHeight)+ "px !important;");
            // }
            // //var prevStyle= elementsHtml[i].children[0].getAttribute("style")
            // elementsHtml[i].children[1].setAttribute("style", prevStyle+"margin-bottom:400px;padding-bottom:"+parseInt(ek.keyboardHeight)+ "px !important;");
          }
        }, this.keyboardHOpenTimer);
        // }
        //  else {
        //   setTimeout(function() {
        //     let elementsHtml = document.querySelectorAll('ion-content');
        //     var currentHight = (platform.height() - parseInt(ek.keyboardHeight))+50;
        //     for (var i=0; i<elementsHtml.length;i++)
        //     {
        //       if( elementsHtml[i].children[1].className==="scroll-content" && elementsHtml[i].hasAttribute("id"))
        //       {
        //         let  sliderelementsHtml = elementsHtml[i].children[1].getElementsByTagName("ion-slide");
        //         for (var i=0; i<sliderelementsHtml.length;i++) {
        //           var prevStyle= sliderelementsHtml[i].getAttribute("style");
        //           sliderelementsHtml[i].removeAttribute("style" );
        //           sliderelementsHtml[i].setAttribute("style",prevStyle);
        //           if(platform.height() < 760){
        //             sliderelementsHtml[i].setAttribute("style", prevStyle+"margin-bottom:215px;padding-bottom:"+parseInt(ek.keyboardHeight)+ "px !important;");
        //           }else {
        //             sliderelementsHtml[i].setAttribute("style", prevStyle+"margin-bottom:400px;padding-bottom:"+parseInt(ek.keyboardHeight)+ "px !important;");
        //           }
        //         }
        //       }
        //     }
        //   }, this.keyboardHOpenTimer);
        // }
      });

      this.keyboard.onKeyboardHide().subscribe(() => {
        document.body.classList.remove('keyboard-is-open');
        let elementsHtml = document.querySelectorAll('ion-content');
        // if(this.preventScrollContentPadding == true) {
        setTimeout(function () {
          for (var i = 0; i < elementsHtml.length; i++) {
            if (elementsHtml[i].children[1].className === "scroll-content" && elementsHtml[i].hasAttribute("id")) {
              var prevStyle = elementsHtml[i].children[0].getAttribute("style")
              elementsHtml[i].children[1].removeAttribute("style");
              elementsHtml[i].children[1].setAttribute("style", prevStyle);
            }
          }
        }, this.keyboardHideTimer);
        // }
        // else{
        //   setTimeout(function() {
        //     for (var i=0; i<elementsHtml.length;i++)
        //     {
        //       if( elementsHtml[i].children[1].className==="scroll-content" && elementsHtml[i].hasAttribute("id"))
        //       {
        //         let  sliderelementsHtml = elementsHtml[i].children[1].getElementsByTagName("ion-slide");
        //         for (var i=0; i<sliderelementsHtml.length;i++) {
        //           sliderelementsHtml[i].removeAttribute("style" );
        //         }
        //
        //       }
        //     }
        //   }, this.keyboardHideTimer);

        // }
        //this.utils.setPaddingForScrollContent(true);
      });

      platform.registerBackButtonAction(() => {
        this.nav = this.app.getActiveNav();

        let activePortal = ionicApp._loadingPortal.getActive() ||
          ionicApp._modalPortal.getActive() ||
          ionicApp._toastPortal.getActive() ||
          ionicApp._overlayPortal.getActive();
        if (activePortal && activePortal.index === 0) {
          activePortal.dismiss();
          return;
        }

        if (this.nav.canGoBack()) {
          this.nav.pop();
        } else {
          if (this.alert) {
            this.alert.dismiss();
            this.alert = null;
          } else {
            this.showExitAlert();
          }
        }
        //uncomment this and comment code below to to show toast and exit app
        // if (this.backButtonPressedOnceToExit) {
        //   this.platform.exitApp();
        // } else if (this.nav.canGoBack()) {
        //   this.nav.pop({});
        // } else {
        //   this.showToast();
        //   this.backButtonPressedOnceToExit = true;
        //   setTimeout(() => {

        //     this.backButtonPressedOnceToExit = false;
        //   },2000)
        // }
      });
    });

  }

  // doElementScroll()
  // {
  //   // if(this.keyboard){
  //   //   this.keyboard.disableScroll(false);
  //   // }
  //   $("body").on("scroll", function(){
  //     $('*').css("pointer-events","none !important");
  //   });
  //   $('body').on('touchmove', function(e) {
  //     $('*').css("pointer-events","none");
  //   });
  //   $('body').on('touchend', function(e) {
  //     setTimeout(function() {
  //       $('*').css("pointer-events", "default");
  //     },0);
  //   });
  // }
  ScrollStart() {
    //start of scroll event for iOS
    console.log("ScrollStart");
  }

  // $('smartSearchListContainer').on('scroll touchmove mousewheel', function(e){
  //   e.preventDefault();
  //   e.stopPropagation();
  //   return false;
  // });
  ScrollEnd() {
    //end of scroll event for iOS
    console.log("Scroll end");
    //start/end of scroll event for other browsers
  }

  @HostListener('keydown', ['$event']) onInputChange(e) {
    var code = e.keyCode || e.which;
    if (code === 13) {
      this.keyboard.close();
    }
  }

  // allowUp:any;
  // allowDown:any;
  // prevTop:any;
  // prevBot:any;
  // lastY:any;
  // @HostListener('touchstart', ['$event'])
  // handleTouchStart(event: any) {
  //   this.allowUp = (this.contents.scrollTop > 0);
  //   this.allowDown = (this.contents.scrollTop < this.contents.scrollHeight - this.contents.contentHeight - this.contents.contentTop);
  //   this.prevTop = null;
  //   this.prevBot = null;
  //   this.lastY = event.targetTouches[0].pageY;
  // }
  //
  // @HostListener('touchmove', ['$event'])
  // handleTouch(event: any) {
  //   let up: boolean = (event.targetTouches[0].pageY > this.lastY), down: boolean = !up;
  //
  //   this.lastY = event.targetTouches[0].pageY;
  //
  //   if ((up && this.allowUp) || (down && this.allowDown)) {
  //     event.stopPropagation();
  //   } else {
  //     event.preventDefault();
  //   }
  // }

  // @HostListener('focus', ['$event'])
  // onFocus(target: any)  {
  //     if(this.keyboardAppeared===true)
  //     {
  //      let currentElement =  target.srcElement;

  //      let form: HTMLElement = currentElement ? (<HTMLInputElement>currentElement).parentElement : null;
  //      console.log(form)
  //     }
  // }

  getStyle(page) {
    if (page.showDetails && page.title == "About Us") {
      return "#2575ba";
    }
    else {
      return "#185389";
    }
  }

  menuClosed(page) {
    page.showDetails = false;
  }

  getIcon(page) {
    if (page.showDetails && page.title == "About Us") {
      return "arrow-dropup";
    }
    else {
      return "arrow-dropdown";
    }
  }


  toggleDetails(page) {
    this.showSubmenu = !this.showSubmenu;
    if (page.showDetails) {
      page.showDetails = false;
    }
    else {
      page.showDetails = true;
    }
    if (page.title == "Logout") {

      let alertDesc: string;
      if (null == localStorage.getItem('LOGGEDINUSER')) {
        alertDesc = 'Are you sure you want to logout?';
      } else {
        alertDesc = 'Hi ' + localStorage.getItem('LOGGEDINUSER') + ', are you sure you want to logout?';
      }

      let alert = this.alertCtrl.create({
        title: 'Alert',
        subTitle: alertDesc,
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              this.auth.logout();
              this.navCnt.setRoot(LoginPage);
            },
          },
          {
            text: 'Cancel',
            handler: () => {

            },
          }]
      });
      alert.present();
    }
  }

  showExitAlert() {
    this.alert = this.alertCtrl.create({
      title: 'Alert',
      subTitle: 'Do you want to exit the app?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            this.alert = null;
          }
        },
        {
          text: 'Exit',
          handler: () => {
            this.platform.exitApp();
          }
        }
      ]
    });
    this.alert.present();
  }


}

