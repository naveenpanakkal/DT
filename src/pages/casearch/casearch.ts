import {Component, ViewChild} from '@angular/core';
import {AlertController, Content, IonicPage, NavController, NavParams} from 'ionic-angular';
import {CacreatePage} from "../cacreate/cacreate";
import {CasearchresultPage} from "../casearchresult/casearchresult";
import {DatePipe} from "@angular/common";
import {Utils} from "../../shared/utils";
import {Keyboard} from "@ionic-native/keyboard";
import {ContainerAcceptanceModel} from "../../shared/model/containeracceptance/containeracceptance.model";
import {ContaineracceptanceProvider} from "../../providers/webservices/containeracceptanceservices";
import {DefinedSetReqModel} from "../../shared/model/definedset/definedsetreq.model";
import {DefinedsetresListModel} from "../../shared/model/definedset/definedsetres-list.model";
import {CommonservicesProvider} from "../../providers/webservices/commonservices";
import {DefinedSetResModel} from "../../shared/model/definedset/definedsetres.model";
import {RotationNoSearchResultModel} from "../../shared/model/containeracceptance/rotationnosearch/rotationnosearchresult.model";
import {RotationNoSearchReqModel} from "../../shared/model/containeracceptance/rotationnosearch/rotationnosearchreq.model";
import {RotationNoSearchResultList} from "../../shared/model/containeracceptance/rotationnosearch/rotationnosearchresultlist.model";
import {CaserachrequestModel} from "../../shared/model/containeracceptance/searchresult/caserachrequest.model";
import {CaNominationsModel} from "../../shared/model/containeracceptance/canominations.model";
import {SecurityUtility} from "../../shared/securityutility";

