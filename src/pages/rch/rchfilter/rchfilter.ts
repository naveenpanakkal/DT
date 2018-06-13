import {Component, Directive, HostListener} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {VoyageServicesProvider} from "../../../providers/webservices/voyageservices";
import {DefinedSetRequest} from "../../../shared/model/voyage/voyageenquiryinitdefinedsetrequest.model";
import {VoyageEnquiryLoadModel} from "../../../shared/model/voyage/voyageenquiryinit.model";
import {VoyageEnquirySearchRequestModel} from "../../../shared/model/voyage/voyageenquirysearchrequest.model";
import {Utils} from "../../../shared/utils";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Keyboard} from '@ionic-native/keyboard';
import {DatePipe} from "@angular/common";
import * as $ from 'jquery';
import {HoldContainerSearchSORequest} from "../../../shared/model/hnrc/holdcontainersearchsorequest.model";
import {ReleaseContainerSearchSO} from "../../../shared/model/hnrc/releasecontainersearch.model";
import {HoldContainerSO} from "../../../shared/model/hnrc/holdcontainerso.model";
import {HrcservicesProvider} from "../../../providers/webservices/hrcservices";
import {RotationNoSearchReqModel} from "../../../shared/model/ta/rotationnosearch/rotationnosearchreq.model";
import {RotationNoSearchResultList} from "../../../shared/model/ta/rotationnosearch/rotationnosearchresultlist.model";


@IonicPage()
@Component({
  selector: 'page-gigopagefilter',
  templateUrl: 'rchfilter.html',
  providers: [Utils]
})

export class RCHFilter {

  public Release_HoldAction: string = "";
  Release_ContainerCategory: string = "";
  Release_ContainerNo: string = "";
  Release_Location: string = "";
  Release_SpName: string = "";
  Release_ReferenceNo: string = "";
  Release_HoldRequestNo: any = "";
  Release_HoldPeriodFromDate: string = "";
  Release_HoldPeriodToDate: string = "";
  Release_AutoReleaseFromDate: string = "";
  Release_AutoReleaseToDate: string = "";
  Release_ReleasedFromDate: string = "";
  Release_ReleasedToDate: string = "";
  Release_Designation: string = "";
  Release_DeliveryOrderNo: string = "";
  Release_ContainerReleaseNo: string = "";
  Release_Status: string = "";
  Release_ContainerAcceptanceNo: string = "";
  Release_ReleasedBy: string = "";
  Release_RotationNo: string = "";
  holdActionDataLst: any[];
  designationTypeDataLst: any[];
  containerCategoryDataLst: any[];
  statusDataLst: any[];
  locationDataLst: any[];
  spNameDataLst: any[];
  showRotationNo: boolean;
  releaseDataLst: any[];
  releaseSearchRequest: ReleaseContainerSearchSO;
  formattedContainerCategoryLst: Array<string> = [];
  filterRotationArray: any;
  rotationno: any;
  alertObj: any = {};
  submit: boolean = false;
  verifyValidRotationNumber: boolean;
  rotationNumberArray: Array<any>;
  filterRotationNumberArray: Array<any>;
  showrotationNumber: boolean;
  rotationNumber: string;
  maxDate: any;
  previousContainerNo: string = "";
  dateFormat: string = "DD/MM/YYYY HH:mm";


