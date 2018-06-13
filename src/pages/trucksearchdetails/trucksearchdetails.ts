import {Component, ViewChild} from '@angular/core';
import {
  IonicPage, NavController, NavParams, PopoverController, App, ViewController, Navbar, Platform,
  AlertController
} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TruckdetailsPage } from '../truckdetails/truckdetails';
import { MorePage } from '../more/more';
import { TruckhistoryPage } from '../truckhistory/truckhistory';
import {TrucksearchbyidRequestModel} from "../../shared/model/trucksearchdetails/trucksearchbyidrequest.model";
import {TruckRegResultModel} from "../../shared/model/trucksearchdetails/truckregresult.model";
import {TruckComparisonPage} from "../truckcomparison/truckcomparison";
import {TruckSearchResultsPage} from "../trucksearchresult/trucksearchresult";
import {TruckservicesProvider} from "../../providers/webservices/truckservices";
import {SecurityUtility} from "../../shared/securityutility";
import {Utils} from "../../shared/utils";

/**
 * Generated class for the TrucksearchdetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-trucksearchdetails',
  templateUrl: 'trucksearchdetails.html',
  providers: [TrucksearchbyidRequestModel, TruckRegResultModel,SecurityUtility,Utils]
})
export class TrucksearchdetailsPage {

  truckcreatedDate: string;
  trucklicensePlateNo: string;
  truckOwnname: string;
  truckstatus: string;
  truckRegId: number;
  mode: string;
  truckStatusIcon: string;
  responseClientCode : string;
  isClientCodeLocal : boolean;
  fromTruckCreate : boolean;
  editHiddenStatus:boolean;
  cancelHiddenStatus:boolean;

  truckColor: string;
  truckLength: number;
  @ViewChild('navbar') navBar: Navbar;

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController,
              public truckSearchdDetailsService: TruckservicesProvider, public truckRegResultModel: TruckRegResultModel,
              public truckSearchbyidModel: TrucksearchbyidRequestModel, public plt:Platform,
              public truckservicesProvider: TruckservicesProvider,public alertCtrl: AlertController,
              public securityUtility: SecurityUtility,public utils:Utils,) {


    this.truckRegId = navParams.get('sel_truckId');
    this.trucklicensePlateNo = navParams.get('sel_licPlateNo');
    this.truckOwnname = navParams.get('sel_OwnerName');
    this.truckstatus = navParams.get('sel_truckStatus');
    this.truckcreatedDate = navParams.get('sel_truckDate');
    this.truckStatusIcon = navParams.get('sel_statusIcon');
    this.mode = navParams.get('mode');
    this.editHiddenStatus = navParams.get('sel_editStatus');
    this.cancelHiddenStatus = navParams.get('sel_cancelStatus');

    this.loadCreatedDetails(this.navParams);
    this.plt.registerBackButtonAction(()=>{
      if(this.fromTruckCreate) {
        document.addEventListener('backbutton', () => {
          this.navCtrl.popAll();
          this.navCtrl.push(TruckSearchResultsPage, {after_create : true});
        },false);
      }
    });
  }

  ionViewWillEnter()
  {
    this.loadTruckDetails();
  }

  ionViewDidLoad() {
    }

  closemodal() {
    this.navCtrl.popToRoot();
  }

  ionViewDidEnter() {

    this.navBar.backButtonClick = () => {

      if(this.fromTruckCreate) {

            this.navCtrl.push(TruckSearchResultsPage);

/*          this.navCtrl.push(TruckSearchResultsPage,{after_create : true} ).then(
            () => {
              const index = this.navCtrl.getActive().index;
              this.navCtrl.remove(index-1);
              this.navCtrl.remove(index-2);
            }
          );*/
      }
      else
        this.navCtrl.pop(); // Back button press when in view mode
    };
  }

  more() {
    let popover = this.popoverCtrl.create(MorePage);
    popover.present();
  }

  seehistory() {
    this.navCtrl.push(TruckhistoryPage, {
      reqestNo: this.truckRegId,
      sel_truckId: this.truckRegId,
      truckStatus: this.truckstatus
    });
  }

  getStyle() {
    return '#808080';
  }

  editTruck() {
    this.mode = "edit";
    this.navCtrl.push(TruckdetailsPage, {
      sel_truckId: this.truckRegId, mode: this.mode,reg_aut_so_list:this.truckRegResultModel.truckRegAuthorityMasterSOList
    });
  }
  addTruck(){
      //ToDo
     //Navigate to create Page
  }

  cancelTruck(){
    //---ios_changes--start
    let alert = this.alertCtrl.create({
      title: 'Alert',
      subTitle: 'Are you sure you want to cancel the registration?',
      //cssClass: 'search',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.truckservicesProvider.cancelTruck(this.truckSearchbyidModel)
              .subscribe(Response => {
                 // console.log('Success');
                  this.navCtrl.push(TruckSearchResultsPage);
                },
                error => {
                  var errorMessage = <any>error;
                  //Show error message
                  //dismiss loading
                });
          }
        } ,{text: 'CANCEL',
          handler: () => {
          },}]

    });
