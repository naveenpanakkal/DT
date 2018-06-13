import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavController, Navbar, NavParams, Alert, Platform} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Keyboard} from "@ionic-native/keyboard";
import {TranslateService} from "@ngx-translate/core";
import {ValidationService} from "../../shared/validation.service";
import {CSHSearchReqModel} from "../../shared/model/csh/cshsearchreq.model";
import {Utils} from "../../shared/utils";
import {DatePipe} from "@angular/common";
import {ContainerDetailsModel} from "../../shared/model/containeracceptance/containerdetails.model";
import {CSHRotationMasterModel} from "../../shared/model/csh/cshrotationmaster.model";
import {CshServiceProvider} from "../../providers/webservices/cshservice";
import {CSHRotationMasterReqModel} from "../../shared/model/csh/cshrotationmasterreq.model";
import {CSHRotationMasterListModel} from "../../shared/model/csh/cshrotationmaster-list.model";
/**
 * Generated class for the CshfilterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-cshfilter',
  templateUrl: 'cshfilter.html',
  providers:[Utils,CSHRotationMasterModel,CshServiceProvider,CSHRotationMasterReqModel,
    CSHRotationMasterListModel]
})
export class CshfilterPage {
  @ViewChild('navbar') navBar: Navbar;

  groupOne: FormGroup;
  disableControls: boolean;
  cshRequestNo:any;
  cshRotationNo:any;
  cshVesselName:any;
  cshContainerNo:any;
  alert:Alert;
  cshstatus:any;
  cshFromDate:any;
  cshToDate:any;
  cshSearchReqModal: CSHSearchReqModel;
  attenionHeadding: string;
  lessFromDate: string;
  status : string;
  dateFormat: string = 'DD/MM/YYYY';
  vesselNamePattern: string = "^[a-z0-9A-Z ]*$";
  containerPattern: string = "^[a-zA-Z0-9]{10,11}$";
  invalidVessel:boolean = false;
  etaValidate: boolean = false;
  previousContainerNo: string = '';
  currDate: string = new Date().toISOString();
  isError:boolean=false;
  filterRotationArray:any;
  searchdetails: CSHRotationMasterModel[];
  searchbyRotation: CSHRotationMasterModel[];
  showRotationNo:boolean;
  prevRotation:string;
  alertHeadding: string;
  isuserInput:boolean=true;
  rotationInValid:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public keyboard: Keyboard,public translate: TranslateService,
              public formBuilder: FormBuilder,public  utils:Utils,public alertCtrl :AlertController,public datepipe: DatePipe,
              public platform: Platform,public cshServiceProvider: CshServiceProvider,
              private cshRotationMasterReq:CSHRotationMasterReqModel,
              private cshRotationMasterListModel:CSHRotationMasterListModel) {
    translate.setDefaultLang('en');
    translate.use('en');
    this.groupOne = formBuilder.group({
      cshRequestNo: ['', Validators.compose([Validators.minLength(1),Validators.maxLength(18),ValidationService.numberValidate])],
      rotationnumber: ['', Validators.compose([Validators.minLength(1),Validators.maxLength(18),ValidationService.numberValidate])],
      vesselname: ['',Validators.compose([Validators.minLength(3),Validators.maxLength(255),Validators.pattern(this.vesselNamePattern)])],
      cshContainerNo: ['',Validators.compose([Validators.minLength(10),Validators.maxLength(11),Validators.pattern(this.containerPattern)])],
      cshFromDate: ['', Validators.compose([Validators.required])],
      cshToDate: ['', Validators.compose([Validators.required])],
    });

    this.cshSearchReqModal = this.navParams.get("Request");
    this.cshRequestNo = this.cshSearchReqModal.cshNoSearch;
    this.cshRequestNoChange();
    this.cshRotationNo = this.cshSearchReqModal.rotationNumberSearch;
    this.cshVesselName = this.cshSearchReqModal.vesselNameSearch;
    this.cshContainerNo = this.cshSearchReqModal.containerNoSearch;
    // this.cshFromDate = this.cshSearchReqModal.createdFrmDate;
    // this.cshToDate = this.cshSearchReqModal.createdToDate;

    if (null != this.cshSearchReqModal.createdFrmDate && this.cshSearchReqModal.createdFrmDate != "") {
      this.cshFromDate = this.parsedate(this.cshSearchReqModal.createdFrmDate);
    }if (null != this.cshSearchReqModal.createdToDate && this.cshSearchReqModal.createdToDate != "") {
      this.cshToDate = this.parsedate(this.cshSearchReqModal.createdToDate);
    }
    this.alertHeadding = this.utils.getLocaleString("alert");
  }

  ionViewWillEnter(){
    if(!this.cshSearchReqModal.berthBookingStatus) {
      this.cshstatus = this.utils.getLocaleString("cshAll");
    } else {
      this.cshstatus = this.cshSearchReqModal.berthBookingStatus;
   }
  }

  cshRequestNoChange() {
    if (null != this.cshRequestNo && this.cshRequestNo.length > 0) {
      this.disableControls = true;
    } else {
      this.disableControls = false;
    }
  }

  reset() {
    this.cshRequestNo = "";
    this.cshRotationNo = "";
    this.cshVesselName = "";
    this.cshContainerNo = "";
    this.cshFromDate = new Date();
    this.cshToDate = new Date();
    this.cshFromDate.setDate(this.cshFromDate.getDate() - 7);
    this.cshFromDate = this.datepipe.transform(this.cshFromDate, 'dd/MM/yyyy');
    this.cshFromDate = this.parsedate(this.cshFromDate);
    this.cshToDate = this.datepipe.transform(new Date, 'dd/MM/yyyy');
    this.cshToDate = this.parsedate(this.cshToDate);
    this.cshstatus = this.utils.getLocaleString("All_caps");
    this.isError =false;

    this.cshRequestNoChange();
  }

  keyboardClose() {
    this.keyboard.close();
  }

  keyUpValidate(e, format, model) {
    this.utils.keyUpValidate(e, format);
    if (model == 'rotationNumber') {
      this.cshRotationNo = e.target.value;
    }else if (model == 'cshRequestNo') {
      this.cshRequestNo = e.target.value;
    }else if (model == 'cshContainerNo') {

      let formatLetter = /^[A-Za-z]*$/i;
      let formatDigit = /^[0-9]*$/i;
      let firstSplitWord: string = '';
      let secondSplitWord: string = '';
      if (this.cshContainerNo.length <= 4) {
        firstSplitWord = e.target.value.toString().substr(0, e.target.value.length);
        if (formatLetter.test(firstSplitWord)) {
          this.previousContainerNo = e.target.value.toUpperCase();
          this.cshContainerNo = e.target.value.toUpperCase();
        } else {
          this.cshContainerNo = this.previousContainerNo;
        }
      } else {
        firstSplitWord = e.target.value.toString().substr(0, 4);
        secondSplitWord = e.target.value.toString().substr(4, e.target.value.length - 1);
        if (/*formatLetter.test(firstSplitWord) &&*/ formatDigit.test(secondSplitWord)) {
          this.previousContainerNo = e.target.value.toUpperCase();
          this.cshContainerNo = e.target.value.toUpperCase();
        } else {
          this.cshContainerNo = this.previousContainerNo;
        }
      }
    }
  }

  onPaste(e: any, ) {

    // Do stuff
    setTimeout(() => {
      this.cshContainerNo = this.cshContainerNo.toUpperCase();
      this.validateContainer();
    });
    // Then clear pasted content from the input
  }
  getRotationNo(ev: any) {
    this.filterRotationArray = this.searchdetails;
    // set val to the value of the searchbar
    let val;
    if (ev == null) {
      val = this.cshRotationNo;
    } else {
      val = ev.target.value;
    }
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      // Filter the items
      this.filterRotationArray = this.filterRotationArray.filter((item) => {
        if (item.rotationNumber.toString().includes(val)) {
          this.showRotationNo = true;
        }
        return (item.rotationNumber.toString().includes(val));
      });
    } else {
      // hide the results when the query is empty
      this.showRotationNo = false;
    }
  }
  searchRotationMaster(){
    this.cshRotationMasterReq.etaFromDate="";
    this.cshRotationMasterReq.etaToDate="";
    this.cshRotationMasterReq.rotationNumber="";
    this.cshRotationMasterReq.vesselName="";
    this.cshRotationMasterReq.voyageNo="";
    this.cshRotationMasterReq.isBlurSrch="";
    this.searchdetails = new Array<CSHRotationMasterModel>();
    this.cshServiceProvider.getRotationMasterData(this.cshRotationMasterReq)
      .subscribe(response => {
          this.cshRotationMasterListModel = <CSHRotationMasterListModel>response;
          this.searchdetails = this.cshRotationMasterListModel.list;
          this.getRotationNo(null)
        },
        error => {
          var errorMessage = <any>error;
        });

  }
  checkRotation(){
    if(this.prevRotation!= this.cshRotationNo){
      if(null != this.cshRotationNo && this.cshRotationNo.toString().length <= 18) {
        if(this.cshRotationNo.toString().match(/^[0-9]{0,18}$/)) {
          this.rotationInValid = false;
        }
      }
      // if(null != this.cshRotationNo && this.cshRotationNo.toString().length == 0) {
      //   this.flag = 1;
      //   this.alertobj1 = null
      // }
    }
  }
  selectRotationNo(item: any){
    setTimeout(() => {
      if(null == this.cshRotationNo || this.cshRotationNo.toString().match(/^[0-9]{0,18}$/)) {
        this.rotationInValid = false;
        this.prevRotation=this.cshRotationNo;
        this.showRotationNo = false;
        this.cshRotationMasterReq.rotationNumber=this.cshRotationNo;
        if(this.isuserInput){
          this.cshRotationMasterReq.isBlurSrch="Y";
        }
        this.searchbyRotation = new Array<CSHRotationMasterModel>();
        if(this.cshRotationNo!=null && this.cshRotationNo!="" && this.cshRotationNo != 'undefined'){
          this.cshServiceProvider.getRotationMasterData(this.cshRotationMasterReq)
            .subscribe(response => {
                this.cshRotationMasterListModel = <CSHRotationMasterListModel>response;
                if(this.cshRotationMasterListModel.list.length==0){
                  this.cshRotationNo=null;
                  this.showRotationNo = false;
                  this.presentAlert(this.alertHeadding,this.utils.getLocaleString("invalid_rotation_number"));
                }else{
                  this.searchbyRotation = this.cshRotationMasterListModel.list;
                  this.showRotationNo = false;
                }
              },
              error => {
                var errorMessage = <any>error;
              });
        }
        this.isuserInput=true;
      }else
      {
        this.rotationInValid = true;
        this.cshRotationNo = "";
        this.presentAlert(this.alertHeadding,this.utils.getLocaleString("invalid_rotation_number"));
        return;
      }
    }, 500);
  }
  setRotationNumber(item: any) {
    this.cshRotationNo = item.rotationNumber;
    this.isuserInput=false;
  }
  validateContainer() {
    if (this.validate(this.cshContainerNo, '^[A-Z]{4}[0-9]{6,7}$')) {
      this.cshContainerNo = "";
      this.presentAlert("Attention", "Invalid Container Number");
      return;
    }
  }
  onBlurValidation(ev,pattern,modelVariable) {
    if (ev.value.length != 0) {
      if (this.validate(modelVariable, pattern)) {
        ev.value = "";
        let messageText = 'Invalid Input';
        if (ev.placeholder) {
          messageText = 'Invalid ' + ev.placeholder;
        }
        this.presentAlert("Attention", messageText);
        return;

      }
    }
  }
  vesselValidation(ev,minvalue, maxvalue) {
    if (ev.value.length != 0) {
      if (ev.value.length < 3) {
        ev.value = "";
        let messageText = 'Please enter at least 3 characters';
        this.presentAlert("Attention", messageText);
        return;
      }
      else if (ev.value.length > 255) {
        let messageText = 'Please enter a valid Vessel Name (max 255)';
        this.presentAlert("Attention", messageText);
        return;

      }
    }
  }

  validateFormat(format: string, item: string) {
    if(item == 'vesselName') {
      if(null == this.cshVesselName) {
        this.cshVesselName = "";
        this.invalidVessel = true;
        //this.presentAlert("ATTENTION", 'Vessel Name is Invalid.');
        return;
      } else if(this.validate(this.cshVesselName, format)) {
        //this.cshVesselName = "";
        this.invalidVessel = true;
        //this.presentAlert("ATTENTION", 'Vessel Name is Invalid.');
        return;
      }
    }
    this.invalidVessel = false;
  }
  validate(model, format) {
    if(model!=null && model.length>0)
    {
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

  showCshFilterResult() {
    if(!this.disableSerach()) {
        this.attenionHeadding = this.utils.getLocaleString("attention");
        this.lessFromDate = this.utils.getLocaleString("CSH_created_less_from_date");
        this.etaValidate = false;
        let etaFrom = this.cshFromDate;
        let etaTo = this.cshToDate;
        if (this.cshRequestNo == null || this.cshRequestNo == "") {

          if (this.cshVesselName != null && this.cshVesselName != "") {
            if (this.cshVesselName.length > 0 && (this.cshVesselName.length < 3 || this.cshVesselName.length > 255)) {
              this.isError = true;
              return;
            }
          }
             if(this.cshContainerNo.length > 0 && (this.cshContainerNo.length <10 || this.cshContainerNo.length > 11) || !this.groupOne.controls.cshContainerNo.valid) {
               this.isError = true;
                return;
            }
            if(this.cshRotationNo.length > 0 && (this.cshRotationNo.length <1 || this.cshRotationNo.length > 18) ||
              !this.groupOne.controls.rotationnumber.valid || this.rotationInValid) {
              this.isError = true;
                return;
            }

          if (this.cshFromDate != "" && this.cshToDate != "") {
            etaFrom = this.parsedate(etaFrom);
            etaFrom = new Date(this.datepipe.transform(etaFrom));
            etaFrom.setHours(0, 0, 0, 0);
            etaTo = this.parsedate(etaTo);
            etaTo = new Date(this.datepipe.transform(etaTo));
            etaTo.setHours(0, 0, 0, 0);
            if (etaFrom > etaTo) {
              this.etaValidate = true;
              this.isError = true;
              this.presentAlert(this.attenionHeadding, this.lessFromDate);
              return;
            }
          }
        }

        if (this.cshFromDate && this.cshFromDate != "") {
          this.cshFromDate = this.parsedate(this.cshFromDate);
          this.cshFromDate = this.datepipe.transform(this.cshFromDate, 'dd/MM/yyyy');
        } else {
          this.cshFromDate = "";
        }
        if (null != this.cshToDate && this.cshToDate != "") {
          this.cshToDate = this.parsedate(this.cshToDate);
          this.cshToDate = this.datepipe.transform(this.cshToDate, 'dd/MM/yyyy');
        } else {
          this.cshToDate = "";
        }
        this.cshSearchReqModal.cshNoSearch = this.cshRequestNo;
        this.cshSearchReqModal.rotationNumberSearch = this.cshRotationNo;
        this.cshSearchReqModal.vesselNameSearch = this.cshVesselName;
        this.cshSearchReqModal.containerNoSearch = this.cshContainerNo;
        this.cshSearchReqModal.createdFrmDate = this.cshFromDate;
        this.cshSearchReqModal.createdToDate = this.cshToDate;
        this.cshSearchReqModal.berthBookingStatus = this.cshstatus;
        this.cshSearchReqModal.fromFilter = true;
        this.navCtrl.pop();
    } else {
      this.isError=true;
      return;
    }
  }

  presentAlert(title: string, message: string) {
    this.alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: [{
        text: 'Dismiss',
        handler: () => {
          this.alert.dismiss();
        }
      }]
    });
    if(this.navCtrl.getActive().name == "CshfilterPage") {
      this.alert.present();
    }
  }

  parsedate(dtstring) {
    if (dtstring != null && dtstring.length > 5) {
      let pattern = /(\d{2})(\d{2})(\d{4})/;
      dtstring = dtstring.replace("/", "");
      dtstring = dtstring.replace("/", "");
      let date = new Date(dtstring.replace(pattern, '$3-$2-$1'));
      return date.toISOString();
    }
    else {
      return null;
    }
  }

  disableSerach() {
    if(this.cshRequestNo!=null && this.cshRequestNo.length>0)
    {
      if (this.groupOne.controls.cshRequestNo.valid)
        return false;
      else
        //this.cshRequestNo ="";
        return true;
    }
    else {
      if (this.groupOne.controls.cshRequestNo.valid
        && this.groupOne.controls.rotationnumber.valid
      ) {
        return false;
      }
      else {
        //this.cshRotationNo ="";
        return true;
      }
    }
  }

}