/**
 * Generated class for the CasearchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-casearch',
  templateUrl: 'casearch.html',
  providers: [Utils, CaserachrequestModel, SecurityUtility]
})

export class CasearchPage {

  canoPattern: string = "^[0-9]{0,18}$";
  linerPattern: string = "^[a-z0-9A-Z]{0,30}$";
  public definedSetListModel: DefinedsetresListModel[];
  public rotationNoRespArray: RotationNoSearchResultModel[];
  public clientcodeRespArray: CaNominationsModel[];
  createdFromDate: any;
  createdToDate: any;
  dateFormat: string = 'DD/MM/YYYY';
  maxvalue: any;
  locationList: any[] = [];
  spNameList: any[] = [];
  showRotationNo: boolean = false;
  showClientCode: boolean = false;
  verifyValidRotationNo: boolean = false;
  verifyValidClientCode: boolean = false;
  locationModel: ContainerAcceptanceModel = new ContainerAcceptanceModel();
  spNameModel: ContainerAcceptanceModel = new ContainerAcceptanceModel();
  acceptanceTypeList: DefinedSetResModel[] = [];
  statusList: DefinedSetResModel[] = [];
  tradeTypeList: DefinedSetResModel[] = [];
  clientList: DefinedSetResModel[] = [];
  filterRotationArray: any;
  filterClientArray: any;
  tradetypehidden: boolean = true;
  clientcodehidden: boolean = true;
  alertMsg: string;
  attensiontitle:string;
  alertInvalidRotationno:string;
  alertInvalidClientCode:string;
  alertButtonOk:string;
  alertButtonDismiss:string;
  alerttitle:string;
  containerAcceptanceNo : any;
  loc: any ;
  spname: any ;
  acceptanceType: any ;
  tradeType: any ;
  linerBookingNumber: any ;
  rotationNumber: any ;
  clientType: any ;
  clientTypeCode: any;
  statusSelected: any ;
  linerbookingErrormsg : string;

  disableSearch: boolean = false;
  @ViewChild(Content) content: Content;
  constructor(public keyboard: Keyboard,
              public navCtrl: NavController, public navParams: NavParams,
              public datepipe: DatePipe,
              private caProvider: ContaineracceptanceProvider,
              private commonServices: CommonservicesProvider,
              public utils: Utils,
              private alertCtrl: AlertController,
              public caSearchReqModel: CaserachrequestModel,
              public securityUtility: SecurityUtility) {

    this.maxvalue = new Date().toISOString();
    this.attensiontitle=this.utils.getLocaleString("ca_attention");
    this.alertInvalidRotationno=this.utils.getLocaleString("invalid_rotation_number");
    this.alertInvalidClientCode=this.utils.getLocaleString("client_code_invalid");
    this.alertButtonOk = this.utils.getLocaleString("ca_ok_text");
    this.alertButtonDismiss = this.utils.getLocaleString("ca_dismiss_txt");
    this.alerttitle = this.utils.getLocaleString("ca_alert");
    this.caSearchReqModel = this.navParams.get('filter');
    this.locationList = this.navParams.get('locationList');
    this.acceptanceTypeList = this.navParams.get('acceptanceTypeList');
    this.tradeTypeList = this.navParams.get('tradeTypeList');
    this.clientList = this.navParams.get('clientList');
    this.statusList = this.navParams.get('statusList');

    this.containerAcceptanceNo =  this.caSearchReqModel.containerAcceptanceNoSearch;
    this.loc =  this.caSearchReqModel.locationSearch;
    this.spname = this.caSearchReqModel.serviceProviderSearch;
    this.acceptanceType = this.caSearchReqModel.acceptanceSearch;
    this.tradeType = this.caSearchReqModel.tradeTypeSearch;
    this.linerBookingNumber = this.caSearchReqModel.linerBookingNumberSearch;
    this.rotationNumber = this.caSearchReqModel.rotationNumberSearch;
    this.clientType =  this.caSearchReqModel.clientTypeSearch;
    this.clientTypeCode = this.caSearchReqModel.clientTypeCode;
    this.statusSelected = this.caSearchReqModel.statusSearch;

    if(this.linerBookingNumber == null) {
      this.linerBookingNumber= "";
    }


    if(this.loc == null || this.loc == "") {
      if(this.locationList && this.locationList.length > 0) {
        this.loc = this.locationList[0];
      }
    }
    else {
      this.getServiceProviderName();
    }

    if(this.spname == null || this.spname == "") {
      if(this.spNameList && this.spNameList.length > 0) {
        this.spname = this.spNameList[0];
      }
      else {
        this.spNameList[0] = "--Select--";
        this.spname = this.spNameList[0];
      }
    }

    if(this.tradeType == null || this.tradeType == "") {
      if(this.tradeTypeList && this.tradeTypeList.length > 0) {
        this.tradeType = this.tradeTypeList[0].definedSetValueCode;
      }
    }

    if(this.acceptanceType == null || this.acceptanceType == "") {
      if(this.acceptanceTypeList && this.acceptanceTypeList.length > 0) {
        this.acceptanceType = this.acceptanceTypeList[0].definedSetValueCode;
      }
    }
    else if(this.acceptanceType === 'Export Full' || this.acceptanceType === 'Export Empty') {
      this.tradetypehidden = false;
    }
    else {
      this.tradetypehidden = true;
    }

    if(this.clientType == null || this.clientType == "") {
      if(this.clientList && this.clientList.length > 0) {
        this.clientType = this.clientList[0].definedSetValueCode;
      }
    }
    else {
      this.clientcodehidden =false;
    }


    if(this.statusSelected == null) {
      if(this.statusList && this.statusList.length > 0) {
        this.statusSelected = this.statusList[0].definedSetValueCode;
      }
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CasearchPage');
  }
  ionViewWillEnter() {
      if (null == localStorage.getItem('caCreatedFrom') || ("" == localStorage.getItem('caCreatedFrom'))) {
        this.createdFromDate = new Date();
        this.createdFromDate.setDate(this.createdFromDate.getDate() - 7);
        this.createdFromDate = this.createdFromDate.toISOString();
      }
      else {
        this.createdFromDate=  localStorage.getItem('caCreatedFrom');
        this.createdFromDate = new Date(this.createdFromDate);
        this.createdFromDate = this.datepipe.transform(this.createdFromDate, 'yyyy-MM-dd');
      }
      if (null == localStorage.getItem('caCreatedTo') || ("" == localStorage.getItem('caCreatedTo'))) {
        this.createdToDate = new Date().toISOString();
      }
      else {
        this.createdToDate=localStorage.getItem('caCreatedTo');
        this.createdToDate = new Date(this.createdToDate);
        this.createdToDate = this.datepipe.transform(this.createdToDate, 'yyyy-MM-dd');
      }
    this.content.scrollToTop(0);
  }



  getServiceProviderName() {
    let listAllspName: Array<any> = [];
    let spModel = new ContainerAcceptanceModel();
    if(this.loc == "--Select--") {
      spModel.location = "";
    }
    else {
      spModel.location = this.loc;
    }
    spModel.action = "SEARCH";
    this.caProvider.getSpNameMaster(spModel)
      .subscribe(response => {
          this.spNameModel = <ContainerAcceptanceModel>response;
          for (let i = 0; i < this.spNameModel.spNameMasterList.length; i++) {
            if (this.spNameModel.spNameMasterList[i].spSubLocationName.trim().length > 0) {
              listAllspName.push(this.spNameModel.spNameMasterList[i].spSubLocationName);
            }
          }
          this.spNameList = Array.from(new Set(listAllspName));
          if(this.spNameList && this.spNameList.length > 0) {
            this.spNameList.unshift("--Select--");
          }
          else {
            this.spNameList[0] = "--Select--";
          }
        },
        error => {
          //Show error message
        });

    if(this.spNameList && this.spNameList.length > 0) {
      this.spname = this.spNameList[0];
    }
  }

  onSearchClick() {
    this.navCtrl.push(CasearchresultPage);
  }

  openCACreate() {
    this.navCtrl.push(CacreatePage);
  }

  hideCreate(): boolean {
    if (this.securityUtility.canCreate(this.securityUtility.CONTAINER_ACCEPTANCE) == true) {
      return true;
    } else {
      return false;
    }
  }

  showCAresults() {
    if ((this.validate(this.containerAcceptanceNo, this.canoPattern))) {
      this.presentAlert(this.attensiontitle, "Invalid Container Acceptance No");
      return;
    }
    if ((this.validate(this.linerBookingNumber, this.linerPattern))) {
      this.presentAlert(this.attensiontitle, "Invalid Liner Booking Number");
      return;
    }
    if ((this.validate(this.rotationNumber,'^[0-9]{0,18}$'))) {
      this.presentAlert(this.attensiontitle, this.alertInvalidRotationno);
      return;
    }

    this.searchCA();
   /* if (this.rotationNumber && this.rotationNumber.length > 0 && this.verifyValidRotationNo) {
      let rotationNoModel = new RotationNoSearchReqModel();
      rotationNoModel.location = this.caSearchReqModel.locationSearch;
      rotationNoModel.serviceProvider = this.caSearchReqModel.serviceProviderSearch;
      rotationNoModel.rotationNo = this.rotationNumber;
      this.caProvider.verifyRotationNumber(rotationNoModel)
        .subscribe(response => {
            let rotationNoRes = <RotationNoSearchResultModel>response;
            if (rotationNoRes.vesselName != null && rotationNoRes.vesselName != "" &&
              rotationNoRes.operationalStatus.toUpperCase() != "SAILED") {
              this.searchCA();
            }
            else {
              this.rotationNumber = '';
              this.presentAlert(this.attensiontitle, this.alertInvalidRotationno);
            }
          },
          error => {
          });
    }
    else
    {
      this.searchCA();
    }*/
  }
  searchCA()
  {
    let fromDate: Date = new Date(this.createdFromDate);
    let toDate: Date = new Date(this.createdToDate);
    if (fromDate > toDate) {
      this.showAlert();
    }
    else {
      if ( this.linerBookingNumber.length == 0 ||  this.linerBookingNumber.length >= 3) {
        let varcreatedFromDate = this.datepipe.transform(this.createdFromDate, 'dd/MM/yyyy');
        let varcreatedToDate = this.datepipe.transform(this.createdToDate, 'dd/MM/yyyy');
        this.caSearchReqModel.fromDateSearch = varcreatedFromDate;
        this.caSearchReqModel.toDateSearch = varcreatedToDate;
        if( this.createdFromDate) {
          localStorage.setItem('caCreatedFrom', this.createdFromDate);
        }
        else {
          localStorage.setItem('caCreatedFrom', '');
        }

        if(this.createdToDate){
          localStorage.setItem('caCreatedTo', this.createdToDate);
        }
        else {
          localStorage.setItem('caCreatedTo', '');
        }

        if(this.loc == "--Select--") {
          this.caSearchReqModel.locationSearch = "";
        }
        else {
          this.caSearchReqModel.locationSearch = this.loc;
        }
        if(this.spname == "--Select--") {
          this.caSearchReqModel.serviceProviderSearch = "";
        }
        else {
          this.caSearchReqModel.serviceProviderSearch = this.spname;
        }
        this.caSearchReqModel.containerAcceptanceNoSearch = this.containerAcceptanceNo;
        this.caSearchReqModel.acceptanceSearch = this.acceptanceType;
        this.caSearchReqModel.tradeTypeSearch = this.tradeType;
        this.caSearchReqModel.rotationNumberSearch =  this.rotationNumber;
        this.caSearchReqModel.linerBookingNumberSearch = this.linerBookingNumber;
        this.caSearchReqModel.clientTypeSearch =  this.clientType;
        this.caSearchReqModel.clientTypeCode = this.clientTypeCode;
        this.caSearchReqModel.statusSearch = this.statusSelected;

        this.navCtrl.pop()

      }
    }
  }

  getRotationNumberMaster() {
    this.verifyValidRotationNo = true;

    this.rotationNoRespArray = [];
    let rotationNoSearchReq = new RotationNoSearchReqModel();
    rotationNoSearchReq.location = this.caSearchReqModel.locationSearch;
    rotationNoSearchReq.screen = "SEARCH";
    rotationNoSearchReq.serviceProvider = this.caSearchReqModel.serviceProviderSearch;

    this.caProvider.getRotationNumberMaster(rotationNoSearchReq)
      .subscribe(responseList => {
          let rotationNoRespList = <RotationNoSearchResultList>responseList;
          this.rotationNoRespArray = rotationNoRespList.list;
          if(this.verifyValidRotationNo) {
            this.getRotationNo(null);
          }
        },
        error => {

        })
  }


  getRotationNo(ev: any) {
    this.filterRotationArray = this.rotationNoRespArray;
    // set val to the value of the searchbar
    let val;
    if (ev == null) {
      val = this.rotationNumber;
    } else {
      val = ev.target.value;
    }
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      // Filter the items
      this.filterRotationArray = this.filterRotationArray.filter((item) => {
        if (item.rotationNo.startsWith(val)) {
          this.showRotationNo = true;
        }
        return (item.rotationNo.startsWith(val));
      });
    } else {
      // hide the results when the query is empty
      this.showRotationNo = false;
    }
  }

  hideRotation() {
    setTimeout(() => {
      if(this.validate(this.rotationNumber, '^[0-9]{0,18}$')) {
        return;
      }
     /* if (this.rotationNumber && this.rotationNumber.length > 0 && this.verifyValidRotationNo) {
        let rotationNoModel = new RotationNoSearchReqModel();
        rotationNoModel.location = this.caSearchReqModel.locationSearch;
        rotationNoModel.serviceProvider = this.caSearchReqModel.serviceProviderSearch;
        rotationNoModel.rotationNo = this.rotationNumber;
        this.caProvider.verifyRotationNumber(rotationNoModel)
          .subscribe(response => {
              let rotationNoRes = <RotationNoSearchResultModel>response;
              if (rotationNoRes.vesselName != null && rotationNoRes.vesselName != "" &&
                rotationNoRes.operationalStatus.toUpperCase() != "SAILED") {
              }
              else {
                this.rotationNumber = '';
                // this.presentAlert(this.attensiontitle, this.alertInvalidRotationno);
              }
            },
            error => {

            });
      }*/
      this.verifyValidRotationNo = false;
      this.showRotationNo = false;
    }, 500);
  }

  getClientCode(ev: any) {
    this.filterClientArray = this.clientcodeRespArray;
    // set val to the value of the searchbar
    let val;
    if (ev == null) {
      val = this.clientTypeCode;
    } else {
      val = ev.target.value;
    }
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      // Filter the items
      this.filterClientArray = this.filterClientArray.filter((item) => {
        if (item.companyCode.toString().toLowerCase().startsWith(val.toString().toLowerCase())) {
          this.showClientCode = true;
        }
        return (item.companyCode.toString().toLowerCase().startsWith(val.toString().toLowerCase()));
      });
    } else {
      // hide the results when the query is empty
      this.showClientCode = false;
    }
  }

  getClientCodeMaster() {
    this.verifyValidClientCode = true;
    this.clientcodeRespArray = [];

    let clientCodeReqmodel = new CaNominationsModel();
    clientCodeReqmodel.clientType = this.clientType;
    clientCodeReqmodel.companyCode = '';
    clientCodeReqmodel.companyName = '';

    this.caProvider.getClientCode(clientCodeReqmodel).subscribe(
      response => {
        this.clientcodeRespArray = <CaNominationsModel[]>response.list;
        if( this.verifyValidClientCode) {
          this.getClientCode(null);
        }
      },
      error => {
      }
    );
  }

  hideClientCode() {
    setTimeout(() => {
      if(this.validate(this.clientTypeCode, '^[a-z0-9A-Z]{0,30}$')) {
        return;
      }
      this.showClientCode = false;
      /*this.disableSearch = true;
      if (this.clientTypeCode.length != 0) {
        if (this.clientTypeCode && this.clientTypeCode.length > 0 && this.verifyValidClientCode) {
          let clientcodeModel = new CaNominationsModel();
          let searchMatch: CaNominationsModel = new CaNominationsModel();
          clientcodeModel.location = this.caSearchReqModel.locationSearch;
          clientcodeModel.clientType = this.clientType;
          this.caProvider.getClientCode(clientcodeModel)
            .subscribe(response => {
                let clientVerificationResponseArray = <CaNominationsModel[]>response.list;
                if (clientVerificationResponseArray.length == 0) {
                  this.presentAlert(this.attensiontitle, this.alertInvalidClientCode);
                } else {
                  searchMatch = clientVerificationResponseArray.find(element =>
                    element.companyCode.toString().toLowerCase() ==
                    this.clientTypeCode.toString().toLowerCase())
                  if (!searchMatch) {
                    this.clientTypeCode = '';
                    this.presentAlert(this.attensiontitle, this.alertInvalidClientCode);
                  } else {
                    this.clientTypeCode = searchMatch.clientType;
                  }
                }
                this.disableSearch = false;
              },
              error => {
                this.disableSearch = false;
              });
        }
        this.verifyValidClientCode = false;
        this.showClientCode = false;
      }*/
    }, 500);
  }

  presentAlert(title: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: [this.alertButtonDismiss]
    });
    alert.present();
  }

  selectRotation(item: any) {
    this.verifyValidRotationNo = false;
    this.showRotationNo = false;
    this.rotationNumber = item.rotationNo;
  }

  selectClientCode(item: any) {
    this.verifyValidClientCode = false;
    this.showClientCode = false;
    this.clientTypeCode = item.companyCode;
  }

  acceptanceTypeChange(selectedValue: any) {
    if (selectedValue === 'Export Full' || selectedValue === 'Export Empty') {
      this.tradetypehidden = false;
      this.tradeType = this.tradeTypeList[0].definedSetValueCode;
    }
    else if (selectedValue === 'Storage Full' || selectedValue === 'Storage Empty') {
      this.tradetypehidden = true;
      this.tradeType = "";
    }
    else {
      this.tradetypehidden = true;
      this.tradeType = "";
    }
  }

  clientTypeChange(selectedValue: any) {
    if (selectedValue === '' || selectedValue === 'null' || selectedValue === this.clientList[0].definedSetValueIntMessage) {
      this.clientcodehidden = true;
    }
    else {
      this.clientcodehidden = false;
    }
    this.clientTypeCode = "";
  }

  reset() {
    this.containerAcceptanceNo = "";
    if(this.locationList && this.locationList.length > 0) {
      this.loc = this.locationList[0];
    }
    if(this.spNameList && this.spNameList.length > 0) {
      this.spname = this.spNameList[0];
    }

    if(this.acceptanceTypeList && this.acceptanceTypeList.length > 0) {
      this.acceptanceType = this.acceptanceTypeList[0].definedSetValueCode;
    }
    if(this.tradeTypeList && this.tradeTypeList.length > 0) {
      this.tradeType= this.tradeTypeList[0].definedSetValueCode;
    }
    this.linerBookingNumber = "";
    this.rotationNumber = "";
    if(this.clientList && this.clientList.length > 0) {
      this.clientType = this.clientList[0].definedSetValueCode;
    }
    this.clientTypeCode = "";
    if(this.statusList && this.statusList.length > 0) {
      this.statusSelected= this.statusList[0].definedSetValueCode;
    }
    this.createdFromDate = new Date();
    this.createdFromDate.setDate(this.createdFromDate.getDate() - 7);
    this.createdFromDate = this.datepipe.transform(this.createdFromDate, 'yyyy-MM-dd');
    this.createdToDate = new Date().toISOString();
    this.createdToDate = this.datepipe.transform(this.createdToDate, 'yyyy-MM-dd');
  }

  onLocationChanged() {
    this.getServiceProviderName();
  }

  keyboardClose() {
    this.keyboard.close();
  }

  keyUpValidate(e, format, model) {
    this.utils.keyUpValidate(e, format);
    if (model == 'caacceptanceno') {
      this.containerAcceptanceNo = e.target.value;
    }
    else if (model == 'linerbookingnumber') {
      this.linerBookingNumber = e.target.value;
    }
    else if (model == 'rotateNumber') {
      this.rotationNumber = e.target.value;
    }
    else if (model == 'clientcode') {
      this.clientTypeCode = e.target.value;
    }
  }

  showAlert() {

    this.alertMsg = this.utils.getLocaleString("cafilteralert");
    const alert = this.alertCtrl.create({
      title: this.alerttitle,
      message: this.alertMsg,
      buttons: [
        {
          text: this.alertButtonOk,
          handler: () => {
            alert.dismiss();
          }
        }
      ]
    });
    alert.present();
  }

  linerbookingValid() {
    if (this.linerBookingNumber && this.linerBookingNumber.length == 0) {
      return false;
    }
    else if (this.linerBookingNumber && this.linerBookingNumber.length < 3) {
      this.linerbookingErrormsg = this.utils.getLocaleString("enter_3_char");
      return true;
    }
    else {
      if(this.validate(this.linerBookingNumber,this.linerPattern)) {
        this.linerbookingErrormsg = this.utils.getLocaleString("invalid_characters")
        return true;
      }
      else {
        return false;
      }
    }
  }


  validate(model, format) {
    if ( model != null && model.length > 0) {
      let pattern = new RegExp(format);
      try {
        if (pattern.test(model)) {
          return false;
        }
        else {
          return true;
        }
      } catch (ex) {
        console.log(ex);
      }
    }
    else {
      return false;
    }

  }
}