  constructor(public keyboard: Keyboard,
              public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage,
              public datePipe: DatePipe,
              public alertCtrl: AlertController,
              public viewCtrl: ViewController, public utils: Utils,
              public hnrcServiceProvider: HrcservicesProvider,
              public formBuilder: FormBuilder) {

    this.containerCategoryDataLst = this.navParams.get("ContainerCategory");
    this.designationTypeDataLst = this.navParams.get("Designation");
    this.holdActionDataLst = this.navParams.get("HoldAction");
    this.statusDataLst = this.navParams.get("Status");
    this.locationDataLst = this.navParams.get("Location");
    this.spNameDataLst = this.navParams.get("SpName");
    this.releaseSearchRequest = this.navParams.get("Request");
    this.releaseDataLst = this.navParams.get("ReleaseBy");

    this.Release_HoldAction = this.releaseSearchRequest.holdAction;
    this.Release_ContainerCategory = this.releaseSearchRequest.containerCategory;
    this.Release_ContainerNo = this.releaseSearchRequest.containerNo;
    this.Release_Location = this.releaseSearchRequest.location;
    this.Release_SpName = this.releaseSearchRequest.spName;
    this.Release_ReferenceNo = this.releaseSearchRequest.referenceNo;
    this.Release_HoldRequestNo = this.releaseSearchRequest.holdRequestNo;
    this.Release_HoldPeriodFromDate = this.releaseSearchRequest.fromDate;
    this.Release_HoldPeriodToDate = this.releaseSearchRequest.toDate;
    this.Release_AutoReleaseFromDate = this.releaseSearchRequest.autoReleaseFromDateRelease;
    this.Release_AutoReleaseToDate = this.releaseSearchRequest.autoReleaseToDateRelease;
    this.Release_ReleasedFromDate = this.releaseSearchRequest.releaseFromDateRelease;
    this.Release_ReleasedToDate = this.releaseSearchRequest.releaseToDateRelease;
    this.Release_Designation = this.releaseSearchRequest.designation;
    this.Release_DeliveryOrderNo = this.releaseSearchRequest.deliveryOrderNo;
    this.Release_ContainerAcceptanceNo = this.releaseSearchRequest.containerAcceptanceNo;
    this.Release_ContainerReleaseNo = this.releaseSearchRequest.containerReleaseNo;
    this.Release_Status = this.releaseSearchRequest.status;
    this.Release_ReleasedBy = this.releaseSearchRequest.releasedBy;
    this.Release_RotationNo = this.releaseSearchRequest.rotationNo;
    this.spNameDataLst = this.releaseSearchRequest.spNameDataLst;
    this.alertObj = {
      title: this.utils.getLocaleString("ca_alert"),
      okButtonLabel: this.utils.getLocaleString("ca_ok_text"),
      message: ''
    };


    this.setDefaultValues();

    /*
    this.setDates(true, 'Release_HoldPeriodFromDate');
    this.setDates(false, 'Release_HoldPeriodToDate');
    this.setDates(true, 'Release_AutoReleaseFromDate');
    this.setDates(false, 'Release_AutoReleaseToDate');
    this.setDates(true, 'Release_ReleasedFromDate');
    this.setDates(false, 'Release_ReleasedToDate');
    */
    if(this.Release_HoldPeriodFromDate != null && this.Release_HoldPeriodFromDate != ''){
      this.Release_HoldPeriodFromDate = (new Date(this.Release_HoldPeriodFromDate).toISOString());
    }

    if(this.Release_HoldPeriodToDate != null && this.Release_HoldPeriodToDate != ''){
      this.Release_HoldPeriodToDate = (new Date(this.Release_HoldPeriodToDate).toISOString());
    }

    if(this.Release_AutoReleaseFromDate != null && this.Release_AutoReleaseFromDate != ''){
      this.Release_AutoReleaseFromDate = (new Date(this.Release_AutoReleaseFromDate).toISOString());
    }

    if(this.Release_AutoReleaseToDate != null && this.Release_AutoReleaseToDate != ''){
      this.Release_AutoReleaseToDate = (new Date(this.Release_AutoReleaseToDate).toISOString());
    }

    if(this.Release_ReleasedFromDate != null && this.Release_ReleasedFromDate != ''){
      this.Release_ReleasedFromDate = (new Date(this.Release_ReleasedFromDate).toISOString());
    }

    if(this.Release_ReleasedToDate != null && this.Release_ReleasedToDate != ''){
      this.Release_ReleasedToDate = (new Date(this.Release_ReleasedToDate).toISOString());
    }
    
    if(this.Release_ContainerCategory != null && this.Release_ContainerCategory != ''){
      this.rebindContainerCategory();
    }

    this.maxDate = new Date().toISOString();

  }

