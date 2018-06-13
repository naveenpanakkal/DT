import {Component, ViewChild} from '@angular/core';
import {App, IonicPage, NavController, NavParams, Slides} from 'ionic-angular';
import {Http} from '@angular/http';
import {JwtHelper} from 'angular2-jwt';
import {TruckSearchResultsPage} from '../trucksearchresult/trucksearchresult';
import {VesselsearchviewPage} from '../vesselsearchview/vesselsearchview';
import {BerthsearchPage} from '../berthsearch/berthsearch';
import {VoyagesearchresultPage} from "../voyagesearchresult/voyagesearchresult";
import {CasearchresultPage} from "../casearchresult/casearchresult";
import {Utils} from "../../shared/utils";
import {VesselloaddischargesummarysearchresultPage} from "../vesselloaddischargesummarysearchresult/vesselloaddischargesummarysearchresult";
import {ShipServSchedSearchResultViewPage} from "../shipservschedsearchresultview/shipservschedsearchresultview";
import {CSHResultsPage} from "../cshresults/cshresults";
import {DosearchresultPage} from "../dosearchresult/dosearchresult";
import {TasearchresultPage} from "../tasearchresult/tasearchresult";
import {RBsearchresultPage} from "../rbsearchresult/rbsearchresult";
import {GiGoSearchResultPage} from "../gigo/gigosearchresult/gigosearchresult";
import {RCHsearchresultPage} from "../rch/rchsearchresult/rchsearchresult";
import {HoldContainerSearchresultPage} from "../holdcontainer/holdcontainersearchresult/holdcontainersearchresult";
import {SsrSearchResultPage} from "../ssr/ssr-searchresult/ssrsearchresult";
import {YsrFilterPage} from "../ysr/ysr-filter/ysr-filter";


/*
* ===========================================================================
* Copyright 2017 Dubai Trade.
* All Rights Reserved
* ===========================================================================
*
*  services.ts file contains ServicesPage class which holds functions to
*  populate the data, and handle the UI navigation logic the request page.
*  This page list the available services/modules for the current logged in user.
*
*/
@IonicPage()
@Component({
  selector: 'page-services',
  templateUrl: 'services.html',
  providers: [Utils],
})
export class ServicesPage {
  @ViewChild('newAdSlider') slider: Slides;

  services: Array<{ icon: string, caption: string, shortform: string }>;
  temparray: Array<{ icon: string, caption: string, shortform: string }>;
  availedservices: any[] = [];

  registeredservices: any[] = [];
  tempArray1: any[] = [];
  tempArray2: any[] = [];

  data: any;

