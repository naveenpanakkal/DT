import {Component, ViewChild} from '@angular/core';
import {Utils} from "../../../shared/utils";
import {
  AlertController,
  Content,
  Navbar,
  NavController,
  NavParams,
  Slides,
  ViewController,
  Platform, IonicApp
} from "ionic-angular";
import {TaAddContainerListSO, TaAddContainerSO} from "../../../shared/model/ta/taaddcontainer.model";
import {TruckappointmentserviceProvider} from "../../../providers/webservices/truckappointmentservices";
import {DefinedSetResModel} from "../../../shared/model/definedset/definedsetres.model";
import {DatePipe} from "@angular/common";

/**
 * Generated class for the TaAddContainerComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'ta-add-container',
  templateUrl: 'ta-add-container.html',
  providers: [Utils]

})
export class TaAddContainerComponent {

  @ViewChild('navbar') navBar: Navbar;
  @ViewChild(Content) content: Content;
  @ViewChild(Slides) slides: Slides;

  mode: string = '';

  // Property used to store the callback of the event handler to unsubscribe to it when leaving this page
  public unregisterBackButtonAction: any;

  scrollHandler(event) {
    this.content.scrollTop = this.content.scrollTop;
  }

  public tabs: Array<any>;
  public showTabs: Array<boolean> = [false, false];
  public showRightSlideNav: boolean;
  public showLeftButton: boolean;
  public showRightButton: boolean;
  public selectedTab: any;
  private isFromMoveTypeIn: boolean;
  selectedTabsIndex = 0;
  moveTypeOut: any;
  alertMsg: string;
  alerttitle: string;
  alertButtonOk: string;

  dateFormat: string = 'DD/MM/YYYY';

  isSelectedAll: boolean = false;

  fromDate: any;
  toDate: any;

  isContainerEmpty: boolean = false;

  public moveTypeList: DefinedSetResModel[] = [];
  public addContainerRequest: TaAddContainerSO = new TaAddContainerSO();
  public containerDetails: TaAddContainerSO[] = [];

  constructor(public platform: Platform, public navCtrl: NavController, public utils: Utils, params: NavParams, public datepipe: DatePipe,
              private taProvider: TruckappointmentserviceProvider, public viewCtrl: ViewController,private ionicApp: IonicApp,
              private alertCtrl: AlertController) {

    this.tabs = ["Search Container Details", "Container Search Results"];
    this.alerttitle = this.utils.getLocaleString("ca_alert");
    this.alertButtonOk = this.utils.getLocaleString("ca_ok_text");
    this.selectedTab = this.tabs[0];
    this.showRightSlideNav = false;
    this.showLeftButton = false;
    // this.dropDown=false;
    this.showRightButton = this.tabs.length > 2;
    this.resetShowTabs(0);

    this.moveTypeList = params.get('moveTypeList');
    this.addContainerRequest.locationCreate = params.get('locationCreate');
    this.addContainerRequest.spNameCreate = params.get('spNameCreate');
    this.isFromMoveTypeIn = params.get('isFromMoveTypeIn');
    this.mode = params.get('mode');

    if (this.isFromMoveTypeIn) {
      this.addContainerRequest.containerMoveType = this.moveTypeList[1].definedSetValueCode;
    } else {
      this.addContainerRequest.containerMoveType = this.moveTypeList[2].definedSetValueCode;
    }

    this.initializeFieldValidation();
  }

  //Method that shows the next slide
  public slideNext(): void {
    this.slides.slideNext();
  }

  //Method that shows the previous slide
  public slidePrev(): void {
    this.slides.slidePrev();
  }

  public slideChanged(): void {
    let currentIndex = this.slides.getActiveIndex();
    this.showLeftButton = currentIndex !== 0;
    this.showRightButton = !this.slides.isEnd();
  }

  public filterTabs(tab: string): void {
    if (this.selectedTab != tab) {
      this.selectedTabsIndex = -1;
    }
    this.content.scrollToTop(50);
    if (tab === "Search Container Details") {
      this.resetShowTabs(0);
      this.slides.slideTo(0, 500);
    } else if (tab === "Container Search Results") {
      this.resetShowTabs(1);
      this.slides.slideTo(1, 500);
    }
    this.selectedTab = tab;

  }

  resetShowTabs(val: number) {
    for (let i = 0; i < this.showTabs.length; i++) {
      if (val == i) {
        this.showTabs[i] = true;
      } else {
        this.showTabs[i] = false;
      }
    }
  }

  openSelecedTab(selectedIndex) {
    if (this.selectedTabsIndex != selectedIndex) {
      this.selectedTabsIndex = selectedIndex;
    } else {
      this.selectedTabsIndex = -1;
    }
  }

  initializeFieldValidation() {

  }

  close() {
    this.viewCtrl.dismiss(null);
  }

  search() {
    let fromDate: Date = new Date(this.fromDate);
    let toDate: Date = new Date(this.toDate);
    if (fromDate > toDate) {
      this.showAlert();
    }
    else {
      this.searchContainer();
    }
  }

  submit() {
    let selectedContainers: TaAddContainerSO[] = [];
    for (let i = 0; i < this.containerDetails.length; i++) {
      if (this.containerDetails[i].checkedStatus) {
        selectedContainers.push(this.containerDetails[i]);
      }
    }

    if (selectedContainers && selectedContainers.length > 0) {
      this.viewCtrl.dismiss({
        addContainer: selectedContainers
      });
    } else {
      this.viewCtrl.dismiss({
        addContainer: null
      });
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

  searchContainer() {

    if (this.toDate) {
      this.addContainerRequest.containerToDate = this.datepipe.transform(this.toDate, 'dd/MM/yyyy');
    } else {
      this.addContainerRequest.containerToDate = '';
    }

    if (this.fromDate) {
      this.addContainerRequest.containerFromDate = this.datepipe.transform(this.fromDate, 'dd/MM/yyyy');
    } else {
      this.addContainerRequest.containerFromDate = '';
    }

    this.taProvider.addContainer(this.addContainerRequest)
      .subscribe(response => {
          let containerList: TaAddContainerListSO = <TaAddContainerListSO> response;
          this.containerDetails = [];
          this.filterTabs('Container Search Results');
          if (containerList && containerList.list && containerList.list.length > 0) {
            this.isContainerEmpty = true;
            this.containerDetails = containerList.list;
            for (let i = 0; i < this.containerDetails.length; i++) {
              this.containerDetails[i].checkedStatus = false;
            }
          } else {
            this.isContainerEmpty = false;
          }
          this.isSelectedAll = false;
        },
        error => {
          //Show error message
        });
  }

  selectAllContainer() {
    console.log('selectAllContainer :' + this.isSelectedAll);
    if (this.isSelectedAll) {
      for (let i = 0; i < this.containerDetails.length; i++) {
        this.containerDetails[i].checkedStatus = true;
      }
    } else {
      for (let i = 0; i < this.containerDetails.length; i++) {
        this.containerDetails[i].checkedStatus = false;
      }
    }
  }

  onContainerSelect() {
    console.log('onContainerSelect :' + this.isSelectedAll);
    for (let i = 0; i < this.containerDetails.length; i++) {
      if (!this.containerDetails[i].checkedStatus) {
        this.isSelectedAll = false;
        return;
      }
    }
    this.isSelectedAll = true;
  }

  ionViewDidLoad() {
    this.initializeBackButtonCustomHandler();
  }

  ionViewWillLeave() {
    // Unregister the custom back button action for this page
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }

  initializeBackButtonCustomHandler(): void {
    var _this = this;
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(function (event) {
      let activePortal = _this.ionicApp._loadingPortal.getActive() ||
        _this.ionicApp._toastPortal.getActive() ||
        _this.ionicApp._overlayPortal.getActive();
      if (activePortal && activePortal.index === 0) {
        activePortal.dismiss();
      }
      else {
        _this.viewCtrl.dismiss(null);
      }
    }, 101); // Priority 101 will override back button handling (we set in app.component.ts) as it is bigger then priority 100 configured in app.component.ts file */
  }

}