  ionViewDidEnter() {
  }

  checkUncheck(event: any, category: any, mode: number) {
    if (mode === 1) {
      //Select All
      this.formattedContainerCategoryLst = [];
      for (let category of this.containerCategoryDataLst) {
        if (category.checked != true) {
          category.checked = true;
          this.formattedContainerCategoryLst.push(category.definedSetValueCode);
        }
      }
    }
    else if (mode === 2) {
      //Unselect All
      this.formattedContainerCategoryLst = [];
      for (let category of this.containerCategoryDataLst) {
        category.checked = false;
      }
    }
    else if (mode === 3) {
      //Single Selection
      if (event.checked === true) {
        if (this.formattedContainerCategoryLst.indexOf(category.definedSetValueCode) == -1) {
          this.formattedContainerCategoryLst.push(category.definedSetValueCode);
        }
      }
      else {
        this.formattedContainerCategoryLst.forEach((item, index) => {
          if (item === category.definedSetValueCode) {
            this.formattedContainerCategoryLst.splice(index, 1);
          }
        });
      }
    }
  }

  getSubLocNameLst() {
    let reqObj = new HoldContainerSO();
    reqObj.location = this.Release_Location;
    this.hnrcServiceProvider.getSpNameMaster(reqObj, true).subscribe((response) => {
        this.spNameDataLst = response.spNameMasterList;
      },
      error => {

      });
    this.Release_SpName = "";
  }

  keyboardClose() {
    this.keyboard.close();
  }

  filterRCH() {

    this.submit = true;
    if (this.validateDateStartEnd(this.Release_HoldPeriodFromDate, this.Release_HoldPeriodToDate, "rel_HldDR_Msg")) {
      if (this.validateDateStartEnd(this.Release_AutoReleaseFromDate, this.Release_AutoReleaseToDate, "rel_AutoRel_Msg")) {
        if (this.validateDateStartEnd(this.Release_HoldPeriodFromDate, this.Release_HoldPeriodToDate, "rel_RelDR_Msg")) {
          if (!(this.validateFields('Release_ContainerNo', 'ErrorMsg_ContainerNo', 'alphaNumeric', [10, 11, 'enter_10_char', 'enter_11_char'])) &&
            !(this.validateFields('Release_ReferenceNo', 'ErrorMsg_ReferenceNo', 'allowAll', [3, 30, 'enter_10_char', 'enter_30_char'])) &&
            !(this.validateFields('Release_HoldRequestNo', 'ErrorMsg_HoldRequestNo', 'number', [1, 18, 'enter_1_char', 'enter_18_char'])) &&
            !(this.validateFields('Release_DeliveryOrderNo', 'ErrorMsg_DeliveryOrderNo', 'number')) &&
            !(this.validateFields('Release_ContainerAcceptanceNo', 'ErrorMsg_ContainerAcceptanceNo', 'number')) &&
            !(this.validateFields('Release_ContainerReleaseNo', 'ErrorMsg_ContainerReleaseNo', 'number'))
          ) {
            this.releaseSearchRequest.holdAction = this.Release_HoldAction;
            this.releaseSearchRequest.containerCategory = (this.formattedContainerCategoryLst).join();
            this.releaseSearchRequest.containerNo = this.Release_ContainerNo;
            this.releaseSearchRequest.location = this.Release_Location;
            this.releaseSearchRequest.spName = this.Release_SpName;
            this.releaseSearchRequest.referenceNo = this.Release_ReferenceNo;
            this.releaseSearchRequest.holdRequestNo = (this.Release_HoldRequestNo == 0) ? '' : this.Release_HoldRequestNo;
            this.releaseSearchRequest.fromDate = this.datePipe.transform(this.Release_HoldPeriodFromDate, 'dd/MM/yyyy HH:mm');
            this.releaseSearchRequest.toDate = this.datePipe.transform(this.Release_HoldPeriodToDate, 'dd/MM/yyyy HH:mm');
            this.releaseSearchRequest.autoReleaseFromDateRelease = this.datePipe.transform(this.Release_AutoReleaseFromDate, 'dd/MM/yyyy HH:mm');
            this.releaseSearchRequest.autoReleaseToDateRelease = this.datePipe.transform(this.Release_AutoReleaseToDate, 'dd/MM/yyyy HH:mm');
            this.releaseSearchRequest.releaseFromDateRelease = this.datePipe.transform(this.Release_ReleasedFromDate, 'dd/MM/yyyy HH:mm');
            this.releaseSearchRequest.releaseToDateRelease = this.datePipe.transform(this.Release_ReleasedToDate, 'dd/MM/yyyy HH:mm');
            this.releaseSearchRequest.designation = this.Release_Designation;
            this.releaseSearchRequest.deliveryOrderNo = this.Release_DeliveryOrderNo;
            this.releaseSearchRequest.containerAcceptanceNo = this.Release_ContainerAcceptanceNo;
            this.releaseSearchRequest.containerReleaseNo = this.Release_ContainerReleaseNo;
            this.releaseSearchRequest.status = this.Release_Status;
            this.releaseSearchRequest.releasedBy = this.Release_ReleasedBy;
            this.releaseSearchRequest.fromFilter = true;
            this.releaseSearchRequest.rotationNo = this.Release_RotationNo;
            this.navCtrl.pop();
          }
        }
      }
    }
  }

