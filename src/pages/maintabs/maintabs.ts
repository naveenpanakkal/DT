import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController, Tab} from 'ionic-angular';
import {HomePage} from '../home/home';
import {MorePage} from '../more/more';
import {ProfilePage} from '../profile/profile';
import {ServicesPage} from '../services/services';
import {LanguageProvider} from '../../providers/language/language';
import {Keyboard} from '@ionic-native/keyboard';

@IonicPage()
@Component({
  selector: 'page-maintabs',
  templateUrl: 'maintabs.html',
})
export class MaintabsPage {

  tab1Root: any;
  tab2Root: any;
  tab3Root: any;
  tab4Root: any;
  tab5Root: any;
  tabParams: any;
  submit: any;
  valueforngif = false;
  hideTabs: boolean;

  navv: any;


  constructor(public lang: LanguageProvider, public navCtrl: NavController, public keyboard: Keyboard, public navParams: NavParams, public popoverCtrl: PopoverController) {


    this.submit = this.navParams.get('done');

    this.tab1Root = HomePage;
    this.tab3Root = ServicesPage;
    this.tab4Root = ProfilePage;
    this.tab5Root = MorePage;

    this.navv = this.lang.hideTabs;


    this.tabParams = {done: this.submit};
  }

  navvv() {
    if (this.lang.hideTabs) {
      return true;
    }
    else {
      return false;
    }
  }

  ionViewDidEnter() {
    this.keyboard.onKeyboardShow().subscribe(() => {
      this.lang.valueforngif = true
    })
    this.keyboard.onKeyboardHide().subscribe(() => {
      this.lang.valueforngif = false
    })
  }

  public keyboardCheck() {
    if (this.lang.valueforngif) {
      return true;
    }
    else {
      return false;
    }

  }

  more(myEvent) {
    let popover = this.popoverCtrl.create(MorePage);
    popover.present({
      ev: myEvent
    });
  }

  tabSelected(tab: Tab) {

  }

}
