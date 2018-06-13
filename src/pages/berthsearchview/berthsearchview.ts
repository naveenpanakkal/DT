import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Navbar, PopoverController, App, AlertController, Content} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {BerthSearchReqModel} from "../../shared/model/berthsearchview/berthsearchviewreq.model";
import {BerthSearchResultModel} from "../../shared/model/berthsearchview/berthsearchviewresult.model";
import {BerthSearchResultListModel} from "../../shared/model/berthsearchview/berthsearchviewresult-list.model";
import {BerthServicesProvider} from "../../providers/webservices/berthservices";
import {BerthsearchsummaryPage} from '../berthsearchsummary/berthsearchsummary';
import {BerthfilterpopoverPage} from '../berthfilterpopover/berthfilterpopover';
import {BerthsortpopoverPage} from '../berthsortpopover/berthsortpopover';
import {DatePipe} from "@angular/common";
import {BerthSearchDetailsResultModel} from "../../shared/model/berthsearchview/berthsearchdetails/berthsearchdetailsresult.model";
import {ExecuteactionPage} from "../executeaction/executeaction";
import {BerthsearchdetailviewPage} from "../berthsearchdetailview/berthsearchdetailview";
import {Utils} from "../../shared/utils";

@IonicPage()
@Component({
  selector: 'page-berthsearchview',
  templateUrl: 'berthsearchview.html',
  providers: [BerthSearchReqModel, BerthSearchResultModel, BerthSearchResultListModel,BerthSearchDetailsResultModel,Utils]
})

export class BerthSearchViewPage {
@ViewChild('navbar') navBar: Navbar;
 searchdetails: BerthSearchResultModel[];
 selectedTitle: String;
 ascending:boolean = false;
lengthofmainarray: number = 0;

  vesseloperator:string;
  shippingAgentName:string;
  berthrotationnumber:string;
  vesselname:string;
  createdby:string;
  berthstatus:string;
  berthoperationstatus:string;
  bertheta: string;
  createdFromDate: string;
  createdToDate:string;
  etafromdate:string;
  etatodate:string;
  servicename:string;
  berthrequestid:string;
  rotationActive: boolean;
  left:any;
  right:any;
  berthFromDate: any;
  berthToDate: any;
  fromdate:any;
  todate:any;
  @ViewChild(Content) content: Content;
 constructor( public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController,
             public app: App, private storage: Storage,public berthSearchReqModel: BerthSearchReqModel,
             public berthSearchResultModel: BerthSearchResultModel,public berthSearchResultListModel: BerthSearchResultListModel,
             public alertCtrl: AlertController, public berthServicesProvider:BerthServicesProvider,public utils:Utils,
             public datepipe: DatePipe,public berthSearchDetailsResultModel: BerthSearchDetailsResultModel) {
    console.log('constructor berthsearchView');
    this.selectedTitle='rno'
  //  this.clearRequest();
    // this.searchBerth();

}
 ionViewDidLoad() {
    console.log('ionViewDidEnter berthsearchView')
    this.storage.remove('filterSelected');
    this.storage.remove('rotationno');
    this.storage.remove('vesselname');
    localStorage.setItem('ETA', '');
   //clear sort
    this.storage.remove('berthRadioSelect');
    this.storage.remove('berthSortOrder');
   this.rotationActive=this.navParams.get('isRotationNoActive');
   if( null != this.rotationActive && this.rotationActive == true) {
     this.clearRequest();
     this.berthrotationnumber = this.navParams.get('berthrotationnumber');
   } else {
     //additional
     this.vesseloperator = this.navParams.get('vesseloperator');
     this.shippingAgentName = this.navParams.get('shippingAgentName');

     this.berthrotationnumber = this.navParams.get('berthrotationnumber');
     this.vesselname = this.navParams.get('vesselname');
     this.createdby = this.navParams.get('createdby');
     this.berthstatus = this.navParams.get('berthstatus');
     this.berthoperationstatus = this.navParams.get('berthoperationstatus');
     this.bertheta = this.navParams.get('bertheta');
     this.createdFromDate = this.navParams.get('createdFromDate');
     this.createdToDate = this.navParams.get('createdToDate');
     this.etafromdate = this.navParams.get('etafromdate');
     this.etatodate = this.navParams.get('etatodate');
     this.servicename = this.navParams.get('servicename');
     this.berthrequestid = this.navParams.get('berthrequestid');
   }
    this.navBar.backButtonClick = () => {
      this.navCtrl.popTo(this.navCtrl.getByIndex(1));
    };
   if (this.navParams.get('filter')) {
      this.berthSearchReqModel = this.navParams.get('filter');
    } else {
      this.loadSearchRequest();
    }
  }

