import {Component} from '@angular/core';
import {Utils} from "../../../shared/utils";
import {NavParams, NavController,ViewController,AlertController} from "ionic-angular";
import {SsrServiceProvider} from "../../../providers/webservices/ssrservices";
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {SSRCancelReq} from '../../../shared/model/ssr/ssrcancelreq.model';
import {SsrSearchByIdResponseModal} from "../../../shared/model/ssr/searchbyidresponse.modal";
/**
 * Generated class for the SSR cancel component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'ssr-cancel-container',
  templateUrl: 'ssr-cancel-container.html',
  providers: [Utils,SsrServiceProvider,SSRCancelReq]
})
export class SsrCancelContainerComponent {
  remarks: string;
  reqId: string;
  reqStatus:string;
  ssrcancelreq: SSRCancelReq;
  error: boolean = false;
  cancelForm: FormGroup;
  ssrSearchResult:SsrSearchByIdResponseModal;
  fromHistory:boolean=false;
  constructor(public navCtrl: NavController,private ssrServiceProvider: SsrServiceProvider,public navParams: NavParams,
              public viewCtrl: ViewController, public formBuilder: FormBuilder,
              private alertCtrl: AlertController,public utils: Utils) {

    this.reqStatus = this.navParams.get('requeststatus');
    this.reqId = this.navParams.get('ssrreqno');
    this.fromHistory=this.navParams.get('fromHistory');
    if(this.fromHistory){
      this.ssrcancelreq=new SSRCancelReq();
      this.ssrcancelreq.cancelRemarks=this.remarks;
      this.ssrcancelreq.requestStatus=this.reqStatus;
      this.ssrcancelreq.ssrRequestReqNo=this.reqId;
    }else{
      this.ssrcancelreq=new SSRCancelReq();
      this.ssrcancelreq.cancelRemarks=this.remarks;
      this.ssrcancelreq.requestStatus=this.reqStatus;
      this.ssrcancelreq.ssrRequestNo=this.reqId;
    }
    this.cancelForm = this.formBuilder.group({
        remarks: ['', Validators.compose([Validators.required])],
    }
    );
  }
 
  close() {
    this.viewCtrl.dismiss(null);
  }
  ssrCancel() {
  if (this.cancelForm.controls.remarks.valid) {
    this.ssrServiceProvider.cancelSSR(this.ssrcancelreq).subscribe(response=> {
    this.ssrSearchResult = <SsrSearchByIdResponseModal>response;
      if(this.ssrSearchResult.requestStatus=='Cancelled') {
        this.presentAlert(this.utils.getLocaleString("ssr-cancelalert"), this.utils.getLocaleString("ssr-cancelsuccess"));
      }
    },error =>{
    });
  }else {
      this.error = true;
  }
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
   navigateBack() {
     if(this.fromHistory){
      this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.getActive().index - 4));
     }else{
       this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.getActive().index - 3));
     }
  }
}
