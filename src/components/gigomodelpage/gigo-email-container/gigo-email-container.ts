/**
 * Generated class for the GIGO cancel component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */

import {Component} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertController, NavController, NavParams, ViewController} from "ionic-angular";
import {GigoDetailsSO} from "../../../shared/model/GIGO/gigodetails.model";
import {GiGoServiceProvider} from "../../../providers/webservices/gigoservice";


@Component({
  selector: 'gigo-email-container',
  templateUrl: 'gigo-email-container.html'

})
export class GigoEmailContainerComponent {
  gigoNo : number;
  mailId : string;
  emailForm: FormGroup;
  reportFormat : string;
  error: boolean = false;
  format:string;
  mail:string;
  validMailId: boolean = false;
  gigoDetailsSO: GigoDetailsSO = new GigoDetailsSO();
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public formBuilder: FormBuilder,
              public gigoServiceProvider: GiGoServiceProvider,
              private alertCtrl: AlertController) {
    this.gigoNo = navParams.get("gigoNo");


    this.emailForm = this.formBuilder.group({
      reportFormat: ['', Validators.compose([Validators.required])],
      mailId: ['', Validators.compose([Validators.required])]
      }
    );
    this.reportFormat = "";
  }

  Send() {
    if(this.emailForm.valid  ) {
      if(this.checkEmail(this.mailId))
      {
      this.gigoDetailsSO.gigoNo = this.gigoNo;
      this.gigoDetailsSO.reportFormat = this.reportFormat;
      this.gigoDetailsSO.addMailIDs = this.mailId;
      this.gigoServiceProvider.gigoSendMail(this.gigoDetailsSO).subscribe(response => {
        this.presentAlert('Send Email', 'Email is sent successfully',true);
      }, error => {

      });
      }
    else {
        this.error = true;
        this.presentAlert('Attention', 'Please enter a valid email id',false);
      }
    }
    else {
      this.error = true;
    }
  }
  navigateBack() {
    this.navCtrl.popTo(this.navCtrl.getByIndex(1));
  }
  close() {
    this.viewCtrl.dismiss(null);
  }
  presentAlert(title: string, message: string, flag:boolean) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            alert.dismiss();
            if(flag) {
              this.close();
            }
          }
        }
      ]
    });
    alert.present();
  }
  checkEmail(emailList : string) {
    if(emailList && emailList.length >0) {
      var emails = emailList.split(",");
      this.validMailId = true;
      var regex = /^[a-zA-Z0-9.!#$%&’*+=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i;

      for (var i = 0; i < emails.length; i++) {
        if (emails[i] == "" || !regex.test(emails[i])) {
          this.validMailId = false;
        }
      }
    } else {
      this.validMailId = false;
    }
    return this.validMailId;
  }
}