  ionViewWillEnter()
  {
    this.searchBerth();
  }

 clearRequest() {
    this.berthSearchReqModel.createdBySearch="";
    this.berthSearchReqModel.createdFromDate="";
    this.berthSearchReqModel.createdToDate="";
    this.berthSearchReqModel.etaFromDate="";
    this.berthSearchReqModel.etaSearch="";
    this.berthSearchReqModel.etaToDate="";
    this.berthSearchReqModel.requestIdSearch="";
    //this.berthSearchReqModel.rotationNumberSearch="";
    this.berthSearchReqModel.serviceNameSearch="";
    this.berthSearchReqModel.vesselNameSearch="";
    this.berthSearchReqModel.berthBookingStatusSearch="All";
    this.berthSearchReqModel.operationStatusSearch="All";
    this.setDates();
 }
  setDates(){
    this.berthFromDate=new Date();
   // this.berthFromDate.setHours(this.berthFromDate.getHours() + 4);
    this.berthFromDate= new Date( this.berthFromDate.getTime() -
                  this.berthFromDate.getTimezoneOffset()*60000);
    this.berthFromDate.setDate(this.berthFromDate.getDate() - 7);
    this.berthFromDate= this.berthFromDate.toISOString();
    this.berthSearchReqModel.createdFromDate= this.datepipe.transform(this.berthFromDate.split("T")[0], 'dd/MM/yyyy');
    this.berthFromDate=this.berthFromDate.split("T")[1];
    this.berthFromDate=this.berthFromDate.substr(0,this.berthFromDate.lastIndexOf(':'));
    this.berthSearchReqModel.createdFromDate=this.berthSearchReqModel.createdFromDate+" "+this.berthFromDate;
    this.berthToDate = new Date();
    this.berthToDate= new Date( this.berthToDate.getTime() -
                  this.berthToDate.getTimezoneOffset()*60000);
   // this.berthToDate.setHours(this.berthToDate.getHours() + 4);
    this.berthToDate= this.berthToDate.toISOString();
    this.berthSearchReqModel.createdToDate= this.datepipe.transform(this.berthToDate.split("T")[0], 'dd/MM/yyyy');
    this.berthToDate=this.berthToDate.split("T")[1];
    this.berthToDate=this.berthToDate.substr(0,this.berthToDate.lastIndexOf(':'));
    this.berthSearchReqModel.createdToDate= this.berthSearchReqModel.createdToDate+" "+this.berthToDate;
  }
  loadSearchRequest() {
   this.berthSearchReqModel.berthBookingStatusSearch=this.berthstatus;
    this.berthSearchReqModel.createdBySearch=this.createdby;
    this.berthSearchReqModel.createdFromDate=this.createdFromDate;
    this.berthSearchReqModel.createdToDate=this.createdToDate;
    this.berthSearchReqModel.etaFromDate=this.etafromdate;
    this.berthSearchReqModel.etaSearch=this.bertheta;
    this.berthSearchReqModel.etaToDate=this.etatodate;
    this.berthSearchReqModel.operationStatusSearch=this.berthoperationstatus;
    this.berthSearchReqModel.requestIdSearch=this.berthrequestid;
    this.berthSearchReqModel.rotationNumberSearch=this.berthrotationnumber;
    this.berthSearchReqModel.serviceNameSearch=this.servicename;
    this.berthSearchReqModel.vesselNameSearch=this.vesselname;
    this.berthSearchReqModel.vesselOperatorSearch=this.vesseloperator;
    this.berthSearchReqModel.shippingAgentSearch=this.shippingAgentName;

 }
 searchBerth() {
    console.log('searchBerth' + JSON.stringify(this.berthSearchReqModel));
    this.berthServicesProvider.searchBerthRegistered(this.berthSearchReqModel)
      .subscribe(response => {
          this.berthSearchResultListModel = <BerthSearchResultListModel>response;
          this.searchdetails = this.berthSearchResultListModel.list;
          if((this.searchdetails != null) && (this.searchdetails.length == 0)) {
            const alert = this.alertCtrl.create({
              title: 'Alert',
              subTitle: 'No data for current filter',
              buttons: ['OK']
            });
            alert.present();
          } else if (this.searchdetails != null) {
            this.asc();
          }
        },
        error => {
          var errorMessage = <any>error;
          //Show error message
          //dismiss loading
        });
  }
  getStatusIcon(s) {

    switch (s.berthBookingStatusSearch) {
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
      case 'Suspended':
        return "assets/img/suspended.svg";
     case 'Cancellation Initiated':
        return "assets/img/cancelled.svg";
    }
  }
  presentFilterPopover(myEvent) {
  let popover = this.popoverCtrl.create(BerthfilterpopoverPage, {}, {cssClass: 'cafilterpopover'});
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss((data) => {
      if (data) {
        if ((data.statusFilter == "All" || data.statusFilter == null) && (data.vesselName == null||data.vesselName.length == 0)
         && (data.rotationNo == null ||data.rotationNo.length ==0) && data.eta == null ) {
          this.clearRequest();
          this.berthSearchReqModel.rotationNumberSearch="";
          this.searchBerth();
        } else if(data.rotationNo != null && data.rotationNo.length > 0) {
          this.clearRequest();
          this.loadSearchRequest();
          this.berthSearchReqModel.rotationNumberSearch= data.rotationNo;
          this.searchBerth();
        }
        else {
           if (data.vesselName != null) {
            this.berthSearchReqModel.vesselNameSearch = data.vesselName;
          }else{
            this.berthSearchReqModel.vesselNameSearch = "";
          }
          if (data.statusFilter && data.statusFilter != 'All') {
            this.berthSearchReqModel.berthBookingStatusSearch = data.statusFilter;
          }else{
             this.berthSearchReqModel.berthBookingStatusSearch = "All";
          }
          if (data.rotationNo != null) {
            this.berthSearchReqModel.rotationNumberSearch = data.rotationNo;
          }else{
             this.berthSearchReqModel.rotationNumberSearch = "";
          }

          if(data.eta && data.eta != ''){
           this.berthSearchReqModel.etaSearch = data.eta;
          }else{
            this.berthSearchReqModel.etaSearch ="";
          }
            this.searchBerth();
        }
        this.asc();
      }
      this.content.scrollToTop(0);
    });
  }

