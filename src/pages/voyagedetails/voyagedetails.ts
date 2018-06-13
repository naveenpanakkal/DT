import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, Navbar} from 'ionic-angular';
import {VoyageEnquirySearchByIdModel} from "../../shared/model/voyage/voyageenquiryserachbyid.model";
import {VoyageServicesProvider} from "../../providers/webservices/voyageservices";
import {VoyageEnquiryDetailsModel} from "../../shared/model/voyage/voyageenquirydetails.model";
import {Slides} from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";
import {Utils} from "../../shared/utils";

/**
 * Generated class for the VoyagedetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-voyagedetails',
  templateUrl: 'voyagedetails.html',
  providers: [VoyageEnquirySearchByIdModel, VoyageEnquiryDetailsModel, VoyageServicesProvider, Utils]
})
export class VoyagedetailsPage {
  agentdetails: boolean = true;
  vesseldetails: boolean = false;
  voyagedetails: boolean = false;
  otherdetails: boolean = false;
  uploadDocStatus: boolean = false;
  rotationNo: string;
  sameUser: boolean;
  dateType: string = " GST";
  public selectedTab: any;
  public tabs: Array<any>;
  public showLeftButton: boolean;
  public showRightButton: boolean;
  public isOpenService: boolean = false;
  @ViewChild('navbar') navBar: Navbar;
  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public voyageEnquirySearchByIdModel: VoyageEnquirySearchByIdModel,
              public voyageEnquiryDetailsModel: VoyageEnquiryDetailsModel,
              public voyageServicesProvider: VoyageServicesProvider,
              public alertCtrl: AlertController, public utils: Utils,
              public translate: TranslateService) {
    // Select it by defaut
    translate.setDefaultLang('en');
    translate.use('en');
    if ( true == this.navParams.get('isOpenService')) {
      this.isOpenService = this.navParams.get('isOpenService');
      this.tabs = ['Agent Information', 'Vessel Information', 'Voyage Details', 'Other Details'];
    } else {
      this.tabs = ['Agent Information', 'Vessel Information', 'Voyage Details', 'Other Details', 'Uploaded Doc Status'];
      this.isOpenService =false;
    }
    this.selectedTab = this.tabs[0];
    // Check which arrows should be shown
    this.showLeftButton = false;
    this.showRightButton = this.tabs.length > 2;
    this.rotationNo = navParams.get('sel_rotationNo');
    this.sameUser = navParams.get('sel_sameUser');
    if (!this.sameUser) {
      this.tabs.pop();
    }
  }

  hideFieldsForOpenService(): boolean {
    if (true == this.navParams.get('isOpenService')) {
      return false;
    } else {
      return this.sameUser;
    }
  }

  hideUploadDocsTab(): boolean {
    if ( true == this.navParams.get('isOpenService')) {
      return true;
    } else {
      return !this.uploadDocStatus;
    }
  }

  public slideChanged(): void {
    let currentIndex = this.slides.getActiveIndex();
    this.showLeftButton = currentIndex !== 0;
    this.showRightButton = !this.slides.isEnd();
  }

  public slideNext(): void {
    this.slides.slideNext();
  }

  // Method that shows the previous slide
  public slidePrev(): void {
    this.slides.slidePrev();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VoyagedetailsPage');
    this.loadRequest();
  }

  showData(tab) {
    if (tab === 'Agent Information') {
      this.agentdetails = true;
      this.vesseldetails = false;
      this.voyagedetails = false;
      this.otherdetails = false;
      this.uploadDocStatus = false;
      this.selectedTab = 'Agent Information';
    } else if (tab === 'Vessel Information') {
      this.agentdetails = false;
      this.vesseldetails = true;
      this.voyagedetails = false;
      this.otherdetails = false;
      this.uploadDocStatus = false;
      this.selectedTab = 'Vessel Information';
    } else if (tab === 'Voyage Details') {
      this.agentdetails = false;
      this.vesseldetails = false;
      this.voyagedetails = true;
      this.otherdetails = false;
      this.uploadDocStatus = false;
      this.selectedTab = 'Voyage Details';
    } else if (tab === 'Other Details') {
      this.agentdetails = false;
      this.vesseldetails = false;
      this.voyagedetails = false;
      this.otherdetails = true;
      this.uploadDocStatus = false;
      this.selectedTab = 'Other Details';
    } else if (tab === 'Uploaded Doc Status') {
      this.agentdetails = false;
      this.vesseldetails = false;
      this.voyagedetails = false;
      this.otherdetails = false;
      this.uploadDocStatus = true;
      this.selectedTab = 'Uploaded Doc Status';
    }
  }

  firstpage() {
    this.agentdetails = true;
    this.vesseldetails = false;
    this.voyagedetails = false;
    this.otherdetails = false;
    this.uploadDocStatus = false;
  }

  secondpage() {
    this.agentdetails = false;
    this.vesseldetails = true;
    this.voyagedetails = false;
    this.otherdetails = false;
    this.uploadDocStatus = false;
  }

  thirdpage() {
    this.agentdetails = false;
    this.vesseldetails = false;
    this.voyagedetails = true;
    this.otherdetails = false;
    this.uploadDocStatus = false;
  }

  fourthpage() {
    this.agentdetails = false;
    this.vesseldetails = false;
    this.voyagedetails = false;
    this.otherdetails = true;
    this.uploadDocStatus = false;
  }

  fifthpage() {
    this.agentdetails = false;
    this.vesseldetails = false;
    this.voyagedetails = false;
    this.otherdetails = false;
    this.uploadDocStatus = true;
  }

  loadRequest() {
    this.voyageEnquirySearchByIdModel.requestNo = this.rotationNo;
    this.voyageServicesProvider.voyagSearchById(this.voyageEnquirySearchByIdModel, this.isOpenService)
      .subscribe(response => {
          this.voyageEnquiryDetailsModel = <VoyageEnquiryDetailsModel>response;
          if (this.voyageEnquiryDetailsModel == null) {
            const alert = this.alertCtrl.create({
              title: 'Alert',
              subTitle: 'No data for current filter',
              buttons: ['OK']
            });
            alert.present();
          }
          else {
            if (null != this.voyageEnquiryDetailsModel.eta && this.voyageEnquiryDetailsModel.eta.length > 0) {
              this.voyageEnquiryDetailsModel.eta = this.voyageEnquiryDetailsModel.eta + this.dateType;
            }
            if (null != this.voyageEnquiryDetailsModel.etb && this.voyageEnquiryDetailsModel.etb.length > 0) {
              this.voyageEnquiryDetailsModel.etb = this.voyageEnquiryDetailsModel.etb + this.dateType;
            }
            if (null != this.voyageEnquiryDetailsModel.etd && this.voyageEnquiryDetailsModel.etd.length > 0) {
              this.voyageEnquiryDetailsModel.etd = this.voyageEnquiryDetailsModel.etd + this.dateType;
            }
            if (null != this.voyageEnquiryDetailsModel.ata && this.voyageEnquiryDetailsModel.ata.length > 0) {
              this.voyageEnquiryDetailsModel.ata = this.voyageEnquiryDetailsModel.ata + this.dateType;
            }
            if (null != this.voyageEnquiryDetailsModel.atb && this.voyageEnquiryDetailsModel.atb.length > 0) {
              this.voyageEnquiryDetailsModel.atb = this.voyageEnquiryDetailsModel.atb + this.dateType;
            }
            if (null != this.voyageEnquiryDetailsModel.atd && this.voyageEnquiryDetailsModel.atd.length > 0) {
              this.voyageEnquiryDetailsModel.atd = this.voyageEnquiryDetailsModel.atd + this.dateType;
            }
            if (null != this.voyageEnquiryDetailsModel.cargoCutoffDatetime && this.voyageEnquiryDetailsModel.cargoCutoffDatetime.length > 0) {
              this.voyageEnquiryDetailsModel.cargoCutoffDatetime = this.voyageEnquiryDetailsModel.cargoCutoffDatetime + this.dateType;
            }

            if (!this.voyageEnquiryDetailsModel.docDetails) {
              this.tabs = ['Agent Information', 'Vessel Information', 'Voyage Details', 'Other Details'];
            }
          }

        },
        error => {
          var errorMessage = <any>error;
          //Show error message
        });
  }

  getfirstStyle() {
    if (this.agentdetails) {
      return "5px solid lightblue";
    }
    else {
      return "#387EF5";
    }
  }

  getsecondStyle() {
    if (this.vesseldetails) {
      return "5px solid lightblue";
    }
    else {
      return "#387EF5";
    }
  }

  getthirdStyle() {
    if (this.voyagedetails) {
      return "5px solid lightblue";
    }
    else {
      return "#387EF5";
    }
  }

  getfourthStyle() {
    if (this.otherdetails) {
      return "5px solid lightblue";
    }
    else {
      return "#387EF5";
    }
  }

  getfifthStyle() {
    if (this.uploadDocStatus) {
      return "5px solid lightblue";
    }
    else {
      return "#387EF5";
    }
  }
}
