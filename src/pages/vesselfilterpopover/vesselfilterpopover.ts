import {Component} from '@angular/core';
import {ViewController, IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {DatePipe} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Keyboard} from '@ionic-native/keyboard';
import {Utils} from "../../shared/utils";

/*
* ===========================================================================
* Copyright 2017 Dubai Trade.
* All Rights Reserved
* ===========================================================================
*
*  vesselfilterpopover.ts file contains VesselFilterPopoverPage class which holds functions to
*  populate the data, and handle the UI navigation logic for vessel filter popover UI.
*
*/
@IonicPage()
@Component({
  selector: 'page-vesselfilterpopover',
  templateUrl: 'vesselfilterpopover.html',
  providers: [Utils],
})

export class VesselFilterPopoverPage {
  pattern = /06([0-9]{7})/;
  regIDpattern = /^[0-9 ]*$/i;
  pages: Array<{ title: string, showDetails: boolean }>;
  showSubmenu: any;
  previousValueforIMO: string = '';
  previousValueforRegID: string = '';
  previousValueforName: string = '';

  filterSelected: any;
  vesselName: string;
  vesselImo: string;
  vesselReg: string;
  vesselType: string;
  maxvalue: any;
  alertMsg: string;
  alerttitle:string;
  alertbutton:string;
  date: Date;
  dateFormat: string = 'DD/MM/YYYY';
  page1:string;
  page2:string;
  page3:string;
  page4:string;
  page5:string;
  page6:string;

  public createdFromDate: any;
  public createdToDate: any;
  groupOne: FormGroup;

  constructor(public keyboard: Keyboard, public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl: ViewController, private storage: Storage, public datepipe: DatePipe,
              public formBuilder: FormBuilder,
              public alertCtrl: AlertController,
              public utils: Utils) {

    let previous_val = this.navParams.get('previous_search');
    this.alertMsg=this.utils.getLocaleString("vesselfilteralert");
    this.alerttitle=this.utils.getLocaleString("alert");
    this.alertbutton=this.utils.getLocaleString("alertok");
    this.page1=this.utils.getLocaleString("vfilterpage1");
    this.page2=this.utils.getLocaleString("vfilterpage2");
    this.page3=this.utils.getLocaleString("vfilterpage3");
    this.page4=this.utils.getLocaleString("vfilterpage4");
    this.page5=this.utils.getLocaleString("vfilterpage5");
    this.page6=this.utils.getLocaleString("vfilterpage6");
    this.pages = [
      {title: this.page1, showDetails: false},
      {title: this.page2, showDetails: false},
      {title: this.page3, showDetails: false},
      {title: this.page4, showDetails: false},
      {title: this.page5, showDetails: false},
      {title: this.page6, showDetails: false}
    ];

    this.maxvalue = new Date().toISOString();

    this.groupOne = formBuilder.group({
      imosin: ['', Validators.compose( [Validators.maxLength(7), Validators.pattern(/^[0-9 ]*$/)])],
      name: ['', Validators.compose([Validators.maxLength(50), Validators.pattern(/^[a-z0-9 ]*$/)])],
      regid: ['', Validators.compose([Validators.pattern(this.regIDpattern)])]
    });

    storage.get('filterSelected').then((val) => {
      if (val) {
        this.filterSelected = val;
      } else {
        this.filterSelected = 'All';
      }
    });
    //ios code change  -- start
    //Code added to solve the persistence issue for is filter popover
    if (this.filterSelected == null) {
      if (previous_val && previous_val.vesselRegistrationStatusSearch) {
        this.filterSelected = previous_val.vesselRegistrationStatusSearch;
      } else {
        this.filterSelected = 'All';
      }
    }
    //ios code change  -- end

    storage.get('vesselName').then((val) => {
      this.vesselName = val;
    });
    //ios code change  -- start
    //Code added to solve the persistence issue for is filter popover
    if (this.vesselName == null) {
      this.vesselName = previous_val.vesselName;
    }
    //ios code change  -- end

    storage.get('vesselImo').then((val) => {
      this.vesselImo = val;
    });
    //ios code change  -- start
    //Code added to solve the persistence issue for is filter popover
    if (this.vesselImo == null) {
      this.vesselImo = previous_val.imoNo;
    }
    //ios code change  -- end


    storage.get('vesselReg').then((val) => {
      this.vesselReg = val;
    });
    //ios code change  -- start
    //Code added to solve the persistence issue for is filter popover
    if (this.vesselReg == null) {
      this.vesselReg = previous_val.vesselRegistrationId;
    }
    //ios code change  -- end


    storage.get('vesselType').then((val) => {
      if (val) {
        this.vesselType = val;
      } else {
        this.vesselType = 'All';
      }
    });
    //ios code change  -- start
    //Code added to solve the persistence issue for is filter popover
    if (this.vesselType == null) {
      this.vesselType = previous_val.vesselType;
    }
    //ios code change  -- end

    if (null == localStorage.getItem('vesselCreatedFrom') || ("" == localStorage.getItem('vesselCreatedFrom'))) {

      this.createdFromDate = new Date();
      this.createdFromDate.setDate(this.createdFromDate.getDate() - 7);
      this.createdFromDate = this.createdFromDate.toISOString();
    }
    else {
      this.createdFromDate = localStorage.getItem('vesselCreatedFrom');
      this.createdFromDate = new Date(this.createdFromDate);
      this.createdFromDate = this.datepipe.transform(this.createdFromDate, 'yyyy-MM-dd');
    }

    if (null == localStorage.getItem('vesselCreatedTo') || ("" == localStorage.getItem('vesselCreatedTo'))) {
      this.createdToDate = new Date().toISOString();
    }
    else {
      this.createdToDate = localStorage.getItem('vesselCreatedTo');
      this.createdToDate = new Date(this.createdToDate);
      this.createdToDate = this.datepipe.transform(this.createdToDate, 'yyyy-MM-dd');
    }

  }