  getStyle() {
    return '#808080';
  }
  /*Sort functionality*/
  presentSortPopover(myEvent) {
  let popover = this.popoverCtrl.create(BerthsortpopoverPage,{
      berthRadioSelect: this.selectedTitle,
      berthSortOrder:this.ascending},
     {cssClass: 'casortpopover'});
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss((data) => {
      if (data) {
        this.selectedTitle = data.sortOption ? data.sortOption : '';
        this.ascending = data.sortOrder != null ? data.sortOrder : false;
        this.asc();
      }
      this.content.scrollToTop(0);
    });
  }
   asc() {
    console.log(this.selectedTitle+"asc");
    if (this.selectedTitle != "") {
       if (this.selectedTitle === 'rno') {
        this.searchdetails = this.sortNumberArray(this.searchdetails, "rotationNumberSearch");
      }
      if (this.selectedTitle === 'vname') {
        this.searchdetails = this.sortArray(this.searchdetails, "vesselNameSearch");
      }

      else if (this.selectedTitle === 'status') {
        this.searchdetails = this.sortArray(this.searchdetails, "berthBookingStatusSearch");
      }

      else if(this.selectedTitle == 'eta'){
        this.searchdetails = this.sortDateArray(this.searchdetails, "etaSearch");
      }

      else if (this.selectedTitle === 'createdby') {
        this.searchdetails = this.sortArray(this.searchdetails, "createdBySearch");
      }

      else if (this.selectedTitle === 'createddate') {
        this.searchdetails = this.sortDateArray(this.searchdetails, "createdDateSearch");
      }
	 this.lengthofmainarray = this.searchdetails.length;
    }

    console.log('lengthofmainarray ' + this.lengthofmainarray);
  }