  skills: any;
  jwtHelper: JwtHelper = new JwtHelper();
  decodedtoken: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public app: App, public http: Http, public utils:Utils) {

    this.services = [
      {icon: 'assets/img/Client registration and management module.svg', caption: 'WCP Event Notification', shortform: 'CLNT_RG'},
      {icon: 'assets/img/Vessel Registration.svg', caption: 'Vessel Registration', shortform: 'VSSL_RG'},
      {icon: 'assets/img/Truck Registration.svg', caption: 'Truck Registration', shortform: 'TRK_RG'},
      {icon: 'assets/img/Berth Booking.svg', caption: 'Berth Booking', shortform: 'BRTH_BKNG'},
      {icon: 'assets/img/Import Delivery Order.svg', caption: 'Delivery Order', shortform: 'IDO'},
      {icon: 'assets/img/Container Acceptance.svg', caption: 'Container Acceptance', shortform: 'CONT_ACC'},
      {icon: 'assets/img/Vessel_Voyage Schedule view.svg', caption: 'Voyage Enquiry', shortform: 'VYG_ENQ'},
      {icon: 'assets/img/Container Special Handling.svg', caption: 'Container Special Handling', shortform: 'CONT_SH'},
      {icon: 'assets/img/Resource_Booking.svg', caption: 'Resource Booking', shortform: 'RES_BKNG'},
      {icon: 'assets/img/Truck Appointment.svg', caption: 'Truck Appointment', shortform: 'TRK_APT'},
      {icon: 'assets/img/Special Service Request.svg', caption: 'Special Service Request', shortform: 'SSR_RG'},
      {icon: 'assets/img/Shipping Service Schedule.svg', caption: 'Shipping Service Schedule', shortform: 'SSS'},
      {icon: 'assets/img/Hold&Release Container.svg', caption: 'Hold Container', shortform: 'HRC'},
      {icon: 'assets/img/Hold&Release Container.svg', caption: 'Release Container Hold', shortform: 'HRC'},
      {icon: 'assets/img/Vessel load_Dischang Summary.svg', caption: 'Vessel Load Discharge Summary', shortform: 'VSSL_VLDS'},
      {icon: 'assets/img/Resource_Booking.svg', caption: 'Gate In Gate Out', shortform: 'GIGO'},
      {icon: 'assets/img/Export Status Report.svg', caption: 'Yard Inventory Status Report', shortform: 'YISR'},

    ];
    //{icon: 'assets/img/Export Status Report.svg', caption: 'Export Status Report', shortform: 'IEBM'},
    //{icon: 'assets/img/Resource_Booking.svg', caption: 'Container Release', shortform: 'CONT_REL'},
    /*    {icon: 'assets/img/Terminal Invoice&Payment.svg', caption: 'Terminal Invoice & Payment', shortform: 'TIP'},
          {icon: 'assets/img/WCP Invoice & Payment.svg', caption: 'WCP Invoice & Payment', shortform: 'WCP'},
          {icon: 'assets/img/Container Details View.svg', caption: 'Yard Inventory Status Report', shortform: 'CDV'},
          {icon: 'assets/img/Equipment Interchange Receipt EIR.svg', caption: 'Equipment Interchange Receipt (EIR)'*/

    this.skills = this.http.get('assets/data/fetchService.json').map(res => res.json());
    this.skills.subscribe((data) => {
      //console.log("what is in the data ", data);
    });

  }

  openservice(ser) {
    if (ser.shortform == 'VSSL_RG') {
      this.navCtrl.push(VesselsearchviewPage);
    } else if (ser.shortform == 'TRK_RG') {
      this.navCtrl.push(TruckSearchResultsPage);
    } else if (ser.shortform == 'IDO') {
      this.navCtrl.push(DosearchresultPage);
    } else if (ser.shortform == 'BRTH_BKNG') {
      this.navCtrl.push(BerthsearchPage);
    } else if (ser.shortform == 'VYG_ENQ') {
      this.navCtrl.push(VoyagesearchresultPage);
    } else if (ser.shortform == 'CONT_ACC') {
      this.navCtrl.push(CasearchresultPage);
    } else if (ser.shortform == 'VSSL_VLDS') {
      this.navCtrl.push(VesselloaddischargesummarysearchresultPage);
    } else if (ser.shortform == 'SSS') {
      this.navCtrl.push(ShipServSchedSearchResultViewPage);
    } else if (ser.shortform == 'CONT_SH') {
      this.navCtrl.push(CSHResultsPage);
    } else if (ser.shortform == 'TRK_APT') {
      this.navCtrl.push(TasearchresultPage);
    } else if (ser.shortform == 'RES_BKNG') {
      this.navCtrl.push(RBsearchresultPage);
    } else if (ser.shortform == 'GIGO') {
      this.navCtrl.push(GiGoSearchResultPage);
    } else if (ser.shortform == 'HRC' && ser.caption== 'Hold Container' ) {
      this.navCtrl.push(HoldContainerSearchresultPage);
    }else if (ser.shortform == 'HRC' && ser.caption== 'Release Container Hold') {
      this.navCtrl.push(RCHsearchresultPage);
    } else if (ser.shortform == 'CONT_REL') {
      //this.navCtrl.push(RCHsearchresultPage);
    } else if (ser.shortform == 'SSR_RG') {
      this.navCtrl.push(SsrSearchResultPage);
    } else if (ser.shortform == 'YISR') {
      this.navCtrl.push(YsrFilterPage);
    }else {
      console.log('selection not registered');
    }
  }


  ionViewDidLoad() {
    let x = localStorage.getItem("token");
    this.decodedtoken = this.jwtHelper.decodeToken(x);

    this.availedservices = Object.keys(this.decodedtoken.UserInfo.servicePrivilege);
    this.availedservices.push("YISR");
    for (let i = 0; i < this.availedservices.length; i++) {
      this.temparray = this.services.filter(
        (service: any) => {
          return (service.shortform == this.availedservices[i]);
        });
      for (let i = 0; i < this.temparray.length; i++) {
        this.registeredservices.push(this.temparray[i]);
      }
    }

    let myChunk =[];
    let myChunks =[];
    for (let i = 0; i < this.registeredservices.length; i=i+3) {
      myChunk = this.registeredservices.slice(i, i+3);
      this.tempArray1.push(myChunk);
    }

    for (let i = 0; i < this.tempArray1.length; i=i+3) {
      myChunks = this.tempArray1.slice(i, i+3);
      this.tempArray2.push(myChunks);
    }

  }
  onSlideChanged() {
    let currentIndex = this.slider.getActiveIndex();
    console.log('Current index is', currentIndex);
  }
}
