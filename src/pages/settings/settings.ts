import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TranslateService} from '@ngx-translate/core';
import { LanguageProvider } from '../../providers/language/language';
import { MaintabsPage } from '../maintabs/maintabs';
import {Utils} from "../../shared/utils";

/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
  providers: [Utils],
})
export class SettingsPage {
langselected:any;
lab: any;
   constructor(public navCtrl: NavController, private translate: TranslateService, public lang: LanguageProvider, public utils:Utils) {
        translate.addLangs(["en", "fr"]);
        translate.setDefaultLang('en');

        this.langselected = 'en';
        let browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    }

    abc(){
      this.translate.use(this.langselected)
        console.log(this.langselected);
    }

    fix(){
      this.lang.language = this.langselected;
      this.navCtrl.setRoot(MaintabsPage);
    }

}