  resetRCH() {
    for (let category of this.containerCategoryDataLst) {
      category.checked = false;
    }
    this.Release_HoldAction = '';
    this.Release_ContainerCategory = '';
    this.Release_ContainerNo = '';
    this.Release_Location = '';
    this.Release_SpName = '';
    this.Release_ReferenceNo = '';
    this.Release_HoldRequestNo = '';
    this.Release_HoldPeriodFromDate = '';
    this.Release_HoldPeriodToDate = '';
    this.Release_AutoReleaseFromDate = '';
    this.Release_AutoReleaseToDate = '';
    this.Release_ReleasedFromDate = '';
    this.Release_ReleasedToDate = '';
    this.Release_Designation = 'All';
    this.Release_DeliveryOrderNo = '';
    this.Release_ContainerAcceptanceNo = '';
    this.Release_ContainerReleaseNo = '';
    this.Release_Status = 'All';
    this.Release_ReleasedBy = '';
    this.Release_RotationNo = '';
  }

  validateDateStartEnd(startDt, endDt, msgKey) {
    if (startDt && startDt != '' && endDt && endDt != '') {
      if (new Date(startDt) > new Date(endDt)) {
        this.showAlertMessage(msgKey);
        return false;
      }
      else {
        return true;
      }
    }
    else {
      return true;
    }
  }

  showAlertMessage(key) {
    this.alertObj.message = this.utils.getLocaleString(key);
    const alert = this.alertCtrl.create({
      title: this.alertObj.title,
      message: this.alertObj.message,
      buttons: [
        {
          text: this.alertObj.okButtonLabel,
          handler: () => {
            alert.dismiss();
          }
        }
      ]
    });
    alert.present();
  }

  /*
   * minMax Sample Format : [3,10,'<locale for min>','<locale for max>']
   */

  validateFields(fieldName, errorMsgField, pattern, minMax?) {
    let validatePattern = {
      number: '^[0-9]{0,18}$',
      alphaNumeric: '^[0-9a-zA-Z]{0,30}$',
      allowAll: '^[\\w\\s,\\.\\(\\)~!@\\#\\$%\\^&\\*-=\\+\\[\\]\\{\\}:;\'""<>\\?\\\\|]*$'
    }

    //Length Check
    if (this[fieldName] && this[fieldName].length === 0) {
      return false;
    }
    //Min Length Check
    else if (minMax && this[fieldName] && this[fieldName].length < minMax[0]) {
      this[errorMsgField] = this.utils.getLocaleString(minMax[2]);
      return true;
    }
    //Max Length Check
    else if (minMax && this[fieldName] && this[fieldName].length < minMax[0]) {
      this[errorMsgField] = this.utils.getLocaleString(minMax[3]);
      return true;
    }
    // Regex Check
    else {
      if (validatePattern[pattern] != '' && this[fieldName] && this.validate(this[fieldName], validatePattern[pattern])) {
        this[errorMsgField] = this.utils.getLocaleString("invalid_characters");
        return true;
      }
      else {
        return false;
      }
    }
  }

