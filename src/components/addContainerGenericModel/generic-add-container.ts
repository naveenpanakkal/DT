import {Component, ViewChild} from '@angular/core';
import {NavParams, ViewController, AlertController, Platform, Navbar} from "ionic-angular";
import {Utils} from "../../shared/utils";

/**
 * Generated class for the GenericAddQuantityComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'generic-add-container',
  templateUrl: 'generic-add-container.html',
  providers: [Utils]
})
export class GenericAddContainerComponent {

  containerNo: string;
  public unregisterBackButtonAction: any;
  @ViewChild('navbar') navBar: Navbar;

  constructor(public platform: Platform, params: NavParams, public viewCtrl: ViewController,
              private alertCtrl: AlertController, public utils: Utils) {

  }

  close() {
    this.viewCtrl.dismiss(null);
  }

  ionViewDidLoad() {
      this.initializeBackButtonCustomHandler();
  }

  ionViewWillLeave() {
    // Unregister the custom back button action for this page
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }

  initializeBackButtonCustomHandler(): void {
    var _this = this;
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(function (event) {
      console.log('Overwrite Back Button Page Change');
      _this.onBackAlert();
    }, 101); // Priority 101 will override back button handling (we set in app.component.ts) as it is bigger then priority 100 configured in app.component.ts file */
  }


  onBackAlert() {
    this.viewCtrl.dismiss(null);
  }

  onOKClick() {
    this.viewCtrl.dismiss({
      containerNo: this.containerNo,
    });
  }

  onReset() {
    this.containerNo = '';
  }

  presentAlert(title: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: [{
        text: 'Ok',
        handler: () => {
          alert.dismiss();
        },
      }]
    });
    alert.present();
  }
}