  keyUpChecker(ev) {
    let elementChecker: string;
    let format = /^[a-z0-9 ]*$/i;
    elementChecker = ev.target.value;
    let currentKeyCode = ev.keyCode;
    if (currentKeyCode >= 48 && currentKeyCode <= 57) {
      this.vesselName = ev.target.value;
    }
    if (currentKeyCode >= 65 && currentKeyCode <= 90) {
      this.vesselName = ev.target.value;
    }
    if (currentKeyCode >= 96 && currentKeyCode <= 105) {
      this.vesselName = ev.target.value;
    }
    if (currentKeyCode == 32) {
      this.vesselName = ev.target.value;
    }
    if (!format.test(elementChecker)) {
      this.vesselName = this.previousValueforName;
    }
    else {
      this.previousValueforName = this.vesselName;
    }
  }

  keyUpCheckforNumber(ev) {
    let elementChecker: string;
    let numberFormat = /^[0-9 ]*$/i;
    elementChecker = ev.target.value;
    if (elementChecker.endsWith(".")) {
      this.vesselImo = elementChecker.slice(0, -1);
    }
    if (!numberFormat.test(elementChecker)) {
      this.vesselImo = this.previousValueforIMO;
    }
    else {
      this.previousValueforIMO = this.vesselImo;
    }
  }

