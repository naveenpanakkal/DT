import {Component, ViewChild} from '@angular/core';
import {Platform, AlertController, IonicPage, NavController, NavParams, PopoverController,Content} from 'ionic-angular';
import {VoyageEnquiryResultModel} from "../../shared/model/voyage/voyageenquiryresult.model";
import {VoyageServicesProvider} from "../../providers/webservices/voyageservices";
import {VoyageEnquirySearchRequestModel} from "../../shared/model/voyage/voyageenquirysearchrequest.model";
import {VoyageEnquiryResultListModel} from "../../shared/model/voyage/voyageenquiryresult-list.model";
import {VoyagesortpopoverPage} from "../voyagesortpopover/voyagesortpopover";
import {
  Ports, ServiceProviderCode, Terminal,
  VoyagefilterpopoverPage
} from "../voyagefilterpopover/voyagefilterpopover";
import {VoyagesearchdetailsPage} from "../voyagesearchdetails/voyagesearchdetails";
import {Storage} from '@ionic/storage';
import {VoyagedetailsPage} from "../voyagedetails/voyagedetails";
import {Utils} from "../../shared/utils";
import {DefinedSetRequest} from "../../shared/model/voyage/voyageenquiryinitdefinedsetrequest.model";
import {DefinedSetValue} from "../../shared/model/voyage/voyageenquiryinitdefineditem.model";
/**
 * Generated class for the VoyagesearchresultPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-voyagesearchresult',
  templateUrl: 'voyagesearchresult.html',
  providers: [VoyageEnquiryResultModel, VoyageEnquiryResultListModel, VoyageServicesProvider, VoyageEnquirySearchRequestModel,Utils]
})
export class VoyagesearchresultPage {
  searchResult: VoyageEnquiryResultModel[];
  selectedTitle: string;
  lengthofmainarray: number = 0;
  ascending: boolean = false;
  left:any;
  right:any;
  minDate: any;
  firstLoad=true;
  maxDate: any;
  selected: string="All";
  filterPopover : any;
  sortPopover : any;
  isFilterPopoverPresent : boolean;
  isSortPopoverPresent : boolean;
  sameUser : boolean;
  userClientCode : string;
  ports: Ports[]=[];
  terminals : Terminal[] = [];
  operationStatusobj: DefinedSetValue[] = [];
  tradeType: DefinedSetValue[] = [];
  duration: DefinedSetValue[] = [];
  isOpenService: boolean = false;
  @ViewChild(Content) content : Content;
  constructor(public navCtrl: NavController,
              public platform: Platform,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public voyageEnquiryResultModel: VoyageEnquiryResultListModel,
              public voyageServicesProvider: VoyageServicesProvider,
              public popoverCtrl: PopoverController,
              public voyageEnquirySearchRequestModel: VoyageEnquirySearchRequestModel,
              public definedSetRequest: DefinedSetRequest,
              private storage: Storage,public utils: Utils) {
    this.selectedTitle='rotationNumber';
    this.userClientCode = localStorage.getItem('CLIENT_CODE');
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setMonth(this.minDate.getMonth() - 3);
    this.maxDate.setMonth(this.maxDate.getMonth() + 3);
    this.minDate = this.minDate.toISOString();
    this.maxDate = this.maxDate.toISOString();
    if (null != navParams.get('isOpenService')) {
      this.isOpenService = navParams.get('isOpenService');
    } else {
      this.isOpenService = false;
    }

    this.sortPopover = this.popoverCtrl.create(VoyagesortpopoverPage, {
      radioSelect: this.selectedTitle,
      sortOrder: this.ascending
    }, {cssClass: 'casortpopover'});

    platform.ready().then(() => {
      platform.registerBackButtonAction(() => {
        if(this.isSortPopoverPresent || this.isFilterPopoverPresent) {
          if (this.filterPopover != null )
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
  ionViewDidLoad() {
    console.log('ionViewDidLoad VoyagesearchresultPage');

    /*this.storage.set('VoyageRadioSelect', "rotationNumber");
    this.storage.set('VoyageSortOrder', true);*/
    this.storage.set('voyageRadioSelect',"rotationNumber");
    this.storage.set('voyagerSortOrder', false);
    this.voyageEnquirySearchRequestModel.operationalStatusSearch = this.selected;
    this.voyageEnquirySearchRequestModel.etaFromDateSearch = this.minDate;
    this.voyageEnquirySearchRequestModel.etaToDateSearch = this.maxDate;
    this.loadInitialRequest();
  }

  loadInitialRequest() {
    this.voyageServicesProvider.voyageInit(this.definedSetRequest, this.isOpenService)
      .subscribe(response => {
          for (let i = 0; i < response.length; i++) {
            if (response[i].definedSetName == 'OPERATION_STATUS') {
              this.operationStatusobj = response[i].definedSetValues;
            }
            if (response[i].definedSetName == 'TRADE_TYPE') {
              this.tradeType = response[i].definedSetValues;
            }
            if (response[i].definedSetName == 'DURATION') {
              this.duration = response[i].definedSetValues;
            }
          }
          this.loadRequest();
        },
        error => {
          var errorMessage = <any>error;
          //Show error message
        });
  }

  loadRequest() {
    // console.log("search model"+JSON.stringify(this.voyageEnquirySearchRequestModel));
    this.voyageServicesProvider.voyageSearchLocation(new ServiceProviderCode,false, this.isOpenService)
      .subscribe(response => {
        if(this.firstLoad)
        {
          for(let i=0;i<response.spLocationListSO.length;i++)
          {
            this.voyageEnquirySearchRequestModel.portsSearch.push(response.spLocationListSO[i].spLocationCode);
            this.ports.push(new Ports(response.spLocationListSO[i].spLocationName,response.spLocationListSO[i].spLocationCode));

          }
          for(let i=0;i<this.voyageEnquirySearchRequestModel.portsSearch.length;i++)
          {
            let obj=this.voyageEnquirySearchRequestModel.portsSearch[i];
            let objList=response.spSubLocationListSO[obj];
            for(let j=0;j<objList.length;j++)
            {
              this.voyageEnquirySearchRequestModel.terminalsSearch.push(objList[j].spSubLocationCode);
              this.terminals.push(new Terminal(objList[j].spSubLocationName,objList[j].spSubLocationCode,obj));
            }
          }
          this.voyageEnquirySearchRequestModel.etaFromDateSearch = this.datetostring(this.voyageEnquirySearchRequestModel.etaFromDateSearch);
          this.voyageEnquirySearchRequestModel.etaToDateSearch = this.datetostring(this.voyageEnquirySearchRequestModel.etaToDateSearch);
          this.storage.set('voyage-filterModel', this.voyageEnquirySearchRequestModel);
          this.firstLoad=false;
        }

          this.voyageServicesProvider.voyageSearch(this.voyageEnquirySearchRequestModel, this.isOpenService)
            .subscribe(response => {
                this.voyageEnquiryResultModel = <VoyageEnquiryResultListModel>response;
                this.searchResult = this.voyageEnquiryResultModel.list;
                this.asc();

                //this.truckRegSearchResultList.list.length;
                if (this.searchResult != null && this.searchResult.length == 0) {
                  const alert = this.alertCtrl.create({
                    title: 'Alert',
                    subTitle: 'No data for current filter',
                    buttons: ['OK']
                  });
                  alert.present();
                }
              },
              error => {
                var errorMessage = <any>error;
                //Show error message
              });

        },
        error => {
          var errorMessage = <any>error;
          //Show error message
        });

  }

  presentFilterPopover(myEvent) {
    this.filterPopover = this.popoverCtrl.create(VoyagefilterpopoverPage, {
      port: this.ports,
      terminal: this.terminals,
      operationStatusobj: this.operationStatusobj,
      tradeType: this.tradeType,
      duration: this.duration,
      isOpenService: this.isOpenService
    }, {cssClass: 'cafilterpopover'});
    this.isFilterPopoverPresent = true;
    this.filterPopover.present({
      ev: myEvent
    });
    this.filterPopover.onDidDismiss((data) => {
      if (data) {
        this.voyageEnquirySearchRequestModel = data;
        this.loadRequest();
        this.content.scrollToTop(0);
        this.isFilterPopoverPresent = false;
      }
    });

  }
  /*Sort functionality*/
  presentSortPopover(myEvent) {
    this.isSortPopoverPresent = true;
    let sortOption:string;
    let sortOrder:boolean;

    this.sortPopover.present({
      ev: myEvent
    });
    this.sortPopover.onDidDismiss((data) => {
      this.selectedTitle = data.sortOption ? data.sortOption : '';
      this.ascending = data.sortOrder != null ? data.sortOrder : true;
      console.log(this.selectedTitle);
      console.log(this.ascending);
      this.asc();
      this.content.scrollToTop(0);
      this.isSortPopoverPresent = false;
    });
  }
  showdetails(selectedVoyage) {
    this.navCtrl.push(VoyagesearchdetailsPage, {
      sel_rotationNo: selectedVoyage.rotationNumber,
      sel_vesselName: selectedVoyage.vesselName,
      sel_terminals: selectedVoyage.terminals,
      sel_operationStatus: selectedVoyage.operationStatus,
      sel_clientCode: selectedVoyage.clientCode,
      sel_eta:selectedVoyage.eta,
      isOpenService: this.isOpenService
    });
  }
  viewVoyage(item,selectedVoyage)
  {
    if(selectedVoyage.clientCode == this.userClientCode) {
      this.sameUser = true;
    } else {
      this.sameUser = false;
    }
    this.navCtrl.push(VoyagedetailsPage, {
      sel_rotationNo: selectedVoyage.rotationNumber,
      sel_sameUser: this.sameUser,
      isOpenService: this.isOpenService
    });
    item.close();
  }
  asc() {
    if (this.selectedTitle != "") {
      if(this.selectedTitle=="eta")
      {
        this.searchResult = this.sortDateArray(this.searchResult, this.selectedTitle);
      }
      else if(this.selectedTitle=="rotationNumber")
      {
        this.searchResult = this.sortNumberArray(this.searchResult, this.selectedTitle);
      }
      else {
        this.searchResult = this.sortArray(this.searchResult, this.selectedTitle);
      }

    }
    this.lengthofmainarray = this.searchResult.length;
  }
  sortArray(array: Array<any>, args: string): Array<any> {
    let direction = this.ascending ? 1 : -1;
    array.sort((a: any, b: any) => {

      if(null == a[args]) {
        a[args] = "";
      }
      if(null == b[args]) {
        b[args] = "";
      }
      if (a[args].toString().toLowerCase() < b[args].toString().toLowerCase()) {
        return -1 * direction;
      } else if (a[args].toString().toLowerCase() > b[args].toString().toLowerCase()) {
        return 1 * direction;
      } else {
        return 0;
      }
    });
    return array;
  }
  sortDateArray(array: Array<any>, args: string): Array<any> {
    array.sort((a: any, b: any) => {
      this.left = new Date(this.transformwithTime(a[args]));
      this.right = new Date(this.transformwithTime(b[args]));
      return this.ascending ? this.left - this.right : this.right - this.left;
    });
    return array;
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
  datetostring(datestring) {
    if (datestring != null) {
      let month: number;
      let monthstr: string;
      let day: string;
      let date: Date;
      date = new Date(datestring);
      month = date.getMonth();
      month++;
      day = date.getDate().toString();
      if (day.length < 2) {
        day = "0" + day;
      }
      if (month < 10) {
        monthstr = "0" + month.toString();
      }
      else {
        monthstr = month.toString();
      }
      return day + "/" + monthstr + "/" + date.getFullYear();
    }
    else {
      return null;
    }
  }
}