  sortArray(array: Array<any>, args: string): Array<any> {
    let direction = this.ascending ? 1 : -1;
    array.sort((a: any, b: any) => {
      if (a[args].toLowerCase() < b[args].toLowerCase()) {
        return -1 * direction;
      } else if (a[args].toLowerCase() > b[args].toLowerCase()) {
        return 1 * direction;
      } else {
        return 0;
      }
    });
    return array;
  }

  sortNumberArray(array: Array<any>, args: string): Array<any> {
    let direction = this.ascending ? 1 : -1;
    array.sort((a: any, b: any) => {
      if (a[args] < b[args]) {
        return -1 * direction;
      } else if (a[args] > b[args]) {
        return 1 * direction;
      } else {
        return 0;
      }
    });
    return array;
  }


  sortDateArray(array: Array<any>, args: string): Array<any> {
    array.sort((a: any, b: any) => {
      this.left = new Date(this.transformwithTime(a[args]));
      this.right = new Date(this.transformwithTime(b[args]));
      return this.ascending ? this.left - this.right : this.right - this.left;
    });
    return array;
  }

  transform(value: string): Date {
    let reggie = /(\d{2})\/(\d{2})\/(\d{4})/;
    let dateArray = reggie.exec(value);
    let dateObject = new Date(
      (+dateArray[3]),
      ((+dateArray[2])) - 1, // month starts at 0!
      (+dateArray[1])
    );
    return dateObject;
  }

  transformwithTime(value: string): Date {
    let reggie = /(\d{2})\/(\d{2})\/(\d{4})\s(\d{2}):(\d{2})/;
    let dateArray = reggie.exec(value);
    let dateObject = new Date(
      (+dateArray[3]),
      ((+dateArray[2])) - 1, // month starts at 0!
      (+dateArray[1]),
      (+dateArray[4]),
      (+dateArray[5]));
    return dateObject;
  }

  showdetails(s) {

    this.navCtrl.push(BerthsearchsummaryPage, {
      vesselname: s.vesselNameSearch,
      rotationno: s.rotationNumberSearch,
      eta: s.etaSearch,
      berthstatus: s.berthBookingStatusSearch,
      createdby: s.createdBySearch,
      createddate: s.createdDateSearch,
      statusicon:this.getStatusIcon(s),
      cancelbtnStatus:this.cancelHidden(s),
      operationstatus:s.operationStatusSearch,
      requestStatus:s.amendRequestStatus,
      filter: this.berthSearchReqModel
    });
  }
  cancelHidden(selectedBerth) {
    if(this.isAdmin(selectedBerth)==false && this.isSameUser(selectedBerth)) {
       if(selectedBerth.operationStatusSearch=='Sailed'
        || selectedBerth.operationStatusSearch=='OperationStarted'
        || selectedBerth.operationStatusSearch=='OperationInProgress'
        || selectedBerth.operationStatusSearch=='OperationCompleted'){
          return true;
    }else if (selectedBerth.berthBookingStatusSearch == "Submitted") {
          return false;
    } else if (selectedBerth.berthBookingStatusSearch == "Pending" ||
          selectedBerth.berthBookingStatusSearch == "Cancelled") {
          return true;
    } else if (selectedBerth.berthBookingStatusSearch == "Approved") {
          if (selectedBerth.amendRequestStatus == "Approved" || selectedBerth.amendRequestStatus == "Rejected" ||
            selectedBerth.amendRequestStatus == "Cancelled") {
            return false;
          } else {
            return true;
          }
    } else if (selectedBerth.berthBookingStatusSearch == "Rejected") {
          if (selectedBerth.amendRequestStatus == "Rejected"|| selectedBerth.amendRequestStatus == "Cancelled") {
            return false;
          } else {
            return true;
          }
        }
    }else{
      return true;
    }
  }
  isAdmin(selectedBerth){
 if((selectedBerth.clientCode==='toadmin')||(selectedBerth.clientCode==='msadmin'))
 {
        return true;
  }else
     return false;
 }
  isSameUser(selectedBerth) {
    if (localStorage.getItem('CLIENT_CODE') ==
    selectedBerth.clientCode) {
      return true;
      } else {
        return false;
      }
  }

