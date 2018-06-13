import {Component, ViewChild} from '@angular/core';
import {AlertController, Content, FabContainer, IonicPage, Navbar,ModalController , NavController, NavParams} from 'ionic-angular';
import {SecurityUtility} from "../../../shared/securityutility";
import {Utils} from "../../../shared/utils";
import {DatePipe} from "@angular/common";
import {SsrConfirmation} from "../ssr-confirmation/ssrconfirmation";
import {SsrHistoryPage} from "../ssr-history/ssrhistory";
import {SsrCancelContainerComponent} from "../../../components/ssrmodelpage/ssr-cancel-container/ssr-cancel-container";
import {SsrEditPage} from "../ssr-edit/ssredit";
import {SsrViewPage} from "../ssr-view/ssrview";
import {SSRSearchResult} from "../../../shared/model/ssr/ssrsearchresult.model";
/**
 * Generated class for the TasummaryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-ssrsummary',
  templateUrl:'ssrsummary.html',
  providers: [SecurityUtility, Utils,SSRSearchResult],
})
export class SsrsummaryPage {
  @ViewChild('navbar') navBar: Navbar;
  @ViewChild(Content) content: Content;
  alerttitle: string;
  ssrreqno:any;
  cusrefno:any;
  ssrservicetype:any;
  ssrspname:any;
  ssrsptype:any;
  createddate:any
  requeststatus:any;
  servicestatus:any;
  canAmendBool: boolean = false;
  canCancelBool: boolean = false;
  constructor(public navCtrl: NavController,public modalCtrl: ModalController, public navParams: NavParams,
              public alertCtrl: AlertController, public utils: Utils, public datepipe: DatePipe,
              public ssrSearchResult:SSRSearchResult,public securityUtility: SecurityUtility,) {

    this.ssrSearchResult = this.navParams.get('ssrSearchResult');
    this.ssrreqno=this.ssrSearchResult.ssrRequestNo;
    this.cusrefno=this.ssrSearchResult.cusReferenceNo;
    this.ssrservicetype=this.ssrSearchResult.specialServiceTypeName;
    this.ssrspname=this.ssrSearchResult.spName;
    this.ssrsptype=this.ssrSearchResult.spType;
    this.createddate=this.ssrSearchResult.createdDate;
    this.requeststatus=this.ssrSearchResult.requestStatus;
    this.servicestatus=this.ssrSearchResult.serviceStatus;
    this.canAmendBool = this.canAmend();
    this.canCancelBool = this.canCancel();
  }

  cancelSSR() {
    let profileModal = this.modalCtrl.create(SsrCancelContainerComponent,  {
      requeststatus:this.ssrSearchResult.requestStatus,
      ssrreqno:this.ssrSearchResult.ssrRequestNo,
      fromHistory:false,
    });
    profileModal.present();
  }

  seeHistory() {
    this.navCtrl.push(SsrHistoryPage, {ssrrequestno:this.ssrreqno,
     cancancel:this.canCancelBool,
    canamend:this.canAmendBool,});

  }

  editSSR() {
    this.navCtrl.push(SsrEditPage, {

    });

  }
  viewSSR(){
    this.navCtrl.push(SsrViewPage,{ssrrequestno:this.ssrreqno});
  }
  getStatusIcon(s) {
    switch (s) {
      case 'Approved':
        return "assets/img/approved.svg";
      case 'Rejected':
        return "assets/img/rejected.svg";
      case 'Pending':
        return "assets/img/pending.svg";
      case 'Cancelled':
        return "assets/img/cancelled.svg";
      case 'Submitted':
        return "assets/img/submitted.svg";
      default :
        return "assets/img/pending.svg";
    }
  }
  canAmend() {
    if (this.securityUtility.canAmend(this.securityUtility.SSR_REGISTRATION)) {
      return true;
    } else {
      return false;
    }
  }

  canCancel() {
    if (this.securityUtility.canCancel(this.securityUtility.SSR_REGISTRATION)) {
      return true;
    } else {
      return false;
    }
  }

  isAdminUser(selectedContainer) {
    if (selectedContainer.canApprove == true) {
      return true;
    } else {
      return false;
    }
  }
  cancelHidden(selectedContainer) {
    if(!selectedContainer.approverButton && this.canCancelBool) {
      if(selectedContainer.serviceStatus=="Completed" ||selectedContainer.serviceStatus=="Declined"||
          selectedContainer.serviceStatus=="Work In Progress"){
          return true;
        }else if (selectedContainer.requestStatus == "Submitted") {
          return false;
        } else if (selectedContainer.requestStatus == "Pending" || selectedContainer.requestStatus == "Cancelled") {
          return true;
        } else if (selectedContainer.requestStatus == "Approved") {
          if (selectedContainer.amendRequestStatus == "Approved" || selectedContainer.amendRequestStatus == "Rejected" ||
            selectedContainer.amendRequestStatus == "Cancelled") {
            return false;
          } else {
            return true;
          }
        } else if (selectedContainer.requestStatus == "Rejected") {
          if (selectedContainer.amendRequestStatus == "Rejected" || selectedContainer.amendRequestStatus == "Cancelled"){
            return false;
          } else {
            return true;
          }
        }
      } else {
        return true;
      }
  }
  editHidden(selectedContainer) {
    if(this.canAmendBool){
       if (selectedContainer.requestStatus == "Submitted") {
          return false;
        } else if (selectedContainer.requestStatus == "Pending" || selectedContainer.requestStatus == "Cancelled") {
          return true;
        } else if (selectedContainer.requestStatus == "Approved") {
          if ((selectedContainer.amendRequestStatus == "Approved" || selectedContainer.amendRequestStatus == "Rejected" ||
            selectedContainer.amendRequestStatus == "Cancelled")&& 
            (selectedContainer.serviceStatus=="Declined"||selectedContainer.serviceStatus==""
            ||selectedContainer.serviceStatus==null)) {
            return false;
          } else {
            return true;
          }
        } else if (selectedContainer.requestStatus == "Rejected") {
          if (selectedContainer.amendRequestStatus == "Rejected" || selectedContainer.amendRequestStatus == "Cancelled") {
            return false;
          } else {
            return true;
          }
        }
      }else if(selectedContainer.appoverEditFlag=='Y' && selectedContainer.requestStatus == "Approved"
      && (selectedContainer.serviceStatus!="Completed")){
        return false;
      } else {
        return true;
      }
  }
  getStyle() {
    return '#808080';
  }


}
