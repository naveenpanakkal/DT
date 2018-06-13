import {Component} from '@angular/core';
import {Utils} from "../../../shared/utils";
import {NavParams, NavController,ViewController,AlertController} from "ionic-angular";
import {RBServiceProvider} from "../../../providers/webservices/rbservices";
import {RBCancelRequestModal} from "../../../shared/model/rb/rbcancelrequest.modal";
import {RBSearchByIDResultModel} from "../../../shared/model/rb/rbsearchbyidresult.model";
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
/**
 * Generated class for the RBCancel component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'rb-cancel-container',
  templateUrl: 'rb-cancel-container.html',
  providers: [Utils,RBServiceProvider,RBCancelRequestModal,RBSearchByIDResultModel]
})
export class RBCancelContainerComponent {
  remarks: string;
  rsbId: number;
  rbStatus:string;
  fromHistory:boolean = false;
  rbCancelContainerDetailsModel: RBCancelRequestModal;
  rbIdSearchResult:RBSearchByIDResultModel;
  error: boolean = false;
  cancelForm: FormGroup;
  alertButtonDismiss:string;
  cancelStatus:boolean = false;
  constructor(public navCtrl: NavController,private rbServiceProvider: RBServiceProvider,public navParams: NavParams,
              public viewCtrl: ViewController, public formBuilder: FormBuilder,
              private alertCtrl: AlertController,public utils: Utils) {

    this.rsbId = this.navParams.get('rsbId');
    this.fromHistory = this.navParams.get('fromHistory');
    this.rbStatus = this.navParams.get('resourceBookingStatus');
    this.alertButtonDismiss = this.utils.getLocaleString("ca_ok_text");
    this.cancelForm = this.formBuilder.group({
        remarks: ['', Validators.compose([Validators.required])],
    }
    );
  }

  submit() {
    if (this.cancelForm.controls.remarks.valid) {
      let alert = this.alertCtrl.create({
        title: 'Confirm',
        subTitle: 'This action will cancel the RB registration. Do you want to proceed?',
        buttons: [
          {
            text: 'Ok',
            handler: () => {
              this.rbCancelContainerDetailsModel = new RBCancelRequestModal();
              if(this.fromHistory) {
                this.rbCancelContainerDetailsModel.rsbReqId=  this.rsbId.toString();
              } else {
                this.rbCancelContainerDetailsModel.rsbId=  this.rsbId.toString();
              }
              this.rbCancelContainerDetailsModel.cancelRemarks= this.remarks;
              this.rbCancelContainerDetailsModel.resourceBookingStatus  = this.rbStatus;
              this.rbServiceProvider.cancelContainerDetails(this.rbCancelContainerDetailsModel).subscribe(response=> {
                this.rbIdSearchResult = <RBSearchByIDResultModel>response;
              } ,error =>{
                console.log(error);
              });
              setTimeout(() => {
              if(this.rbIdSearchResult.resourceBookingStatus=='Cancelled' || this.rbIdSearchResult.amendRequestStatus=='Cancelled') {
                this.presentAlert('Confirm', 'Your request has been cancelled successfully');
              }
              }, 500);
            },
          },
          {
            text: 'Cancel',
            handler: () => {
              alert.dismiss();
            },
          }]
      });
      alert.present();
    }  else {
      this.error = true;
    }
  }
  navigateBack() {
    this.navCtrl.popTo(this.navCtrl.getByIndex(1));
  }
  close() {
    this.viewCtrl.dismiss(null);
  }
  presentAlert(title: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navigateBack();
            alert.dismiss();
          }
        }
      ]
    });
    alert.present();
  }
}