  hideApproveButton(s) {
    if (s.approverButton == true  && s.canApprove == true) {
      return false;
    } else {
      return true;
    }
  }
  gotoapprove(s) {
    this.navCtrl.push(ExecuteactionPage, {
      workFlowId: s.wrkflwId,
      requestNo: s.requestID,
      berthStatus: s.berthBookingStatusSearch,
      fromPage: "BerthSearchViewPage"
    });
  }

  goview(s) {
    this.navCtrl.push(BerthsearchdetailviewPage, {rotationNo: s.rotationNumberSearch});
  }
   deleteberth(selectedBerth) {
    if (selectedBerth.operationStatusSearch =='Berthed'){
    let alert = this.alertCtrl.create({
      title: 'Alert',
      subTitle: 'Vessel is already in berthing stage so cancellation/deletion cannot be processed',
       buttons: [
        {
          text: 'OK',
          handler: () => {

           }
        }]
      });
      alert.present();
     }else if(selectedBerth.amendRequestStatus =='Submitted'){
        this.berthSearchDetailsResultModel.rotationNumber=selectedBerth.rotationNumberSearch;
        let alert = this.alertCtrl.create({
          title: 'Alert',
          subTitle: 'This action will cancel the Berth registration. Do you want to proceed?',
          buttons: [
            {
              text: 'OK',
              handler: () => {
                this.berthServicesProvider.CancelBerth(this.berthSearchDetailsResultModel)
                  .subscribe(Response => {
                      console.log('Delete berth error code '+ Response.errorCode);
                      if(Response.errorCode=='cancel2hours'){
                        let message=Response.errorMessage;
                        this.alertanddelete(message);
                      }else{
                       // this.navCtrl.push(BerthSearchViewPage);
                        this.loadSearchRequest();
                        this.searchBerth();
                      }
                    },
                    error => {
                      var errorMessage = <any>error;
                      //Show error message
                      //dismiss loading
                    });
              }
            }, {
              text: 'CANCEL',
              handler: () => {
            },
            }]

        });
        alert.present();
     }else{
       this.berthSearchDetailsResultModel.rotationNumber=selectedBerth.rotationNumberSearch;
        let alert = this.alertCtrl.create({
          title: 'Alert',
          subTitle: 'This action will cancel the Berth registration. Do you want to proceed?',
          buttons: [
            {
              text: 'OK',
              handler: () => {
                this.berthServicesProvider.DeleteBerth(this.berthSearchDetailsResultModel)
                  .subscribe(Response => {
                      console.log('Delete berth error code '+ Response.errorCode);
                      if(Response.errorCode=='cancel2hours'){
                        let message=Response.errorMessage;
                        this.alertanddelete(message);
                      }else{
                       // this.navCtrl.push(BerthSearchViewPage);
                        this.loadSearchRequest();
                        this.searchBerth();
     }
                    },
                    error => {
                      var errorMessage = <any>error;
                      //Show error message
                      //dismiss loading
                    });
  }
            }, {
              text: 'CANCEL',
              handler: () => {
            },
            }]

        });
        alert.present();
     }
  }
  alertanddelete(message){
      let alert = this.alertCtrl.create({
          title: 'Alert',
          subTitle: message,
          buttons: [
            {
             text: 'OK',
              handler: () => {
                this.berthServicesProvider.CancelBerth(this.berthSearchDetailsResultModel)
                  .subscribe(Response => {
                       // this.navCtrl.push(BerthSearchViewPage);
                        this.loadSearchRequest();
                        this.searchBerth();
                    },
                    error => {
                      var errorMessage = <any>error;
                      //Show error message
                      //dismiss loading
                    });
              }
            }, {
              text: 'CANCEL',
              handler: () => {
            },
            }]

        });
        alert.present();
  }
}
