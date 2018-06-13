import {Component, ɵEMPTY_ARRAY} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Utils} from "../../../shared/utils";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Keyboard} from '@ionic-native/keyboard';
import * as $ from 'jquery';
import {DatePipe} from "@angular/common";
import {RCHFilter} from "../../rch/rchfilter/rchfilter";
import {HoldSpecificationDetailsSO} from "../../../shared/model/hnrc/holdspecdetailslistso.model";
import {DefinedsetresListModel} from "../../../shared/model/definedset/definedsetres-list.model";
import {HoldContainerSearchresultPage} from "../holdcontainersearchresult/holdcontainersearchresult";
import {HoldContainerSearchSORequest} from "../../../shared/model/hnrc/holdcontainersearchsorequest.model";
import {HoldContainerSO} from "../../../shared/model/hnrc/holdcontainerso.model";
import {HrcservicesProvider} from "../../../providers/webservices/hrcservices";
import {SubLocationMasterReqModel} from "../../../shared/model/sublocationmaster.model";

/**
 * Generated class for the gigofilter page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-holdcontainerfilter',
  templateUrl: 'holdcontainerfilter.html',
  providers: [Utils]
})

export class HoldContainerFilter {
  dateFormat: string = 'DD/MM/YYYY HH:mm';
  inputStringPattern: string = "^[a-zA-Z0-9 ]*$";
  DONumberPattern: string = "^[a-zA-Z0-9 ]{6,}$";
  selected: string = "All";
  pages: Array<{ title: string, showDetails: boolean, hide: boolean }>;
  enableImport:boolean = false;
  enableExport:boolean = false;
  enableStorage:boolean = false;
  enableTransshipment:boolean = false;
  minDate: any;
  maxDate: any;
  public  holdActionDataLst: any[];
          designationTypeDataLst : any[];
          containerCategoryDataLst : any[];
          statusDataLst : any[];
          locationDataLst : any[];
          spNameDataLst : any[];
          hldSearchRequest : HoldContainerSearchSORequest;
          formattedContainerCategoryLst : Array<string> = [];
          HoldAction : string = "";
          ContainerCategory : string = "";
          ContainerNo : string = "";
          Location : string = "";
          SpName : string = "";
          ReferenceNo : string ="";
          RequestNo : any = "";
          FromDate : any;
          minFromDate : any;
          ToDate : any;
          minToDate : any;
          disableControls: boolean;
          DesignationType : string = "";
          HoldActionStatus : string = "";
          alertObj : any = {};
          submit : boolean = false;
          previousContainerNo : string = "";
          containerError : boolean = false;
          ContainerNumberValidateLbl : string = "";
          ReferenceNumberValidateLbl : string = "";


  constructor(public keyboard: Keyboard, public navCtrl: NavController,
              public navParams: NavParams, private storage: Storage,
              public alertCtrl: AlertController,public viewCtrl: ViewController, public utils: Utils,
              public hrcservicesProvider : HrcservicesProvider,public formBuilder: FormBuilder,
              public datepipe: DatePipe,) {

    this.containerCategoryDataLst = this.navParams.get("ContainerCategory");
    this.designationTypeDataLst = this.navParams.get("Designation");
    this.holdActionDataLst = this.navParams.get("HoldAction");
    this.statusDataLst = this.navParams.get("Status");
    this.locationDataLst = this.navParams.get("Location");
    this.spNameDataLst = this.navParams.get("SpName");
    this.hldSearchRequest = this.navParams.get("Request");

    this.HoldAction = this.hldSearchRequest.holdActionSearch;
    this.ContainerCategory = this.hldSearchRequest.searchContainerCategory;
    this.ContainerNo = this.hldSearchRequest.searchConatinerNo;
    this.Location = this.hldSearchRequest.searchLocation;
    this.SpName = this.hldSearchRequest.searchSPName;
    this.getSubLocNameLst(false);
    this.ReferenceNo = this.hldSearchRequest.searchReferenceNo;
    this.RequestNo = (this.hldSearchRequest.searchRequestNo == 0)? '' : this.hldSearchRequest.searchRequestNo;
    this.FromDate = this.hldSearchRequest.filterFromDate;
    this.ToDate = this.hldSearchRequest.filterToDate;
    this.DesignationType = this.hldSearchRequest.searchDesignation;
    this.HoldActionStatus = this.hldSearchRequest.statusSearch;

    if("" == this.hldSearchRequest.searchStartDateTime || null == this.hldSearchRequest.searchStartDateTime) {
      this.FromDate = "";
      this.setMinFromDate();
    }
    else {
      if(this.hldSearchRequest.filterFromDate) {
        this.FromDate = new Date(this.hldSearchRequest.filterFromDate);
      }
      this.FromDate= this.FromDate.toISOString();
      this.minFromDate = this.datepipe.transform(this.FromDate, 'yyyy-MM-dd');
    }

     if("" == this.hldSearchRequest.searchEndDateTime || null == this.hldSearchRequest.searchEndDateTime) {
      this.ToDate = "";
      this.setMinToDates();
    }
    else {
       if(this.hldSearchRequest.filterToDate) {
         this.ToDate = new Date(this.hldSearchRequest.filterToDate);
       }
       this.ToDate= this.ToDate.toISOString();
       this.minToDate = this.datepipe.transform(this.minFromDate, 'yyyy-MM-dd');
    }

    this.alertObj = {
      title : this.utils.getLocaleString("ca_alert"),
      okButtonLabel : this.utils.getLocaleString("ca_ok_text"),
      message : ''
    };

    this.minDate = new Date().toISOString();

    this.rebindContainerCategory();
  }

  ionViewDidEnter() {
  }

  ionViewWillEnter() {
    this.setDefaultValues();
  }

  transformDateTime(value: string): any {
    let reggie = /(\d{2})\/(\d{2})\/(\d{4})\s(\d{2}):(\d{2})/;
    let dateArray = reggie.exec(value);
    let dateObject = new Date(new Date(
      (+dateArray[3]),
      ((+dateArray[2])) - 1, // month starts at 0!
      (+dateArray[1]),
      (+dateArray[4]),
      (+dateArray[5])).getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString();
    return dateObject;
  }

  setFromDates() {
    this.FromDate = new Date();
    this.FromDate = new Date(this.FromDate.getTime() - this.FromDate.getTimezoneOffset() * 60000);
    this.FromDate.setDate(this.FromDate.getDate() - 7);
    this.FromDate = this.FromDate.toISOString();
    this.minFromDate = this.FromDate;
    console.log('rbFromDate ' + this.FromDate);
  }

  setMinFromDate() {
    this.minFromDate = new Date();
    this.minFromDate = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000);
    this.minFromDate.setDate(this.minFromDate.getDate() - 7);
    this.minFromDate = this.minFromDate.toISOString();
    this.minFromDate = this.datepipe.transform(this.minFromDate, 'yyyy-MM-dd');
  }
  setToDates() {
    this.ToDate = new Date();
    this.ToDate = new Date(this.ToDate.getTime() - this.ToDate.getTimezoneOffset() * 60000);
    this.ToDate = this.ToDate.toISOString();
    this.minToDate = this.ToDate;
    console.log('rbToDate ' + this.ToDate);
  }

  onFromDateChange() {
    this.minToDate = this.datepipe.transform(this.FromDate, 'yyyy-MM-dd');
  }

  setMinToDates() {
    this.minToDate = new Date();
    this.minToDate = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000);
    this.minToDate = this.minToDate.toISOString();
    this.minToDate = this.datepipe.transform(this.minToDate, 'yyyy-MM-dd');
    if(this.FromDate) {
      this.minToDate = this.datepipe.transform(this.FromDate, 'yyyy-MM-dd');
    }
    console.log('rbToDate ' + this.ToDate);
  }

  resetValues() {
    for(let category of this.containerCategoryDataLst){
      category.checked = false;
    }
    this.HoldAction="";
    this.ContainerCategory="";
    this.ContainerNo="";
    this.Location="";
    this.SpName="";
    this.ReferenceNo="";
    this.RequestNo = "";
    this.FromDate="";
    this.ToDate="";
    this.DesignationType="All";
    this.HoldActionStatus="";
  }

  getFilterResults(){
    this.submit = true;
    //Date Validation Check
    let holdStartDate : Date = new Date(this.FromDate);
    let holdEndDate : Date = new Date(this.ToDate);

    if(holdEndDate < holdStartDate){
      this.alertObj = {
        title : this.utils.getLocaleString("ca_alert"),
        okButtonLabel : this.utils.getLocaleString("ca_ok_text"),
        message : ''
      };
      this.showAlertMessage("cafilteralert");
    }
    else{

      if(!this.containerNoValid() &&  !this.referenceNoValid() && ! this.validate(this.RequestNo,'^[0-9]{0,18}$')) {

        this.hldSearchRequest.holdActionSearch =  this.HoldAction;
        this.hldSearchRequest.searchContainerCategory = (this.formattedContainerCategoryLst).join();
        this.hldSearchRequest.searchConatinerNo = this.ContainerNo;
        this.hldSearchRequest.searchLocation = this.Location;
        this.hldSearchRequest.searchSPName = this.SpName;
        this.hldSearchRequest.searchReferenceNo = this.ReferenceNo;

        this.hldSearchRequest.searchRequestNo = (this.RequestNo == 0)? "" : this.RequestNo;
        if(null ==this.FromDate || "" == this.FromDate) {
          this.hldSearchRequest.searchStartDateTime =  "";
          this.hldSearchRequest.filterFromDate =  "";
        } else {
          this.hldSearchRequest.searchStartDateTime =  this.datepipe.transform(this.FromDate, 'dd/MM/yyyy HH:mm');
          this.hldSearchRequest.filterFromDate = this.FromDate;
        }
        if(null ==this.ToDate || "" == this.ToDate) {
          this.hldSearchRequest.searchEndDateTime = "";
          this.hldSearchRequest.filterToDate = "";
        } else {
          this.hldSearchRequest.searchEndDateTime = this.datepipe.transform(this.ToDate, 'dd/MM/yyyy HH:mm');
          this.hldSearchRequest.filterToDate = this.ToDate;
        }
        this.hldSearchRequest.searchDesignation = this.DesignationType;
        this.hldSearchRequest.statusSearch = this.HoldActionStatus;
        this.navCtrl.pop();

      }
    }
  }

  keyboardClose() {
    this.keyboard.close();
  }

  validateContainer() {
    this.containerError = false;
    if (this.validate(this.ContainerNo, '^[A-Z]{4}[0-9]{6,7}$')) {
      let containerLength = this.ContainerNo.length;
      this.ContainerNo = "";
      this.alertObj.title = "Attention";
      this.alertObj.okButtonLabel = "Dismiss";
      this.containerError = true;
      this.showAlertMessage("invalid_characters");
      return;
    }
  }

  checkUncheck(event:any,category:any,mode:number){
    if(mode === 1){
      //Select All
      this.formattedContainerCategoryLst=[];
      for(let category of this.containerCategoryDataLst){
        if(category.checked != true){
          category.checked=true;
          this.formattedContainerCategoryLst.push(category.definedSetValueCode);
        }
      }
    }
    else if(mode === 2){
      //Unselect All
      this.formattedContainerCategoryLst=[];
      for(let category of this.containerCategoryDataLst){
        category.checked=false;
      }
    }
    else if(mode === 3){
      //Single Selection
      if(event.checked === true){
        if(this.formattedContainerCategoryLst.indexOf(category.definedSetValueCode) == -1){
          this.formattedContainerCategoryLst.push(category.definedSetValueCode);
        }
      }
      else{
        this.formattedContainerCategoryLst.forEach((item,index)=>{
          if(item === category.definedSetValueCode){
            this.formattedContainerCategoryLst.splice(index,1);
          }
        });
      }
    }
  }



  validateAndAssign(controlType:string,pattern:string,event:any,modelAlias:string){
    this.utils.keyUpValidate(event,pattern);

    if(controlType === "D"){
      //Drop down
    }
    else if(controlType === "T"){
      //Text Field
      if(modelAlias === "hrContainerNo"){
        //this.L_ContainerNo =  event.target.value;
      }
      else if(modelAlias === "hrReferenceNo"){
        //this.L_ReferenceNo =  event.target.value;
      }
      else if(modelAlias === "hrRequestNo"){
        //this.L_HoldRequestNo =  event.target.value;
      }
    }
    else if(controlType === "DT"){
      //Date Field
    }
  }

  setDefaultValues(){
    this.HoldActionStatus = this.HoldActionStatus === undefined ? '' : this.HoldActionStatus;
    this.DesignationType = this.DesignationType === undefined ? 'All' : this.DesignationType;
    this.HoldAction = this.HoldAction === undefined ? '' : this.HoldAction;
    this.Location = this.Location === undefined ? '' : this.Location;
    this.SpName = this.SpName === undefined ? '' : this.SpName;
  }

  getSubLocNameLst(isChanged: boolean)
  {
    let reqObj=new HoldContainerSO();
      reqObj.location=this.Location;
    this.spNameDataLst=[];
    if(isChanged) {
      this.SpName = "";
    }
    this.hrcservicesProvider.getSpNameMaster(reqObj,true).subscribe((response)=>{
      this.spNameDataLst = response.spNameMasterList;
    })
  }

  showAlertMessage(key){
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

  rebindContainerCategory(){
    for(let category of this.containerCategoryDataLst){
      category.checked = false;
    }
    if(this.ContainerCategory != undefined){
      this.formattedContainerCategoryLst = this.ContainerCategory.split(',');
      if(this.formattedContainerCategoryLst.length == 0){
        for(let cCat of this.containerCategoryDataLst){
          cCat.checked = false;
        }
      }
      else{
        for(let cCat of this.containerCategoryDataLst){
          for(let searchCat of this.formattedContainerCategoryLst){
            if(cCat['definedSetValueCode'] == searchCat){
              cCat.checked = true;
            }
          }
        }
      }
    }
  }

  keyUpValidate(e, format, model) {
    this.utils.keyUpValidate(e, format);
    if (model == 'hcContainerNo') {
      this.ContainerNo = e.target.value;

      let formatLetter = /^[A-Za-z]*$/i;
      let formatDigit = /^[0-9]*$/i;
      let firstSplitWord: string = '';
      let secondSplitWord: string = '';
      if (this.ContainerNo.length <= 4) {
        firstSplitWord = e.target.value.toString().substr(0, e.target.value.length);
        if (formatLetter.test(firstSplitWord)) {
          this.previousContainerNo = e.target.value.toUpperCase();
          this.ContainerNo = e.target.value.toUpperCase();
        } else {
          this.ContainerNo = this.previousContainerNo;
        }
      } else {
        firstSplitWord = e.target.value.toString().substr(0, 4);
        secondSplitWord = e.target.value.toString().substr(4, e.target.value.length - 1);
        if (/*formatLetter.test(firstSplitWord) &&*/ formatDigit.test(secondSplitWord)) {
          this.previousContainerNo = e.target.value.toUpperCase();
          this.ContainerNo = e.target.value.toUpperCase();
        } else {
          this.ContainerNo = this.previousContainerNo;
        }
      }

    }
    else if(model == 'hcRequestNo'){
      this.RequestNo = e.target.value;
    }
  }

  containerNoValid() {
    if (this.ContainerNo && this.ContainerNo.length == 0) {
      if(this.containerError == true){
        this.ContainerNumberValidateLbl = this.utils.getLocaleString("enter_10_char");
        return true;
      }
      else{
        return false;
      }
    }
    else if (this.ContainerNo && this.ContainerNo.length < 10) {
      this.ContainerNumberValidateLbl = this.utils.getLocaleString("enter_10_char");
      return true;
    }
    else {
      if (this.validate(this.ContainerNo, '^[0-9a-zA-Z]{0,30}$')) {
        this.ContainerNumberValidateLbl = this.utils.getLocaleString("invalid_characters")
        return true;
      }
      else {
        return false;
      }
    }
  }

  referenceNoValid() {
    if (this.ReferenceNo && this.ReferenceNo.length == 0) {
      return false;
    }
    else if (this.ReferenceNo && this.ReferenceNo.length < 3) {
      this.ReferenceNumberValidateLbl = this.utils.getLocaleString("enter_3_char");
      return true;
    }
    else {
      if (this.validate(this.ReferenceNo, '^[0-9a-zA-Z]{0,30}$')) {
        this.ReferenceNumberValidateLbl = this.utils.getLocaleString("invalid_characters")
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


  fieldsValid(model, format) {
    if (model && model.length == 0) {
      return false;
    }
    else if (model && model.length < 3) {
      return true;
    }
    else {
      if (this.validate(model, format)) {
        return true;
      }
      else {
        return false;
      }
    }
  }

}