//---ios_changes--end

    alert.present();
  }

  isFromTruckCreate () {
    if(this.fromTruckCreate) {
      return false;
    } else {
      return true;
    }
  }

  isFromTruckDetails() {
    if(this.fromTruckCreate) {
      return true;
    } else {
      return false;
    }
  }

  hideEdit() : boolean{
   // console.log(" Local <<" + localStorage.getItem('CLIENT_CODE') + ">> response <<" + this.responseClientCode + ">>");
    /*amendRequestStatus*/
    /*if(localStorage.getItem('CLIENT_CODE') === this.responseClientCode){*/
      if (((this.truckRegResultModel.amendRequestStatus === "Pending") &&
          ((this.truckstatus === 'Rejected') || (this.truckstatus === "Approved") || (this.truckstatus === "Pending")))
        || (this.truckstatus === "Cancelled")) {
	console.log(" Same User - Hide");
        return true;
      }
      else {
     // console.log(" Same User");
        return false;
      }
    /*}
    else{
     // console.log("Different User");
      return true;
    }*/

  }

  viewTruck() {
    this.mode = "view";
    this.navCtrl.push(TruckdetailsPage, {
      sel_truckId: this.truckRegId, mode: this.mode,reg_aut_so_list:this.truckRegResultModel.truckRegAuthorityMasterSOList
    });
  }

  //Modified to check if the user have permission to create truck
  canCreate() {
    if(this.securityUtility.canAmend(this.securityUtility.TRUCK_REGISTRATION)== true){
      return false;
    } else {
      return true;
    }
  }


  loadTruckDetails() {
    if(!this.fromTruckCreate) {
      this.truckSearchbyidModel.truckRegistrationId = this.truckRegId;
      this.truckSearchdDetailsService.searchTruckById(this.truckSearchbyidModel)
        .subscribe(response => {
            this.truckRegResultModel = <TruckRegResultModel>response;
            this.responseClientCode = this.truckRegResultModel.clientCode;
            this.isClientCodeLocal = this.hideEdit();
            this.truckstatus = this.truckRegResultModel.status;
            // console.log(this.truckRegResultModel.name);
            //process data
          },
          error => {
            var errorMessage = <any>error;
            //Show error message
            //dismiss loading
          });
    }
  }

  loadCreatedDetails (params: any) {
    this.fromTruckCreate = params.get('is_from_truck_create');
    this.truckLength = params.get('truckLength');
    this.truckColor = params.get('truckColor');
  }

  cancelStatus() {
    if (this.truckstatus === "Cancelled" || this.truckstatus == "Pending") {
      return true;
    } else {
      if(this.isSameUser()) {
        return false;
      } else {
        return true;
      }
    }
  }

  editHidden(){
    if(this.isAdminUser() == true) {
      return false;
    } else if(this.canCreate() == false) {
      if (this.truckstatus === "Cancelled" || this.truckstatus == "Pending") {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  // editHiddenNew() {
  //   if (this.isAdminUser() == true) {
  //     return false;
  //   } else if (this.canCreate() == false) {
  //     if (this.truckstatus == "Submitted") {
  //       return false;
  //     } else if (this.truckstatus == "Pending" || this.truckstatus == "Cancelled") {
  //       return true;
  //     } else if (status == "Approved") {
  //       if (this.truckAmdStatus == "Approved" || this.truckAmdStatus == "Rejected" || this.truckAmdStatus == "Cancelled") {
  //         return false;
  //       } else {
  //         return true;
  //       }
  //     } else if (this.truckstatus == "Rejected") {
  //       if (this.truckAmdStatus == "Rejected") {
  //         return false;
  //       } else {
  //         return true;
  //       }
  //     }
  //   } else {
  //     return true;
  //   }
  // }

  isAdminUser() {
    if (null != this.truckRegResultModel.approver) {
      if(this.truckRegResultModel.approver == "Y") {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  getStatusIcon(vstatus) {

    switch (vstatus) {
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
    }
  }

  isSameUser() {
    if(this.truckRegResultModel && localStorage.getItem('CLIENT_CODE') == this.truckRegResultModel.clientCode) {
      return true;
    } else {
      return false;
    }
  }
}