  validate(model, format) {
    if (model != null && model.length > 0) {
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

  keyUpValidate(e, format, model) {
    let validatePattern = {
      number: '^[0-9]{0,18}$',
      alphaNumeric: '^[0-9a-zA-Z]{0,30}$',
      allowAll: '^[\\w\\s,\\.\\(\\)~!@\\#\\$%\\^&\\*-=\\+\\[\\]\\{\\}:;\'""<>\\?\\\\|]*$'
    }
    this.utils.keyUpValidate(e, validatePattern[format]);
    this[model] = e.target.value;
    if (model == 'Release_ContainerNo')
      this.customValidateContainer(e);
  }

  customValidateContainer(e) {
    let formatLetter = /^[A-Za-z]*$/i;
    let formatDigit = /^[0-9]*$/i;
    let firstSplitWord: string = '';
    let secondSplitWord: string = '';
    if (this.Release_ContainerNo.length <= 4) {
      firstSplitWord = e.target.value.toString().substr(0, e.target.value.length);
      if (formatLetter.test(firstSplitWord)) {
        this.previousContainerNo = e.target.value.toUpperCase();
        this.Release_ContainerNo = e.target.value.toUpperCase();
      } else {
        this.Release_ContainerNo = this.previousContainerNo;
      }
    } else {
      firstSplitWord = e.target.value.toString().substr(0, 4);
      secondSplitWord = e.target.value.toString().substr(4, e.target.value.length - 1);
      if (/*formatLetter.test(firstSplitWord) &&*/ formatDigit.test(secondSplitWord)) {
        this.previousContainerNo = e.target.value.toUpperCase();
        this.Release_ContainerNo = e.target.value.toUpperCase();
      } else {
        this.Release_ContainerNo = this.previousContainerNo;
      }
    }
  }

  setDefaultValues() {
    this.Release_HoldAction = this.Release_HoldAction == undefined ? '' : this.Release_HoldAction;
    this.Release_ContainerCategory = this.Release_ContainerCategory == undefined ? '' : this.Release_ContainerCategory;
    this.Release_ContainerNo = this.Release_ContainerNo == undefined ? '' : this.Release_ContainerNo;
    this.Release_Location = this.Release_Location == undefined ? '' : this.Release_Location;
    this.Release_SpName = this.Release_SpName == undefined ? '' : this.Release_SpName;
    this.Release_ReferenceNo = this.Release_ReferenceNo == undefined ? '' : this.Release_ReferenceNo;
    this.Release_HoldRequestNo = this.Release_HoldRequestNo == undefined ? '' : this.Release_HoldRequestNo;
    this.Release_HoldPeriodFromDate = this.Release_HoldPeriodFromDate == undefined ? '' : this.Release_HoldPeriodFromDate;
    this.Release_HoldPeriodToDate = this.Release_HoldPeriodToDate == undefined ? '' : this.Release_HoldPeriodToDate;
    this.Release_AutoReleaseFromDate = this.Release_AutoReleaseFromDate == undefined ? '' : this.Release_AutoReleaseFromDate;
    this.Release_AutoReleaseToDate = this.Release_AutoReleaseToDate == undefined ? '' : this.Release_AutoReleaseToDate;
    this.Release_ReleasedFromDate = this.Release_ReleasedFromDate == undefined ? '' : this.Release_ReleasedFromDate;
    this.Release_ReleasedToDate = this.Release_ReleasedToDate == undefined ? '' : this.Release_ReleasedToDate;
    this.Release_Designation = this.Release_Designation == undefined ? 'All' : this.Release_Designation;
    this.Release_RotationNo = this.Release_RotationNo == undefined ? 'All' : this.Release_RotationNo;
    this.Release_DeliveryOrderNo = this.Release_DeliveryOrderNo == undefined ? '' : this.Release_DeliveryOrderNo;
    this.Release_ContainerAcceptanceNo = this.Release_ContainerAcceptanceNo == undefined ? '' : this.Release_ContainerAcceptanceNo;
    this.Release_ContainerReleaseNo = this.Release_ContainerReleaseNo == undefined ? '' : this.Release_ContainerReleaseNo;
    this.Release_Status = this.Release_Status == undefined ? '' : this.Release_Status;
    this.Release_ReleasedBy = this.Release_ReleasedBy == undefined ? '' : this.Release_ReleasedBy;
  }

  getRotationNumberMaster() {
    this.verifyValidRotationNumber = true;
    this.rotationNumberArray = [];
    let rotationNoSearchReq = new RotationNoSearchReqModel();
    this.hnrcServiceProvider.getRotationNumberMaster(rotationNoSearchReq)
      .subscribe(responseList => {
          let rotationNoRespList = <RotationNoSearchResultList>responseList;
          this.rotationNumberArray = rotationNoRespList.list;
          if (this.verifyValidRotationNumber) {
            this.getRotationNumber(null);
          }
        },
        error => {

        })
  }

  hideRotationNumber() {
    setTimeout(() => {
      this.verifyValidRotationNumber = false;
      this.showrotationNumber = false;
    }, 500);

  }

  selectRotation(item: any) {
    this.verifyValidRotationNumber = false;
    this.showrotationNumber = false;
    this.Release_RotationNo = item.rotationNo;
  }

  getRotationNumber(ev: any) {
    this.filterRotationNumberArray = this.rotationNumberArray;
    // set val to the value of the searchbar
    let val;
    if (ev == null) {
      val = this.Release_RotationNo;
    } else {
      val = ev.target.value;
    }
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      // Filter the items
      this.filterRotationNumberArray = this.filterRotationNumberArray.filter((item) => {
        if (item.rotationNo.toString().toLowerCase().startsWith(val.toString().toLowerCase())) {
          this.showrotationNumber = true;
        }
        return (item.rotationNo.toString().toLowerCase().startsWith(val.toString().toLowerCase()));
      });
    } else {
      // hide the results when the query is empty
      this.showrotationNumber = false;
    }
  }

  rebindContainerCategory() {
    for (let category of this.containerCategoryDataLst) {
      category.checked = false;
    }
    if (this.Release_ContainerCategory != undefined) {
      this.formattedContainerCategoryLst = this.Release_ContainerCategory.split(',');
      if (this.formattedContainerCategoryLst.length == 0) {
        for (let cCat of this.containerCategoryDataLst) {
          cCat.checked = false;
        }
      }
      else {
        for (let cCat of this.containerCategoryDataLst) {
          for (let searchCat of this.formattedContainerCategoryLst) {
            if (cCat['definedSetValueCode'] == searchCat) {
              cCat.checked = true;
            }
          }
        }
      }
    }
  }

  setDates(isFromMode, mdl) {

    if (this[mdl] == null || this[mdl] == '') {
      /*
      let dateObj = new Date();
      dateObj = new Date(dateObj.getTime() - dateObj.getTimezoneOffset() * 60000)
      if(isFromMode === true){
        dateObj.setDate(dateObj.getDate() - 7);
      }
      this[mdl] = dateObj.toISOString();*/
    }
    else {
      let dateObj = (this[mdl].split(' ')[0]).split('/');
      dateObj = new Date(dateObj[2], dateObj[1] - 1, dateObj[0]);
      this[mdl] = this.datePipe.transform(dateObj, 'yyyy-MM-dd');
    }
  }

}


