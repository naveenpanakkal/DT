import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {BerthSearchViewPage}from '../berthsearchview/berthsearchview';
import { DatePipe } from '@angular/common';
import {BerthClientMasterReq} from "../../shared/model/berthsearchview/berthsearch/berthclientmasterreq.model";
import {BerthClientMasterResultListModel} from "../../shared/model/berthsearchview/berthsearch/berthclientmasterresult-list.model";
import {BerthClientMasterResult} from "../../shared/model/berthsearchview/berthsearch/berthclientmasterresult.model";
import {BerthServicesProvider} from "../../providers/webservices/berthservices";
import {Utils} from "../../shared/utils";
import {Keyboard} from '@ionic-native/keyboard';
import {FormBuilder, FormGroup, FormArray, Validators, FormControl} from '@angular/forms';
/**
 * Generated class for the BerthsearchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-berthsearch',
  templateUrl: 'berthsearch.html',
  providers:[Utils,BerthClientMasterReq,BerthClientMasterResultListModel,BerthClientMasterResult]
})
export class BerthsearchPage {
  pattern=/06([0-9])/;
  inputStringPattern: string = "^[a-zA-Z0-9 ]*$";
  vesseloperator:any;
  shippingAgentName:any;
  berthrotationnumber:any;
  vesselname:string;
  createdby:any;
  berthstatus:any;
  berthoperationstatus:any;
  bertheta: any;
  createdFromDate: any;
  createdToDate:any;
  etafromdate:any;
  etatodate:any;
  servicename:any;
  berthrequestid:any;
  date : Date;
  dateFormat: string = 'DD/MM/YYYY HH:mm GST';
  searchdetails: BerthClientMasterResult[];
  filterUserArray:any;
  showCreatedBy: boolean;
  disableControls:boolean;
  filterShippingArray:any;
  filterVesselArray:any;
  showVesselOperator:boolean;
  showShippingAgent:boolean;
  varetaDate = null;
  varcreatedFromDate= null;
  varcreatedToDate= null;
  varetaFromDate= null;
  varetaToDate= null;
  rotationStatus : boolean = false;
  minDate : any;
  maxDate : any;
  fromdate:any;
  todate:any;
  etatime:any;
  etafromtime:any;
  etatotime:any;
  groupOne : FormGroup;
  constructor(public keyboard: Keyboard,public navCtrl: NavController, public navParams: NavParams,
  private storage: Storage, public datepipe: DatePipe,public berthClientMasterReq: BerthClientMasterReq,
  public berthClientMasterResultListModel: BerthClientMasterResultListModel,
  public berthClientMasterResult:BerthClientMasterResult,public formBuilder: FormBuilder, public berthServicesProvider:BerthServicesProvider,
  public alertCtrl : AlertController,public utils:Utils) {

    this.berthstatus="All";
    this.berthoperationstatus="All";
    this.setDates();
    this.setETApicker();

    this.groupOne = formBuilder.group({
      vesseloperator: [''],
      shippingAgentName: [''],
      rotationnumber: ['', Validators.compose([Validators.pattern(/^((?!(0))[0-9]*)$/)])],
      vesselname: ['' ],
      bertheta: ['',],
      createdby: [''],
      berthstatus: [''],
      berthoperationstatus: [''],
      createdFromDate: [''],
      createdToDate: [''],
      etafromdate: [''],
      etatodate: [''],
      service: ['',Validators.compose([Validators.pattern(this.inputStringPattern)])]
    });

   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BerthsearchPage');
  }

  setDates() {
    this.createdFromDate = new Date();
    this.createdFromDate = new Date(this.createdFromDate.getTime() -
    this.createdFromDate.getTimezoneOffset() * 60000)
    //  this.createdFromDate.setHours(this.createdFromDate.getHours() + 4);
    this.createdFromDate.setDate(this.createdFromDate.getDate() - 7);
    this.createdFromDate = this.createdFromDate.toISOString();
    console.log('createdFromDate ' + this.createdFromDate);
    this.createdToDate = new Date();
    this.createdToDate = new Date(this.createdToDate.getTime() -
    this.createdToDate.getTimezoneOffset() * 60000);
    // this.createdToDate.setHours(this.createdToDate.getHours() + 4);
    this.createdToDate = this.createdToDate.toISOString();
    console.log('createdToDate ' + this.createdToDate);
  }
  showBerthresults() {

if(this.groupOne.valid) {
      if (!this.etaDateCheck()) {
      return;
    }
    if (this.createdFromDate) {
      localStorage.setItem('CreatedFrom', this.createdFromDate.split("T")[0]);
      this.fromdate=this.createdFromDate.split("T")[1];
      this.fromdate=this.fromdate.substr(0,this.fromdate.lastIndexOf(':'));
      this.varcreatedFromDate = this.datepipe.transform(localStorage.getItem('CreatedFrom'), 'dd/MM/yyyy');
      this.varcreatedFromDate=this.varcreatedFromDate + " "+this.fromdate;
    } else {
      localStorage.setItem('CreatedFrom', '');
      this.varcreatedFromDate=" ";
    }

    if (this.createdToDate) {
      localStorage.setItem('CreatedTo', this.createdToDate.split("T")[0]);
       this.todate=this.createdToDate.split("T")[1];
       this.todate=this.todate.substr(0,this.todate.lastIndexOf(':'));
       this.varcreatedToDate = this.datepipe.transform(localStorage.getItem('CreatedTo'), 'dd/MM/yyyy');
      this.varcreatedToDate=this.varcreatedToDate + " "+this.todate;
    } else {
      localStorage.setItem('CreatedTo', '');
      this.varcreatedToDate=" ";
    }
    if (this.etafromdate) {
      localStorage.setItem('ETAFromDate', this.etafromdate.split("T")[0]);
      this.etafromtime=this.etafromdate.split("T")[1];
      this.etafromtime=this.etafromtime.substr(0,this.etafromtime.lastIndexOf(':'));
      this.varetaFromDate = this.datepipe.transform(localStorage.getItem('ETAFromDate'), 'dd/MM/yyyy');
      this.varetaFromDate =this.varetaFromDate+ " "+this.etafromtime;
    } else {
      localStorage.setItem('ETAFromDate', '');
      this.varetaFromDate =" ";
    }

    if (this.etatodate) {
      localStorage.setItem('ETAToDate', this.etatodate.split("T")[0]);
      this.etatotime=this.etatodate.split("T")[1];
      this.etatotime=this.etatotime.substr(0,this.etatotime.lastIndexOf(':'));
      this.varetaToDate = this.datepipe.transform(localStorage.getItem('ETAToDate'), 'dd/MM/yyyy');
      this.varetaToDate =this.varetaToDate+" "+this.etatotime;
    } else {
      localStorage.setItem('ETAToDate', '');
      this.varetaToDate = " ";
    }
      if (this.bertheta) {
      localStorage.setItem('ETA', this.bertheta.split("T")[0]);
      this.etatime=this.bertheta.split("T")[1];
      this.etatime=this.etatime.substr(0,this.etatime.lastIndexOf(':'));
      this.varetaDate = this.datepipe.transform(localStorage.getItem('ETA'), 'dd/MM/yyyy');
      this.varetaDate = this.varetaDate+" "+this.etatime;
    } else {
      localStorage.setItem('ETA', '');
      this.varetaDate = " " ;
    }

      this.navCtrl.push(BerthSearchViewPage, {
      vesseloperator:this.vesseloperator,
      shippingAgentName:this.shippingAgentName,
      berthrotationnumber:this.berthrotationnumber,
      vesselname:this.vesselname,
      createdby:this.createdby,
      berthstatus:this.berthstatus,
      berthoperationstatus:this.berthoperationstatus,
      bertheta: this.varetaDate,
      createdFromDate: this.varcreatedFromDate,
      createdToDate: this.varcreatedToDate,
      etafromdate: this.varetaFromDate,
      etatodate: this.varetaToDate,
      servicename:this.servicename,
      berthrequestid:this.berthrequestid,
      isRotationNoActive : this.rotationStatus
      });
}


  }
  reset()
  {
    this.vesseloperator="";
    this.shippingAgentName="";
    this.berthrotationnumber="";
    this.vesselname="";
    this.createdby="";
    this.berthstatus="All";
    this.bertheta="";
    this.berthoperationstatus="All";
    this.bertheta="";
    this.etafromdate="";
    this.etatodate="";
    this.berthrequestid="";
    this.servicename="";
    this.setDates();
  }
  getUsername(ev: any) {
    this.filterUserArray=[];
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.filterUserArray = this.searchdetails.filter((item) => {
        return (item.userName!=null &&  item.userName.toLowerCase().startsWith(val.toLowerCase()));
      });
    }
    if(this.filterUserArray.length==0){
      this.showCreatedBy = false;
    }
    else
    {
      this.showCreatedBy = true;
    }
  }
  etaDateCheck() {
    if (this.createdFromDate > this.createdToDate) {
      this.presentAlert("Attention", 'From Date should be less than To Date.');
      return false;
    }
    else if (this.etafromdate > this.etatodate) {
      this.presentAlert("Attention", 'From Date should be less than To Date.');
      return false;
    }
    else {
      return true;
    }

  }
  searchUsername(){
    this.berthClientMasterReq.clientName="";
    this.berthClientMasterReq.userName="";
     this.searchdetails = new Array<BerthClientMasterResult>();
    this.berthServicesProvider.getClientMasterData(this.berthClientMasterReq)
      .subscribe(response => {
          this.berthClientMasterResultListModel = <BerthClientMasterResultListModel>response;
          this.searchdetails = this.berthClientMasterResultListModel.list;
          console.log('ARRAY' + JSON.stringify(this.searchdetails));
        },
        error => {
          var errorMessage = <any>error;
          console.log('ERROR');
        });
  }
  hideUsername(){
    this.showCreatedBy = false;

  let searchResp:BerthClientMasterResult=new BerthClientMasterResult();
    this.berthClientMasterReq.clientName="";
    this.berthClientMasterReq.userName=this.createdby;
    this.berthServicesProvider.getClientMasterData(this.berthClientMasterReq)
      .subscribe(response => {
          this.berthClientMasterResultListModel = <BerthClientMasterResultListModel>response;
          this.searchdetails = this.berthClientMasterResultListModel.list;
          console.log('ARRAY' + JSON.stringify(this.searchdetails));

          if (this.searchdetails.length == 0) {
            this.berthClientMasterReq.clientName="";
            this.berthClientMasterReq.userName="";
            //this.presentAlert("Attention", 'Please provide valid user name.');
          }
          else {
            searchResp = this.searchdetails.find(element => element.userName == this.createdby)
            if (!searchResp) {
              this.berthClientMasterReq.clientName="";
            this.berthClientMasterReq.userName="";
              // this.presentAlert("Attention", 'Please provide valid user name.');
            }
          }
        },
        error => {
          var errorMessage = <any>error;
          console.log('ERROR');
        });
  }
  selectUsername(item: any) {
    this.createdby = item.userName;
    this.showCreatedBy = false;
  }
  showbuttons(){
    this.disableControls=true;
  }

  rotationChange() {
    if(null != this.berthrotationnumber && this.berthrotationnumber.length >0) {
      this.disableControls=true;
      this.rotationStatus = true;
    } else {
      this.disableControls= false;
      this.rotationStatus = false;
    }
  }


  searchShippingMaster(){
    this.berthClientMasterReq.vesselOperatorName="";
    this.berthClientMasterReq.vesselOperatorType="";
    this.berthClientMasterReq.clientCode="";
    this.berthClientMasterReq.shippingClientCode="";
    this.searchdetails = new Array<BerthClientMasterResult>();
    this.berthServicesProvider.getShippingMasterData(this.berthClientMasterReq)
      .subscribe(response => {
          this.berthClientMasterResultListModel = <BerthClientMasterResultListModel>response;
          this.searchdetails = this.berthClientMasterResultListModel.list;
          console.log('ARRAY' + JSON.stringify(this.searchdetails));
        },
        error => {
          var errorMessage = <any>error;
          console.log('ERROR');
        });
  }
   getVesselOperator(ev: any) {
   this.filterVesselArray = this.searchdetails;
    // set val to the value of the searchbar
    let val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      // Filter the items
      this.filterVesselArray = this.filterVesselArray.filter((item) => {
        if (item.vesselOperatorName.toLowerCase().indexOf(val.toLowerCase()) > -1) {
          this.showVesselOperator = true;
        }
        return (item.vesselOperatorName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    } else {
      // hide the results when the query is empty
      this.showVesselOperator = false;
    }
  }
  hidevesseloperator(){
    this.showVesselOperator = false;

    let searchResp:BerthClientMasterResult=new BerthClientMasterResult();
       this.berthClientMasterReq.vesselOperatorName=this.vesseloperator;
    this.berthClientMasterReq.vesselOperatorType="";

    this.berthServicesProvider.getShippingMasterData(this.berthClientMasterReq)
      .subscribe(response => {
          this.berthClientMasterResultListModel = <BerthClientMasterResultListModel>response;
          this.searchdetails = this.berthClientMasterResultListModel.list;
          console.log('ARRAY' + JSON.stringify(this.searchdetails));

          if (this.searchdetails.length == 0) {
              this.berthClientMasterReq.vesselOperatorName="";
              this.berthClientMasterReq.vesselOperatorType="";
            // this.presentAlert("Attention", 'Please provide valid vessel operator.');
          }
          else {
            searchResp = this.searchdetails.find(element => element.vesselOperatorName == this.vesseloperator)
            if (!searchResp) {
              this.berthClientMasterReq.vesselOperatorName="";
              this.berthClientMasterReq.vesselOperatorType="";
              // this.presentAlert("Attention", 'Please provide valid vessel operator.');
            }
          }
        },
        error => {
          var errorMessage = <any>error;
          console.log('ERROR');
        });
  }
  selectVesselOperator(item: any) {
    this.vesseloperator = item.vesselOperatorName;
    this.showVesselOperator = false;
  }
   getShippingAgent(ev: any) {
   this.filterShippingArray = this.searchdetails;
    // set val to the value of the searchbar
    let val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      // Filter the items
      this.filterShippingArray = this.filterShippingArray.filter((item) => {
        if (item.shippingClientCode.toLowerCase().indexOf(val.toLowerCase()) > -1) {
          this.showShippingAgent = true;
        }
        return (item.shippingClientCode.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    } else {
      // hide the results when the query is empty
      this.showShippingAgent = false;
    }
  }
  hideshippingagent(){
    this.showShippingAgent = false;

    let searchResp:BerthClientMasterResult=new BerthClientMasterResult();
      this.berthClientMasterReq.clientCode="";
    this.berthClientMasterReq.shippingClientCode=this.shippingAgentName;

    this.berthServicesProvider.getShippingMasterData(this.berthClientMasterReq)
      .subscribe(response => {
          this.berthClientMasterResultListModel = <BerthClientMasterResultListModel>response;
          this.searchdetails = this.berthClientMasterResultListModel.list;
          console.log('ARRAY' + JSON.stringify(this.searchdetails));

          if (this.searchdetails.length == 0) {
               this.berthClientMasterReq.clientCode="";
              this.berthClientMasterReq.shippingClientCode="";
            // this.presentAlert("Attention", 'Please provide valid shipping agent.');
          }
          else {
            searchResp = this.searchdetails.find(element => element.shippingClientCode == this.shippingAgentName)
            if (!searchResp) {
             this.berthClientMasterReq.clientCode="";
              this.berthClientMasterReq.shippingClientCode="";
              // this.presentAlert("Attention", 'Please provide valid shipping agent.');
            }
          }
        },
        error => {
          var errorMessage = <any>error;
          console.log('ERROR');
        });
  }
  selectShippingAgent(item: any) {
    this.shippingAgentName = item.shippingClientCode;
    this.showShippingAgent = false;
  }

  presentAlert(title: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Dismiss']
    });
    alert.present();
  }
  isAdmin(){
    if((localStorage.getItem('CLIENT_CODE') == 'msadmin')||(localStorage.getItem('CLIENT_CODE') == 'toadmin')){
      return false;
    }else
      return true;
  }
  keyUpValidate(e,format,model)
  {
  this.utils.keyUpValidate(e, format);
  if(model=='rotationNumber')
    {
      this.berthrotationnumber= e.target.value;
    }else if (model == 'serviceName') {
      this.servicename = e.target.value;
    }else if (model=='createdby'){
      this.createdby=e.target.value;
    }
    else if (model=='vesselName'){
      this.vesselname=e.target.value;
    }
    else if (model=='vesseloperator'){
      this.vesseloperator=e.target.value;
    }
    else if (model=='shippingAgentName'){
      this.shippingAgentName=e.target.value;
    }
  }
  keyboardClose() {
    this.keyboard.close();
  }

  setETApicker(){
    this.minDate = new Date();
    this.minDate.setMonth(this.minDate.getMonth() -3);
    this.maxDate = new Date();
    this.maxDate.setMonth(this.maxDate.getMonth() +3);
    this.minDate= this.minDate.toISOString().substr(0,10);
    this.maxDate = this.maxDate.toISOString().substr(0,10);
  }
}
