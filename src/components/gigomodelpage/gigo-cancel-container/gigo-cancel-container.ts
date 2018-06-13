import {Component} from '@angular/core';
import {Utils} from "../../../shared/utils";
import {NavParams, NavController,ViewController,AlertController} from "ionic-angular";
import {GiGoServiceProvider} from "../../../providers/webservices/gigoservice";
import {GigoDetailsSO} from "../../../shared/model/GIGO/gigodetails.model";
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {GigoSearchByIdRequestModel} from "../../../shared/model/GIGO/gigosearchrequest.model";
/**
 * Generated class for the GIGO cancel component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'gigo-cancel-container',
  templateUrl: 'gigo-cancel-container.html',
  providers: [Utils,GiGoServiceProvider,GigoDetailsSO,GigoSearchByIdRequestModel]
})
export class GIGOCancelContainerComponent {
  remarks: string;
  gigoId: number;
  gigoStatus:string;
  gigoCancelDone:string;
  gigoCancelReqContainerDetailsModel: GigoSearchByIdRequestModel;
  gigoCancelResult:GigoDetailsSO;
  error: boolean = false;
  cancelForm: FormGroup;
  alertButtonDismiss:string;
  cancelStatus:boolean = false;
  constructor(public navCtrl: NavController,private gigoServiceProvider: GiGoServiceProvider,public navParams: NavParams,
              public viewCtrl: ViewController, public formBuilder: FormBuilder,
              private alertCtrl: AlertController,public utils: Utils) {

    this.gigoId = this.navParams.get('gigoId');
    this.gigoStatus = this.navParams.get('gigoStatus');
    this.alertButtonDismiss = this.utils.getLocaleString("ca_ok_text");
    this.cancelForm = this.formBuilder.group({
        remarks: ['', Validators.compose([Validators.required])],
    }
    );
  }

  submit() {
    if (this.cancelForm.controls.remarks.valid) {
      if(this.gigoCancelResult != null && this.gigoCancelResult.status=='Cancelled' )
      {
        this.presentAlert('Confirm', this.utils.getLocaleString('Cancel_already_done'));
      }else {
        let alert = this.alertCtrl.create({
          title: 'Confirm',
          subTitle: this.utils.getLocaleString('gigo_Cancel_Confirm'),
          buttons: [
            {
              text: 'Ok',
              handler: () => {
                this.gigoCancelReqContainerDetailsModel = new GigoSearchByIdRequestModel();
                this.gigoCancelReqContainerDetailsModel.gigoNo=  this.gigoId.toString();
                this.gigoCancelReqContainerDetailsModel.cancelRemarks= this.remarks;
                this.gigoCancelReqContainerDetailsModel.status  = this.gigoStatus;
                this.gigoServiceProvider.gigoDeleteById(this.gigoCancelReqContainerDetailsModel,true).subscribe(response=> {
                  this.gigoCancelResult = <GigoDetailsSO>response;
                  setTimeout(() => {
                    if(this.gigoCancelResult.status=='Cancelled') {
                      this.presentAlert('Confirm', this.utils.getLocaleString('Cancel_done'));
                    }
                  }, 500);

                } ,error =>{
                  console.log(error);
                });

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
      }
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