  keyUpValidate(e, format, model) {
    this.utils.keyUpValidate(e, format);
    if (model == 'vesselReg') {
      this.vesselReg = e.target.value;
    }
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
    if (page.title == this.page1) {
      this.pages[0].showDetails = !this.pages[0].showDetails;
      this.pages[1].showDetails = false;
      this.pages[2].showDetails = false;
      this.pages[3].showDetails = false;
      this.pages[4].showDetails = false;
      this.pages[5].showDetails = false;
    } else if (page.title == this.page2) {
      this.pages[0].showDetails = false;
      this.pages[1].showDetails = !this.pages[1].showDetails;
      this.pages[2].showDetails = false;
      this.pages[3].showDetails = false;
      this.pages[4].showDetails = false;
      this.pages[5].showDetails = false;
    } else if (page.title == this.page3) {
      this.pages[0].showDetails = false;
      this.pages[1].showDetails = false;
      this.pages[2].showDetails = !this.pages[2].showDetails;
      this.pages[3].showDetails = false;
      this.pages[4].showDetails = false;
      this.pages[5].showDetails = false;
    } else if (page.title == this.page4) {
      this.pages[0].showDetails = false;
      this.pages[1].showDetails = false;
      this.pages[2].showDetails = false;
      this.pages[3].showDetails = !this.pages[3].showDetails;
      this.pages[4].showDetails = false;
      this.pages[5].showDetails = false;
    } else if (page.title == this.page5) {
      this.pages[0].showDetails = false;
      this.pages[1].showDetails = false;
      this.pages[2].showDetails = false;
      this.pages[3].showDetails = false;
      this.pages[4].showDetails = !this.pages[4].showDetails;
      this.pages[5].showDetails = false;
    } else if (page.title == this.page6) {
      this.pages[0].showDetails = false;
      this.pages[1].showDetails = false;
      this.pages[2].showDetails = false;
      this.pages[3].showDetails = false;
      this.pages[4].showDetails = false;
      this.pages[5].showDetails = !this.pages[5].showDetails;
    }
    this.storage.set('submenu', page);
  }

  clear() {

    //Clearing previous values for RegID, IMO and Vessel Name
    this.previousValueforRegID = "";
    this.previousValueforIMO = "";
    this.previousValueforName = "";

    this.filterSelected = 'All';
    this.vesselType = 'All';
    this.vesselImo = null;
    this.vesselName = null;
    this.vesselReg = null;
    this.createdFromDate = new Date();
    this.createdFromDate.setDate(this.createdFromDate.getDate() - 7);
    this.createdFromDate = this.createdFromDate.toISOString();
    this.createdToDate = new Date().toISOString();

    this.pages[0].showDetails = false;
    this.pages[1].showDetails = false;
    this.pages[2].showDetails = false;
    this.pages[3].showDetails = false;
    this.pages[4].showDetails = false;
    this.pages[5].showDetails = false;
    this.storage.remove('filterSelected');
    this.storage.remove('vesselName');
    this.storage.remove('vesselImo');
    this.storage.remove('vesselReg');
    this.storage.remove('vesselType');
    localStorage.setItem('vesselCreatedFrom', '');
    localStorage.setItem('vesselCreatedTo', '');

  }

  submit() {

    let fromDate: Date = new Date(this.createdFromDate);
    let toDate: Date = new Date(this.createdToDate);

    if (fromDate > toDate)
    {
      this.showAlert();
    }
    else if (fromDate <= toDate )
    {
    this.storage.set('filterSelected', this.filterSelected);
    this.storage.set('vesselName', this.vesselName);
    this.storage.set('vesselImo', this.vesselImo);
    this.storage.set('vesselReg', this.vesselReg);
    this.storage.set('vesselType', this.vesselType);

    if (this.createdFromDate) {
      localStorage.setItem('vesselCreatedFrom', this.createdFromDate);
    } else {
      localStorage.setItem('vesselCreatedFrom', '');
    }

    if (this.createdToDate) {
      localStorage.setItem('vesselCreatedTo', this.createdToDate);
    } else {
      localStorage.setItem('vesselCreatedTo', '');
    }

    this.viewCtrl.dismiss({
      statusFilter: this.filterSelected,
      vesselName: this.vesselName,
      vesselImo: this.vesselImo,
      vesselReg: this.vesselReg,
      vesselType: this.vesselType,
      vesselCreatedFromDate: this.datepipe.transform(localStorage.getItem('vesselCreatedFrom'), 'dd/MM/yyyy'),
      vesselCreatedToDate: this.datepipe.transform(localStorage.getItem('vesselCreatedTo'), 'dd/MM/yyyy')
    });
  }
  }
  showAlert() {
   const alert = this.alertCtrl.create({
      title: this.alerttitle,
      message: this.alertMsg,
      buttons: [
        {
          text: this.alertbutton,
          handler: () => {
            alert.dismiss();
          }
        }
      ]
    });
    alert.present();
  }

  keyboardClose() {
    this.keyboard.close();
  }
}
