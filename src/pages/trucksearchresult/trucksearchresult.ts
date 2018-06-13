import {Component, ViewChild} from '@angular/core';
import {
  AlertController,
  Content,
  IonicPage,
  LoadingController,
  Navbar,
  NavController,
  NavParams,
  Platform,
  PopoverController
} from 'ionic-angular';
import {FormBuilder} from '@angular/forms';
import {Http} from '@angular/http';
import {Storage} from '@ionic/storage';
import {TruckfilterpopoverPage} from '../truckfilterpopover/truckfilterpopover';
import {MorePage} from '../more/more';
import {TruckSortpopoverPage} from '../trucksortpopover/trucksortpopover';

import {TrucksearchPage} from '../trucksearch/trucksearch';

import {TruckservicesProvider} from "../../providers/webservices/truckservices";
import {TruckRegSearchReqModel} from "../../shared/model/trucksearchview/truckregsearchrequest.model";
import {TruckRegSearchResultListModel} from "../../shared/model/trucksearchview/truckregsearchresult-list.model";
import {TruckRegSearchResultModel} from "../../shared/model/trucksearchview/truckregsearchresult.model";
import {TrucksearchdetailsPage} from "../trucksearchdetails/trucksearchdetails";

import {SecurityUtility} from "../../shared/securityutility";
import {LanguageProvider} from '../../providers/language/language';
import {DatePipe} from "@angular/common";
import {ExecuteactionPage} from "../executeaction/executeaction";
import {TruckdetailsPage} from "../truckdetails/truckdetails";
import {TrucksearchbyidRequestModel} from "../../shared/model/trucksearchdetails/trucksearchbyidrequest.model";
import {TruckRegResultModel} from "../../shared/model/trucksearchdetails/truckregresult.model";
import {sortArray, sortNumberArray, Utils} from "../../shared/utils";
/**
 * Generated class for the TruckSearchResultsPage .
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-truckdsearchresult',
  templateUrl: 'trucksearchresult.html',
  providers: [TruckRegSearchReqModel, TrucksearchbyidRequestModel, TruckRegResultModel, TruckRegSearchResultModel, TruckRegSearchResultListModel,
    SecurityUtility, Utils]

})
export class TruckSearchResultsPage {
  items: string[];

  public base64Image: string;

  private imageSrc: any[] = [];
  grid: Array<Array<string>>;

  ascending: boolean = false;

  lengthofmainarray: number = 0;

  @ViewChild('navbar') navBar: Navbar;

  selectedSortParameter: string;
  isScrolled: boolean;

  selectedTitle: string;
  searchResult: TruckRegSearchResultModel[];
  resultCount: number = 0;
  canCreateBool: boolean = false;
  canCancelBool: boolean = false;
  after_create: boolean;
  filterPopover: any;
  sortPopover: any;
  isSortPopoverPresent: boolean;
  isFilterPopoverPresent: boolean;
  createdFromDate: any;
  createdToDate: any;
  truckAmdStatus: string;
  left: any;
  right: any;
  @ViewChild(Content) content: Content;

  constructor(public lang: LanguageProvider,
              public popoverCtrl: PopoverController,
              public navCtrl: NavController, public navParams: NavParams,
              public formBuilder: FormBuilder,
              public alertCtrl: AlertController,
              public http: Http, public storage: Storage,
              public truckModel: TruckRegSearchReqModel,
              public trucksearchviewService: TruckservicesProvider,
              public truckRegSearch: TruckRegSearchReqModel,
              public truckRegSearchResult: TruckRegSearchResultModel,
              public truckRegSearchResultList: TruckRegSearchResultListModel,
              public securityUtility: SecurityUtility,
              public loadingCtrl: LoadingController,
              public truckSearchdDetailsService: TruckservicesProvider,
              public truckSearchbyidModel: TrucksearchbyidRequestModel,
              public truckRegResultModel: TruckRegResultModel,
              public datepipe: DatePipe,
              public platform: Platform,
              public utils: Utils) {
    console.log("<<In Search Result page " + this.navParams.get('source') + ">>");

    this.loadInitialRequest();
    this.selectedTitle = 'truckRegID';
    this.isScrolled = true;
    this.after_create = navParams.get('after_create');
    this.canCreateBool = this.canCreate();
    this.canCancelBool = this.canCancel();
    this.filterPopover = this.popoverCtrl.create(TruckfilterpopoverPage, {previous_search: this.truckRegSearch}, {cssClass: 'trk-filter-popover '});
    this.sortPopover = this.popoverCtrl.create(TruckSortpopoverPage, {previous: this.selectedTitle}, {cssClass: 'trk-sort-popover'});

    platform.ready().then(() => {
      platform.registerBackButtonAction(() => {
        if (this.isSortPopoverPresent || this.isFilterPopoverPresent) {
          this.filterPopover.dismiss();
          this.sortPopover.dismiss();
          this.isSortPopoverPresent = false;
          this.isFilterPopoverPresent = false;
        } else {
          this.navCtrl.pop();
        }
      });
    });

  }


  ionViewWillEnter() {
    this.searchTruck();
  }

  showdetails(selectedTruck) {
    this.navCtrl.push(TrucksearchdetailsPage, {
      sel_truckId: selectedTruck.truckRegistrationId,
      sel_licPlateNo: selectedTruck.licensePlateNo,
      sel_OwnerName: selectedTruck.name,
      sel_truckStatus: selectedTruck.status,
      sel_truckDate: selectedTruck.createdDate,
      sel_statusIcon: this.getStatusIcon(selectedTruck),
      sel_editStatus: this.editHidden(selectedTruck),
      sel_cancelStatus: this.cancelHidden(selectedTruck)
    });
  }

  more() {
    let popover = this.popoverCtrl.create(MorePage);
    popover.present();
  }

  presentFilterPopover(myEvent) {
    this.isScrolled = false;
    this.isFilterPopoverPresent = true;
    this.filterPopover.present({
      ev: myEvent
    });
    this.filterPopover.onDidDismiss((data) => {
      this.isFilterPopoverPresent = false;
      if (data) {
        if (data.truckFilterSelected == null && data.truckOwnerName == null && data.truckRegistrationId == null && data.truckLicensePlateNumber == null && data.truckCreatedFromDate == null && data.truckCreatedToDate == null) {
          this.loadRequest();
          this.searchTruck();
        } else {
          this.loadRequest();
          if (data.truckOwnerName) {
            this.truckRegSearch.ownerName = data.truckOwnerName;
          }
          if (data.truckRegistrationId) {
            this.truckRegSearch.truckRegistrationId = data.truckRegistrationId;
          }
          if (data.truckLicensePlateNumber) {
            this.truckRegSearch.searchLicensePlateNumber = data.truckLicensePlateNumber;
          }
          if (data.truckFilterSelected && data.truckFilterSelected != 'All') {
            this.truckRegSearch.status = data.truckFilterSelected;
          }

          if (data.truckCreatedFromDate && data.truckCreatedFromDate != '') {
            this.truckRegSearch.requestFromDate = data.truckCreatedFromDate;
          }
          if (data.truckCreatedToDate && data.truckCreatedToDate != '') {
            this.truckRegSearch.requestToDate = data.truckCreatedToDate;
          }
          this.searchTruck();
        }
        this.content.scrollToTop(0);
      }
    });
  }

  ionViewDidLoad() {
    //clear filter
    this.storage.remove('truckFilterSelected');
    this.storage.remove('truckOwnerName');
    this.storage.remove('truckRegistrationId');
    this.storage.remove('truckLicensePlateNumber');
    localStorage.setItem('truckCreatedFrom', '');
    localStorage.setItem('truckCreatedTo', '');

    this.storage.remove('truckRadioSelect');
    this.storage.remove('truckSortOrder');

    this.navBar.backButtonClick = () => {
      this.navCtrl.popTo(this.navCtrl.getByIndex(0)); // Back button press when in view mode
    };
  }


  /*Sort functionality*/
  presentSortPopover(myEvent) {
    this.isScrolled = false;
    this.isSortPopoverPresent = true;
    this.sortPopover.present({
      ev: myEvent
    });
    this.sortPopover.onDidDismiss((data) => {
      this.selectedTitle = data.sortOption ? data.sortOption : '';
      this.ascending = data.sortOrder != null ? data.sortOrder : true;
      this.asc();
      this.content.scrollToTop(0);
      this.isSortPopoverPresent = false;
    });
  }

  asc() {
    //console.log("this.selectedTitle : "+this.selectedTitle);
    if (this.selectedTitle != "") {
      if (this.selectedTitle === 'truckRegID') {
        this.searchResult = sortNumberArray(this.searchResult, "truckRegistrationId", this.ascending);
      } else if (this.selectedTitle === 'licPlateNo') {
        this.searchResult = sortArray(this.searchResult, "licensePlateNo", this.ascending);
      } else if (this.selectedTitle === 'ownerName') {
        this.searchResult = sortArray(this.searchResult, "name", this.ascending);
      } else if (this.selectedTitle === 'regDate') {
        this.searchResult = this.sortDateArray(this.searchResult, "createdDate");
      } else if (this.selectedTitle === 'status') {
        this.searchResult = sortArray(this.searchResult, "status", this.ascending);
      }

      this.lengthofmainarray = this.searchResult.length;
    }

  }

  loadInitialRequest() {
    this.createdFromDate = new Date();
    this.createdFromDate.setDate(this.createdFromDate.getDate() - 7);
    this.createdFromDate = this.createdFromDate.getFullYear().toString() + '-' + (this.createdFromDate.getMonth() + 1).toString() + '-' + this.createdFromDate.getDate().toString();
    this.createdToDate = new Date().toISOString();
    this.truckRegSearch.ownerName = '';
    this.truckRegSearch.requestFromDate = this.datepipe.transform(this.createdFromDate, 'dd/MM/yyyy');
    this.truckRegSearch.requestNo = '';
    this.truckRegSearch.requestToDate = this.datepipe.transform(this.createdToDate, 'dd/MM/yyyy');
    this.truckRegSearch.searchLicensePlateNumber = '';
    this.truckRegSearch.status = '';
    this.truckRegSearch.truckRegistrationId = null;
  }

  loadRequest() {
    //this.securityUtility.canAmend(this.securityUtility.TRUCK_REGISTRATION);
    this.truckRegSearch.ownerName = '';
    this.truckRegSearch.requestFromDate = null;
    this.truckRegSearch.requestNo = '';
    this.truckRegSearch.requestToDate = null;
    this.truckRegSearch.searchLicensePlateNumber = '';
    this.truckRegSearch.status = '';
    this.truckRegSearch.truckRegistrationId = null;
  }

  searchTruck() {
    this.trucksearchviewService.searchTruckRegistered(this.truckRegSearch)
      .subscribe(response => {
          this.truckRegSearchResultList = <TruckRegSearchResultListModel>response;
          this.searchResult = this.truckRegSearchResultList.list;
          //this.truckRegSearchResultList.list.length;
          if (this.resultCount == 0) {
            this.resultCount = this.searchResult.length;
          }
          if (this.searchResult != null && this.searchResult.length == 0) {
            const alert = this.alertCtrl.create({
              title: 'Alert',
              subTitle: 'No data for current filter',
              buttons: ['OK']
            });
            alert.present();
          } else {
            this.asc();
          }
        },
        error => {
          var errorMessage = <any>error;
          //Show error message
        });
  }


  /*sortNumberArray(array: Array<any>, args: string): Array<any> {
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
  }*/


  sortDateArray(array: Array<any>, args: string): Array<any> {
    array.sort((a: any, b: any) => {
      this.left = new Date(this.transform(a[args]));
      this.right = new Date(this.transform(b[args]));
      return this.ascending ? this.left - this.right : this.right - this.left;
    });
    return array;
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

  getStyle(s) {
    return '#808080';
  }

  getStatusIcon(s) {

    switch (s.status) {
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

//Modified to check if the user have permission to create truck
  canCreate() {
    if (this.securityUtility.canAmend(this.securityUtility.TRUCK_REGISTRATION) == true) {
      return false;
    } else {
      return true;
    }
  }

  canCancel() {
    if (this.securityUtility.canCancel(this.securityUtility.TRUCK_REGISTRATION) == true) {
      return false;
    } else {
      return true;
    }
  }

  opentrucknew() {
    this.navCtrl.push(TrucksearchPage);
  }

  editHidden(selectedTruck) {
    if (this.isAdminUser(selectedTruck) == true && selectedTruck.canAmend == true) {
      return false;
    } else if (this.canCreateBool == false) {
      if (selectedTruck.status == "Submitted") {
        return false;
      } else if (selectedTruck.status == "Pending" || selectedTruck.status == "Cancelled") {
        return true;
      } else if (selectedTruck.status == "Approved") {
        if (selectedTruck.amendRequestStatus == "Approved" || selectedTruck.amendRequestStatus == "Rejected" ||
          selectedTruck.amendRequestStatus == "Cancelled") {
          return false;
        } else {
          return true;
        }
      } else if (selectedTruck.status == "Rejected") {
        if (selectedTruck.amendRequestStatus == "Rejected") {
          return false;
        } else {
          return true;
        }
      }
    } else {
      return true;
    }
  }

  cancelHidden(selectedTruck) {
    if (this.canCancelBool == false) {
      if (selectedTruck.status == "Submitted") {
        return false;
      } else if (selectedTruck.status == "Pending" || selectedTruck.status == "Cancelled") {
        return true;
      } else if (selectedTruck.status == "Approved") {
        if (selectedTruck.amendRequestStatus == "Approved" || selectedTruck.amendRequestStatus == "Rejected" ||
          selectedTruck.amendRequestStatus == "Cancelled") {
          return false;
        } else {
          return true;
        }
      } else if (selectedTruck.status == "Rejected") {
        if (selectedTruck.amendRequestStatus == "Rejected") {
          return false;
        } else {
          return true;
        }
      }
    } else {
      return true;
    }
  }

  isAdminUser(selectedTruck) {
    if (null != selectedTruck.approver) {
      if (selectedTruck.approver == "Y") {
        return true;
      } else {
        return false;
      }
    } else if (selectedTruck.canApprove == true) {
      return true;
    } else {
      return false;
    }
  }

  hideApproveButton(s) {
    if (s.approverButton == true && s.canApprove == true) {
      return false;
    } else {
      return true;
    }
  }

  gotoapprove(s) {
    this.navCtrl.push(ExecuteactionPage, {
      workFlowId: s.wrkflwId,
      requestNo: s.truckRegRequestId,
      fromPage: "TruckSearchResult"
    });
  }

  goview(s) {
    console.log("Inside goview : ");
    this.loadTruckDetails(s.truckRegistrationId, "view");

  }

  goedit(s) {
    console.log("Inside goedit : ");
    this.loadTruckDetails(s.truckRegistrationId, "edit");
  }

  goCancelTruck(selectTruck) {
    //---ios_changes--start
    this.truckSearchbyidModel.truckRegistrationId = selectTruck.truckRegistrationId;
    let alert = this.alertCtrl.create({
      title: 'Alert',
      subTitle: 'Are you sure you want to cancel the registration?',
      //cssClass: 'search',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.trucksearchviewService.cancelTruck(this.truckSearchbyidModel)
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
        }, {
          text: 'CANCEL',
          handler: () => {
          },
        }]

    });
//---ios_changes--end

    alert.present();
  }

  loadTruckDetails(truckRegId, mode) {
    console.log("Inside loadTruckDetails : ");

    this.truckSearchbyidModel.truckRegistrationId = truckRegId;
    this.navCtrl.push(TruckdetailsPage, {
      sel_truckId: truckRegId,
      mode: mode,
      reg_aut_so_list: "",
    });
  }
}
