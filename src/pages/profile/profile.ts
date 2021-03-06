import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { MorePage } from '../more/more';
import {Utils} from "../../shared/utils";
import {Http} from "@angular/http";
import {NotificationSelectedItemDetailsPage} from "./notificationSelectedItemDetails/notificationSelectedItemDetails";
import {TruckSearchResultsPage} from "../trucksearchresult/trucksearchresult";
import {BerthsearchPage} from "../berthsearch/berthsearch";
import {SsrSearchResultPage} from "../ssr/ssr-searchresult/ssrsearchresult";
import {VesselsearchviewPage} from "../vesselsearchview/vesselsearchview";
import {RBsearchresultPage} from "../rbsearchresult/rbsearchresult";
import {HoldContainerSearchresultPage} from "../holdcontainer/holdcontainersearchresult/holdcontainersearchresult";
import {NotificationsortPage} from "./notificationsort/notificationssort";
import {NotificationFilterPage} from "./notificationfilter/notificationfilter";
import {SortModel} from "../../shared/model/sort.model";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers: [Utils,SortModel],
})

export class ProfilePage {

  popover: any;
  notificationDatas: any;
  notificationData: any = {
    "notifications":[
      {
        "module":"Vessel Registration",
        "title":"New Vessel registration request",
        "data":"Vessel Registration request VR5701 has been raised.",
        "date":"10/09/2017 22:56",
        "time":"2min",
        "url":"/vessel/vesselregistration.html",
        "theme":"color1",
        "status":"unread",
        "priority":"High",
        "requestId":"VR5701",
        "modType":"Vessel",
        "modValue":"Anders Maersk",
        "timeType":"ETA",
        "timeValue":"25/12/2017"
      },{
        "module":"Berth Booking",
        "title":"Request Cancelled",
        "data":"The berth booking request BB3789 has been cancelled.",
        "date":"10/09/2017 20:06",
        "time":"40min",
        "url":"/berthbooking/berthbooking.html",
        "theme":"color2",
        "status":"unread",
        "priority":"Medium",
        "requestId":"BB3789",
        "modType":"Vessel",
        "modValue":"Anders Maersk",
        "timeType":"ETA",
        "timeValue":"25/12/2017"
      },{
        "module":"Special Service Request",
        "title":"Request pending for approval",
        "data":"New resource booking request BB3819 awaiting for your approval.",
        "date":"10/09/2017 20:06",
        "time":"1hrs",
        "url":"/specialServiceRequest/specialServiceRequest.html",
        "theme":"color2",
        "status":"unread",
        "priority":"Medium"
      },{
        "module":"Berth Booking",
        "title":"New Request received",
        "data":"New request BB3769 received for the berth booking.",
        "date":"10/09/2017 18:16",
        "time":"50min",
        "url":"/berthbooking/berthbooking.html",
        "theme":"color2",
        "status":"unread",
        "priority":"Medium",
        "requestId":"BB3769",
        "modType":"Vessel",
        "modValue":"Anders Maersk",
        "timeType":"ETA",
        "timeValue":"25/12/2017"
      },{
        "module":"Berth Booking",
        "title":"Berth Booked",
        "data":"The berth B1 has been booked for the vessel .",
        "date":"10/09/2017 20:45",
        "time":"5min",
        "url":"/berthbooking/berthbooking.html",
        "theme":"color2",
        "status":"unread",
        "priority":"High",
        "requestId":"BB123456",
        "modType":"Vessel",
        "modValue":"Anders Maersk",
        "timeType":"ETA",
        "timeValue":"25/12/2017"
      },{
        "module":"Truck Registration",
        "title":"New Request received",
        "data":"New request TR3769 received for the truck registration.",
        "date":"10/09/2017 22:56",
        "time":"1hrs",
        "url":"/truck/truckregistration.html",
        "theme":"color3",
        "status":"unread",
        "priority":"Medium",
        "requestId":"TR3769",
        "modType":"Truck",
        "modValue":"Anders Maersk",
        "timeType":"ETA",
        "timeValue":"25/12/2017"
      },{
        "module":"Berth Booking",
        "title":"Request Rejected",
        "data":"Berth Booking BB3214 has been rejected by the approver",
        "date":"10/09/2017 20:45",
        "time":"2hrs",
        "url":"/berthbooking/berthbooking.html",
        "theme":"color2",
        "status":"unread",
        "priority":"Low",
        "requestId":"BB3214",
        "modType":"Vessel",
        "modValue":"Anders Maersk",
        "timeType":"ETA",
        "timeValue":"25/12/2017"
      },{
        "module":"Vessel Registration",
        "title":"Vessel Registered",
        "data":"The vessel with IMO 8919506 has been registered .",
        "date":"10/09/2017 21:06",
        "time":"2hrs",
        "url":"/vessel/vesselregistration.html",
        "theme":"color1",
        "status":"unread",
        "priority":"Low",
        "requestId":"8919506",
        "modType":"Vessel",
        "modValue":"Anders Maersk",
        "timeType":"ETA",
        "timeValue":"25/12/2017"
      },{
        "module":"Truck Registration",
        "title":"Truck Registered",
        "data":"The Truck AE28191 has been registered",
        "date":"10/09/2017 20:06",
        "time":"15min",
        "url":"/truck/truckregistration.html",
        "theme":"color3",
        "status":"unread",
        "priority":"High",
        "requestId":"AE28191",
        "modType":"Truck",
        "modValue":"Anders Maersk",
        "timeType":"ETA",
        "timeValue":"25/12/2017"
      },{
        "module":"Truck Registration",
        "title":"Request pending for approval",
        "data":"New request BB3819 awaiting for your approval.",
        "date":"10/09/2017 21:06",
        "time":"1hrs",
        "url":"/truck/truckregistration.html",
        "theme":"color3",
        "status":"unread",
        "priority":"Medium",
        "requestId":"BB3819",
        "modType":"Truck",
        "modValue":"Anders Maersk",
        "timeType":"ETA",
        "timeValue":"25/12/2017"
      },{
        "module":"Terminal Invoice",
        "title":"Offline payment Approved",
        "data":"Offline payment approved for the request no 18224",
        "date":"10/09/2017 20:06",
        "time":"2hrs",
        "url":"/terminalIP/terminalInvoicePayment.html",
        "theme":"color4",
        "status":"unread",
        "priority":"Medium",
        "requestId":"18224",
        "modType":"Vessel",
        "modValue":"Anders Maersk",
        "timeType":"ETA",
        "timeValue":"25/12/2017"
      },{
        "module":"Berth Booking",
        "title":"Request pending for approval",
        "data":"New berth booking request BB3819 awaiting for your approval.",
        "date":"10/09/2017 21:06",
        "time":"2hrs",
        "url":"/berthbooking/berthbooking.html",
        "theme":"color2",
        "status":"unread",
        "priority":"Low",
        "requestId":"BB3819",
        "modType":"Vessel",
        "modValue":"Anders Maersk",
        "timeType":"ETA",
        "timeValue":"25/12/2017"
      },{
        "module":"Truck Registration",
        "title":"Request Cancelled",
        "data":"The truck registration request TR789 has been cancelled.",
        "date":"10/09/2017 18:16",
        "time":"25min",
        "url":"/truck/truckregistration.html",
        "theme":"color3",
        "status":"read",
        "priority":"High",
        "requestId":"TR789",
        "modType":"Truck",
        "modValue":"Anders Maersk",
        "timeType":"ETA",
        "timeValue":"25/12/2017"
      },{
        "module":"Terminal Invoice",
        "title":"Offline Payment received",
        "data":"Offline Payment  received for the request no 16723",
        "date":"10/09/2017 20:45",
        "time":"4hrs",
        "url":"/terminalIP/terminalInvoicePayment.html",
        "theme":"color4",
        "status":"read",
        "priority":"Low",
        "requestId":"16723",
        "modType":"Vessel",
        "modValue":"Anders Maersk",
        "timeType":"ETA",
        "timeValue":"25/12/2017"
      },{
        "module":"Vessel Registration",
        "title":"New Vessel registration request",
        "data":"Vessel Registration request VR5701 has been raised.",
        "date":"10/09/2017 22:56",
        "time":"2min",
        "url":"/vessel/vesselregistration.html",
        "theme":"color1",
        "status":"unread",
        "priority":"High",
        "requestId":"VR5701",
        "modType":"Vessel",
        "modValue":"Anders Maersk",
        "timeType":"ETA",
        "timeValue":"25/12/2017"
      },{
        "module":"Berth Booking",
        "title":"Request Cancelled",
        "data":"The berth booking request BB3789 has been cancelled.",
        "date":"10/09/2017 20:06",
        "time":"40min",
        "url":"/berthbooking/berthbooking.html",
        "theme":"color2",
        "status":"unread",
        "priority":"Medium",
        "requestId":"BB3789",
        "modType":"Vessel",
        "modValue":"Anders Maersk",
        "timeType":"ETA",
        "timeValue":"25/12/2017"
      },{
        "module":"Special Service Request",
        "title":"Request pending for approval",
        "data":"New resource booking request BB3819 awaiting for your approval.",
        "date":"10/09/2017 20:06",
        "time":"1hrs",
        "url":"/specialServiceRequest/specialServiceRequest.html",
        "theme":"color2",
        "status":"unread",
        "priority":"Medium"
      },{
        "module":"Berth Booking",
        "title":"New Request received",
        "data":"New request BB3769 received for the berth booking.",
        "date":"10/09/2017 18:16",
        "time":"50min",
        "url":"/berthbooking/berthbooking.html",
        "theme":"color2",
        "status":"unread",
        "priority":"Medium",
        "requestId":"BB3769",
        "modType":"Vessel",
        "modValue":"Anders Maersk",
        "timeType":"ETA",
        "timeValue":"25/12/2017"
      },{
        "module":"Berth Booking",
        "title":"Berth Booked",
        "data":"The berth B1 has been booked for the vessel .",
        "date":"10/09/2017 20:45",
        "time":"5min",
        "url":"/berthbooking/berthbooking.html",
        "theme":"color2",
        "status":"unread",
        "priority":"High",
        "requestId":"BB123456",
        "modType":"Vessel",
        "modValue":"Anders Maersk",
        "timeType":"ETA",
        "timeValue":"25/12/2017"
      },{
        "module":"Truck Registration",
        "title":"New Request received",
        "data":"New request TR3769 received for the truck registration.",
        "date":"10/09/2017 22:56",
        "time":"1hrs",
        "url":"/truck/truckregistration.html",
        "theme":"color3",
        "status":"unread",
        "priority":"Medium",
        "requestId":"TR3769",
        "modType":"Truck",
        "modValue":"Anders Maersk",
        "timeType":"ETA",
        "timeValue":"25/12/2017"
      },{
        "module":"Berth Booking",
        "title":"Request Rejected",
        "data":"Berth Booking BB3214 has been rejected by the approver",
        "date":"10/09/2017 20:45",
        "time":"2hrs",
        "url":"/berthbooking/berthbooking.html",
        "theme":"color2",
        "status":"unread",
        "priority":"Low",
        "requestId":"BB3214",
        "modType":"Vessel",
        "modValue":"Anders Maersk",
        "timeType":"ETA",
        "timeValue":"25/12/2017"
      },{
        "module":"Vessel Registration",
        "title":"Vessel Registered",
        "data":"The vessel with IMO 8919506 has been registered .",
        "date":"10/09/2017 21:06",
        "time":"2hrs",
        "url":"/vessel/vesselregistration.html",
        "theme":"color1",
        "status":"unread",
        "priority":"Low",
        "requestId":"8919506",
        "modType":"Vessel",
        "modValue":"Anders Maersk",
        "timeType":"ETA",
        "timeValue":"25/12/2017"
      },{
        "module":"Truck Registration",
        "title":"Truck Registered",
        "data":"The Truck AE28191 has been registered",
        "date":"10/09/2017 20:06",
        "time":"15min",
        "url":"/truck/truckregistration.html",
        "theme":"color3",
        "status":"unread",
        "priority":"High",
        "requestId":"AE28191",
        "modType":"Truck",
        "modValue":"Anders Maersk",
        "timeType":"ETA",
        "timeValue":"25/12/2017"
      },{
        "module":"Truck Registration",
        "title":"Request pending for approval",
        "data":"New request BB3819 awaiting for your approval.",
        "date":"10/09/2017 21:06",
        "time":"1hrs",
        "url":"/truck/truckregistration.html",
        "theme":"color3",
        "status":"unread",
        "priority":"Medium",
        "requestId":"BB3819",
        "modType":"Truck",
        "modValue":"Anders Maersk",
        "timeType":"ETA",
        "timeValue":"25/12/2017"
      },{
        "module":"Terminal Invoice",
        "title":"Offline payment Approved",
        "data":"Offline payment approved for the request no 18224",
        "date":"10/09/2017 20:06",
        "time":"2hrs",
        "url":"/terminalIP/terminalInvoicePayment.html",
        "theme":"color4",
        "status":"unread",
        "priority":"Medium",
        "requestId":"18224",
        "modType":"Vessel",
        "modValue":"Anders Maersk",
        "timeType":"ETA",
        "timeValue":"25/12/2017"
      },{
        "module":"Berth Booking",
        "title":"Request pending for approval",
        "data":"New berth booking request BB3819 awaiting for your approval.",
        "date":"10/09/2017 21:06",
        "time":"2hrs",
        "url":"/berthbooking/berthbooking.html",
        "theme":"color2",
        "status":"unread",
        "priority":"Low",
        "requestId":"BB3819",
        "modType":"Vessel",
        "modValue":"Anders Maersk",
        "timeType":"ETA",
        "timeValue":"25/12/2017"
      },{
        "module":"Truck Registration",
        "title":"Request Cancelled",
        "data":"The truck registration request TR789 has been cancelled.",
        "date":"10/09/2017 18:16",
        "time":"25min",
        "url":"/truck/truckregistration.html",
        "theme":"color3",
        "status":"read",
        "priority":"High",
        "requestId":"TR789",
        "modType":"Truck",
        "modValue":"Anders Maersk",
        "timeType":"ETA",
        "timeValue":"25/12/2017"
      },{
        "module":"Terminal Invoice",
        "title":"Offline Payment received",
        "data":"Offline Payment  received for the request no 16723",
        "date":"10/09/2017 20:45",
        "time":"4hrs",
        "url":"/terminalIP/terminalInvoicePayment.html",
        "theme":"color4",
        "status":"read",
        "priority":"Low",
        "requestId":"16723",
        "modType":"Vessel",
        "modValue":"Anders Maersk",
        "timeType":"ETA",
        "timeValue":"25/12/2017"
      }
    ],
    "workflow":[
      {
        "module":"Resource Booking",
        "title":"Request pending for approval",
        "data":"New resource booking request BB3819 awaiting for your approval.",
        "date":"10/09/2017 22:56",
        "time":"5min",
        "url":"/resourceBooking/resourceBooking.html",
        "theme":"color1",
        "status":"unread",
        "priority":"High"
      },{
        "module":"Resource Booking",
        "title":"Resource booking rejected",
        "data":"Resource booking rejected for the request no RB 39087",
        "date":"10/09/2017 20:45",
        "time":"8min",
        "url":"/resourceBooking/resourceBooking.html",
        "theme":"color1",
        "status":"unread",
        "priority":"High"
      },{
        "module":"Hold Container",
        "title":"Hold Container approved",
        "data":"Booking approved for the request no RB26780",
        "date":"10/09/2017 20:06",
        "time":"30min",
        "url":"/holdContainer/holdContainer.html",
        "theme":"color3",
        "status":"unread",
        "priority":"High"
      },{
        "module":"Special Service Request",
        "title":"Request approved",
        "data":"Special service request approved for the request no RB26780",
        "date":"10/09/2017 18:16",
        "time":"1hrs",
        "url":"/specialServiceRequest/specialServiceRequest.html",
        "theme":"color2",
        "status":"unread",
        "priority":"Medium"
      },{
        "module":"Resource Booking",
        "title":"Resource booking  approved",
        "data":"Booking approved for the request no RB26780",
        "date":"10/09/2017 21:06",
        "time":"2hrs",
        "url":"/resourceBooking/resourceBooking.html",
        "theme":"color1",
        "status":"unread",
        "priority":"Low"
      },{
        "module":"Hold Container",
        "title":"Request pending for approval",
        "data":"New Hold Container request BB3819 awaiting for your approval.",
        "date":"10/09/2017 21:06",
        "time":"2hrs",
        "url":"/holdContainer/holdContainer.html",
        "theme":"color3",
        "status":"unread",
        "priority":"Low"
      },{
        "module":"Hold Container",
        "title":"Hold Container rejected",
        "data":"The request no HR3678 is rejected.",
        "date":"10/09/2017 20:45",
        "time":"5hrs",
        "url":"/holdContainer/holdContainer.html",
        "theme":"color3",
        "status":"unread",
        "priority":"Low"
      }
    ],
    "settings":[
      {
        "title":"Password Change",
        "url":"/password_change.html"
      },{
        "title":"Manage Notification",
        "url":"/manageSubscription/manageSubscription.html"
      },{
        "title":"My Plan",
        "url":"/client-registration/myPlan.html"
      }
    ]
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public rbSortModal: SortModel,

              public popoverCtrl: PopoverController,public http: Http, public utils:Utils) {
    this.notificationDatas = this.http.get('assets/data/notificationDataSample.json').map(res=> {
        console.log("mock data" + res.json());
        this.notificationData  = res.json();
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  getNotificationIconClass(theme){
    return "notifi-icon "+theme;
  }

  setField(fieldName) {
    var modNameSplit = fieldName.split(' ');
    var modName = '';
    for (var i = 0; i < modNameSplit.length; i++) {
      modName = modName + modNameSplit[i].charAt(0);
    }
    return modName;
  }

  checkReadStatus(status)
  {
   if(status=='unread'){
     return true;
   }
  }

  getStatusIcon()
  {
    return "code-download";
  }

  more(myEvent){
      let popover = this.popoverCtrl.create(MorePage);
      popover.present({
        ev: myEvent
      });
  }

  openPopupView(myEvent , notificationDatas) {
    this.popover = this.popoverCtrl.create(NotificationSelectedItemDetailsPage,{
      notificationItemData:notificationDatas,
    // }, {cssClass: 'notification-details-popover '+notificationDatas.theme});
    }, {cssClass: 'notification-details-popover color5'});
    this.popover.present({
      ev: myEvent
    });
    this.popover.onDidDismiss((data) => {
    });
  }

  navigateToSort() {
    this.rbSortModal.fromSort = false;
    this.rbSortModal.sortOrder = false;
    this.rbSortModal.sortOption = "";
    this.navCtrl.push(NotificationsortPage,{sortModal: this.rbSortModal});
  }

  navigateToFilter() {
    this.rbSortModal.fromSort = false;
    this.navCtrl.push(NotificationFilterPage, {Request: ''});
  }

  gotoSelectedItemPage(url)
  {
    if(url == "/truck/truckregistration.html"){
      this.navCtrl.push(TruckSearchResultsPage);
    } else if(url == "/berthbooking/berthbooking.html"){
      this.navCtrl.push(BerthsearchPage);
    } else if(url == "/specialServiceRequest/specialServiceRequest.html"){
      this.navCtrl.push(SsrSearchResultPage);
    } else if(url == "/terminalIP/terminalInvoicePayment.html"){
      ////Need to add page call
    } else if(url == "/vessel/vesselregistration.html"){
      this.navCtrl.push(VesselsearchviewPage);
    } else if(url == "/resourceBooking/resourceBooking.html"){
      this.navCtrl.push(RBsearchresultPage);
    } else if(url == "/holdContainer/holdContainer.html"){
      this.navCtrl.push(HoldContainerSearchresultPage);
    } else {
      console.log('selection not registered');
    }
  }

}
