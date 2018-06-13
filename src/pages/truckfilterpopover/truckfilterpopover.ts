import {Component, ViewChild} from '@angular/core';
import {ViewController, IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { DatePipe } from '@angular/common';
import {Utils} from "../../shared/utils";
import {Keyboard} from '@ionic-native/keyboard';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as $ from 'jquery';
/**
 * Generated class for the SortpopoverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-sortpopover',
  templateUrl: 'truckfilterpopover.html',
  providers:[Utils]
})
export class TruckfilterpopoverPage {
  pattern=/06([0-9]{8})/;
  license_plate_num_pattern = "^[a-z0-9A-Z- \\/]*$";
  inputStringPattern: string = "^[a-zA-Z ]*$";
  pages: Array<{ title: string, showDetails: boolean }>;
  showSubmenu: any;

  filterSelected: any;
  ownerName: string;
  truckRegistrationId: string;
  licensePlateNumber: string;
  @ViewChild('truck_reg_id') input_regid;
  @ViewChild('own_name') owner_name;
  @ViewChild('lic_plt_num') lic_plt_num;

  maxvalue: any;

  date : Date;
  dateFormat: string = 'DD/MM/YYYY';
  alertMsg: string;
  is_disable : boolean = false;


  public createdFromDate: any;
  public createdToDate: any;
  groupOne: FormGroup;


  constructor(public keyboard: Keyboard, public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl: ViewController, private storage: Storage, public datepipe: DatePipe,public utils:Utils,
              public formBuilder: FormBuilder,
               public alertCtrl: AlertController) {

    let previous_val = this.navParams.get('previous_search');
    this.pages = [
          {title: 'Truck Registration ID', showDetails: false},
          {title: 'License Plate Number', showDetails: false},
          {title: 'Owner Name', showDetails: false},
          {title: 'Date Created', showDetails: false},
          {title: 'Status', showDetails: false}
    ];

    this.maxvalue = new Date().toISOString();

    this.groupOne = formBuilder.group({
      license_num: ['', Validators.compose( [Validators.minLength(3),Validators.maxLength(255), Validators.pattern(this.license_plate_num_pattern)])],
      owner_name: ['', Validators.compose([Validators.minLength(3),Validators.maxLength(255), Validators.pattern(this.inputStringPattern)])],
      truck_reg_id: ['', Validators.compose([Validators.minLength(3),Validators.maxLength(18),Validators.pattern(/^[1-9][0-9]*$/)])]
    });

    storage.get('submenu').then((val) => {
      if (!val) {
      } else {
        if (val.title === 'Status') {
          this.pages = [
          {title: 'Truck Registration ID', showDetails: false},
          {title: 'License Plate Number', showDetails: false},
          {title: 'Owner Name', showDetails: false},
          {title: 'Date Created', showDetails: false},
          {title: 'Status', showDetails: false}
          ]
        }
      }
    });

    storage.get('truckFilterSelected').then((val) => {
      if(val) {
        this.filterSelected = val;
      } else {
        this.filterSelected = 'All';
      }

    });
    //ios code change  -- start
    //Code added to solve the persistence issue for is filter popover
    if (this.filterSelected == null) {
      if (previous_val  && previous_val.status) {
        this.filterSelected = previous_val.status;
      } else {
        this.filterSelected = 'All';
      }

    }
    //ios code change  -- end

    storage.get('truckOwnerName').then((val) => {
      this.ownerName = val;
    });

    //ios code change  -- start
    //Code added to solve the persistence issue for is filter popover
    if (this.ownerName == null) {
      if (previous_val) {
        this.ownerName = previous_val.ownerName;
      }
    }
    //ios code change  -- end



    storage.get('truckRegistrationId').then((val) => {
      this.truckRegistrationId = val;
    });

    //ios code change  -- start
    //Code added to solve the persistence issue for is filter popover
    if (this.truckRegistrationId == null) {
      if (previous_val) {
        this.truckRegistrationId = previous_val.truckRegistrationId;
      }
    }
    //ios code change  -- end

    storage.get('truckLicensePlateNumber').then((val) => {
      this.licensePlateNumber = val;
    });

    //ios code change  -- start
    //Code added to solve the persistence issue for is filter popover
    if (this.licensePlateNumber == null) {
      if (previous_val) {
        this.licensePlateNumber = previous_val.searchLicensePlateNumber;
      }
    }
    //ios code change  -- end

    if (null == localStorage.getItem('truckCreatedFrom') || ("" == localStorage.getItem('truckCreatedFrom'))) {
      this.createdFromDate= new Date();
      this.createdFromDate.setDate(this.createdFromDate.getDate() - 7);
      this.createdFromDate = this.createdFromDate.toISOString();
     // this.createdFromDate = this.createdFromDate.getFullYear().toString()+'-'+(this.createdFromDate.getMonth()+1).toString()+'-'+this.createdFromDate.getDate().toString();
    }
    else {
      this.createdFromDate =localStorage.getItem('truckCreatedFrom') ;
      this.createdFromDate = new Date(this.createdFromDate);
      this.createdFromDate = this.datepipe.transform(this.createdFromDate, 'yyyy-MM-dd');
    }

    if (null == localStorage.getItem('truckCreatedTo') || ("" == localStorage.getItem('truckCreatedTo'))) {
      this.createdToDate= new Date().toISOString();
    }
    else{
      this.createdToDate = localStorage.getItem('truckCreatedTo');
      this.createdToDate = new Date(this.createdToDate);
      this.createdToDate = this.datepipe.transform(this.createdToDate, 'yyyy-MM-dd');
    }

    if(this.truckRegistrationId != '') {
      this.checkDisable();
    }

  }

  ionViewDidLoad(){
    document.getElementsByTagName("ion-app").item(0).classList.add("disable-scroll");
  }

  ionViewWillLeave(){
    if ( document.getElementsByTagName("ion-app").item(0).classList.contains("disable-scroll") )
      document.getElementsByTagName("ion-app").item(0).classList.remove("disable-scroll");
  }

  getIcon(page) {
    if (page.showDetails) {
      return "arrow-dropup";
    } else {
      return "arrow-dropdown";
    }
  }

  toggleDetails(page) {
    this.showSubmenu = true;
    if (page.title == 'Truck Registration ID') {
      this.pages[0].showDetails = !this.pages[0].showDetails;
      this.pages[1].showDetails = false;
      this.pages[2].showDetails = false;
      this.pages[3].showDetails = false;
      this.pages[4].showDetails = false;
    } else if (page.title == 'License Plate Number') {
      this.pages[0].showDetails = false;
      this.pages[1].showDetails = !this.pages[1].showDetails;
      this.pages[2].showDetails = false;
      this.pages[3].showDetails = false;
      this.pages[4].showDetails = false;
    } else if (page.title == 'Owner Name') {
      this.pages[0].showDetails = false;
      this.pages[1].showDetails = false;
      this.pages[2].showDetails = !this.pages[2].showDetails;
      this.pages[3].showDetails = false;
      this.pages[4].showDetails = false;
    }
    else if (page.title == 'Date Created') {
      this.pages[0].showDetails = false;
      this.pages[1].showDetails = false;
      this.pages[2].showDetails = false;
      this.pages[3].showDetails = !this.pages[3].showDetails;
      this.pages[4].showDetails = false;
      setTimeout(function(){
        $('.popoverList').animate({
          scrollTop: $(".date_to").offset().top
        }, 'fast');
      },200);
    } else if (page.title == 'Status') {
      this.pages[0].showDetails = false;
      this.pages[1].showDetails = false;
      this.pages[2].showDetails = false;
      this.pages[3].showDetails = false;
      this.pages[4].showDetails = !this.pages[4].showDetails;
      setTimeout(function(){
        $('.popoverList').animate({
          scrollTop: 170
        }, 'fast');
      },200);
    }
    this.storage.set('submenu', page);
  }

  clear() {
    this.is_disable =  false;
    this.filterSelected = 'All';
    if(this.ownerName != null || this.ownerName == "" )
    {
      this.ownerName = null;
      if(this.owner_name) {
        this.owner_name.setFocus();
      }
    }
    if(this.truckRegistrationId != null || this.truckRegistrationId == "" )
    {
      this.truckRegistrationId = null;
      if (this.input_regid) {
        this.input_regid.setFocus();
      }
    }
    if(this.licensePlateNumber != null || this.licensePlateNumber == "" )
    {
      this.licensePlateNumber = null;
      if (this.lic_plt_num) {
        this.lic_plt_num.setFocus();
      }
    }

    this.createdFromDate= new Date();
    this.createdFromDate.setDate(this.createdFromDate.getDate() - 7);
    this.createdFromDate = this.createdFromDate.toISOString();
    this.createdToDate = new Date().toISOString();


    this.storage.remove('truckFilterSelected');
    this.storage.remove('truckOwnerName');
    this.storage.remove('truckRegistrationId');
    this.storage.remove('truckLicensePlateNumber');
    localStorage.setItem('truckCreatedFrom',   this.createdFromDate );
    localStorage.setItem('truckCreatedTo',   this.createdToDate );

    this.pages[0].showDetails = false;
    this.pages[1].showDetails = false;
    this.pages[2].showDetails = false;
    this.pages[3].showDetails = false;
    this.pages[4].showDetails = false;

    /*this.viewCtrl.dismiss({
      truckFilterSelected: this.filterSelected,
      truckOwnerName: this.ownerName,
      truckRegistrationId: this.truckRegistrationId,
      truckLicensePlateNumber: this.licensePlateNumber,
      truckCreatedFromDate: localStorage.getItem('truckCreatedFrom'),
      truckCreatedToDate: localStorage.getItem('truckCreatedTo')
    }).catch(() => {
    });*/

  }
  resetDate(date:string)
  {
    date=null;
  }
  keyUpValidate(e,format,model)
  {
    this.utils.keyUpValidate(e, format);
    if(model=='licensePlateNumber')
    {
      this.licensePlateNumber=e.target.value;
    }
    else if(model=='truckRegistrationId')
    {
      this.truckRegistrationId=e.target.value;
    }
    else if(model=='ownerName')
    {
      this.ownerName=e.target.value;
    }
  }

  checkDisable()
  {
    if(this.truckRegistrationId == null || this.truckRegistrationId == "")
    {
      if (this.createdFromDate) {
        localStorage.setItem('truckCreatedFrom', this.createdFromDate);
      } else {
        this.createdFromDate= new Date();
        this.createdFromDate.setDate(this.createdFromDate.getDate() - 7);
        this.createdFromDate = this.createdFromDate.toISOString();
      }

      if (this.createdToDate) {
        localStorage.setItem('truckCreatedTo', this.createdToDate);
      } else {
        this.createdToDate = new Date().toISOString();
      }
      this.is_disable =  false;
    }else
    {
      this.filterSelected = 'All';
      this.ownerName = null;
      this.licensePlateNumber = null;
      //this.createdFromDate= null;
     //this.createdToDate = null;
      this.is_disable = true;
    }
  }

  submit() {

    let submitFromDate : string = "" ;
    let submitToDate : string = "";

    let fromDate: Date = new Date(this.createdFromDate);
    let toDate: Date = new Date(this.createdToDate);

    if(!this.is_disable){
      submitFromDate = fromDate.toString();//localStorage.getItem('truckCreatedFrom');
      submitToDate = toDate.toString();//localStorage.getItem('truckCreatedTo');
    }
    if (fromDate > toDate)
    {
      this.showAlert();
    }
    else
     {
    this.storage.set('truckFilterSelected', this.filterSelected);
    this.storage.set('truckOwnerName', this.ownerName);
    this.storage.set('truckRegistrationId', this.truckRegistrationId);
    this.storage.set('truckLicensePlateNumber', this.licensePlateNumber);


    if (this.createdFromDate) {
      localStorage.setItem('truckCreatedFrom', this.createdFromDate);
    } else {
      localStorage.setItem('truckCreatedFrom', '');
    }

    if (this.createdToDate) {
      localStorage.setItem('truckCreatedTo', this.createdToDate);
    } else {
      localStorage.setItem('truckCreatedTo', '');
    }

    this.viewCtrl.dismiss({
      truckFilterSelected: this.filterSelected,
      truckOwnerName: this.ownerName,
      truckRegistrationId: this.truckRegistrationId,
      truckLicensePlateNumber: this.licensePlateNumber,
      truckCreatedFromDate: this.datepipe.transform(submitFromDate, 'dd/MM/yyyy'),
      truckCreatedToDate: this.datepipe.transform(submitToDate, 'dd/MM/yyyy')
    }).catch(() => {
      // console.log('error');
    });
  }
  }
  disableDone() {
    if (this.truckRegistrationId) {
      if (this.truckRegistrationId.startsWith('0')) {
        return true;
      } else if (this.truckRegistrationId.includes('.')) {
        return true;
      }
    }
  }
  showAlert() {

    this.alertMsg = 'From Date should be less than To Date.';
    const alert = this.alertCtrl.create({
      title: 'Alert',
      message: this.alertMsg,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            alert.dismiss();
          }
        }
      ]
    });
    alert.present();
  }

/*  getCurDate() {
    this.currentDate = new Date();
    this.currentDate.setDate(1 + this.currentDate.getDate());
    return this.currentDate.getDate();
  }

  getCurMonth() {
    return this.currentDate.getMonth();
  }

  getCurYear() {
    return this.currentDate.getFullYear()
  }


  /!*
  DateSplitter Function
  segment - 0 : day
            1 : month
            2 : year
  dateString can be any date stored in dd/mm/yyyy format*!/
  dateSplitter(dateString: string, segment: number): string {
    if ((segment == 0) || (segment == 1) || (segment == 2)) {
      let dateSegment = dateString.split("/");
     // console.log("dateSlpitter <<" + dateSegment[segment] + ">>");
      return dateSegment[segment];
    }
    else {
      return "Invalid";
    }
  }*/

  keyboardClose() {
    this.keyboard.close();
  }

  disabledSubmit() {
    if (this.groupOne.valid) {
        return false;
    } else {
        return true;
    }
  }

}
