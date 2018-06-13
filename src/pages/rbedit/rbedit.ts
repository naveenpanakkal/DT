import {Component, ViewChild} from '@angular/core';
import {Content, IonicPage, Navbar, NavController, NavParams, Slides} from 'ionic-angular';
import {TruckappointmentdetailsoModel} from "../../shared/model/ta/truckappointmentdetailso.model";
import {TruckappointmentserviceProvider} from "../../providers/webservices/truckappointmentservices";
import {TaSearchSOModel} from "../../shared/model/ta/taSearchSO.model";
import {DefinedsetresListModel} from "../../shared/model/definedset/definedsetres-list.model";
import {DefinedSetResModel} from "../../shared/model/definedset/definedsetres.model";
import {LocationMasterModel} from "../../shared/model/locationmaster.model";
import {SubLocationMasterModel, SubLocationMasterReqModel} from "../../shared/model/sublocationmaster.model";
import {Utils} from "../../shared/utils";
import {CommonservicesProvider} from "../../providers/webservices/commonservices";
import {TaadditionaldetailComponent} from "../../components/tamodelpages/taadditionaldetail/taadditionaldetail";
/**
 * Generated class for the TaeditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
// @IonicPage()
@Component({
  selector: 'page-RBedit',
  templateUrl: 'rbedit.html',
  providers: [Utils]
})
export class RBeditPage {

  public viewRequest: TaSearchSOModel;
  public viewResponse: TruckappointmentdetailsoModel;
  @ViewChild('navbar') navBar: Navbar;
  @ViewChild(Content) content: Content;
  headerTitle:string;
  scrollHandler(event) {
    this.content.scrollTop = this.content.scrollTop;
  }
  public tabs: Array<any>;
  public showTabs: Array<boolean> = [false, false, false, false, false];
  public showRightSlideNav: boolean;
  public showLeftButton: boolean;
  public showRightButton: boolean;
  public selectedTab: any;
  selectedTabsIndex=0;
  moveTypeOut:any;
  @ViewChild(Slides) slides: Slides;

  public definedSetListModel: DefinedsetresListModel[];
  public requestTypeList: DefinedSetResModel[] = [];
  public moveTypeList: DefinedSetResModel[] = [];

  public locationModel: LocationMasterModel[] = [];
  public spNameModel: SubLocationMasterModel[] = [];

  locationList: any[] = [];
  spNameList: any[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public utils: Utils, private commonServices: CommonservicesProvider,
              private taProvider: TruckappointmentserviceProvider) {
    this.headerTitle=this.utils.getLocaleString("ta_edit");
    // this.tabs = [
    //   this.utils.getLocaleString("ta_tab1"),
    //   this.utils.getLocaleString("ta_tab2"),
    //   this.utils.getLocaleString("ta_tab3"),
    //   this.utils.getLocaleString("ta_tab4"),
    //   this.utils.getLocaleString("ta_tab5"),
    // ];
    this.tabs = [
      "General Information",
      "Container Details",
      "Vessel Information",
      "Resource Booking",
      "Attachments"

    ];
    this.selectedTab = this.tabs[0];
    this.showRightSlideNav = false;
    this.showLeftButton = false;
    // this.dropDown=false;
    this.showRightButton = this.tabs.length > 2;

    this.moveTypeOut = [{'Batman':'Batman','BatGirl':'BatGirl'}];

    this.resetShowTabs(0);
    this.viewRequest = new TaSearchSOModel();
    this.viewRequest.appointmentNoSearch = this.navParams.get('appointmentNoSearch');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TaeditPage');
  }

// Method that shows the next slide
  public slideNext(): void {
    this.slides.slideNext();
  }

  // Method that shows the previous slide
  public slidePrev(): void {
    this.slides.slidePrev();
  }

  public slideChanged(): void {
    let currentIndex = this.slides.getActiveIndex();
    this.showLeftButton = currentIndex !== 0;
    this.showRightButton = !this.slides.isEnd();

  }

  public filterTabs(tab: string): void {
    if(this.selectedTab != tab){
      this.selectedTabsIndex = -1;
    }
    this.content.scrollToTop(50);
    this.content.scrollToTop(50);
    if (tab === "General Information") {
      this.resetShowTabs(0);
      this.slides.slideTo(0, 500);
    } else if (tab === "Container Details") {
      this.resetShowTabs(1);
      this.slides.slideTo(1, 500);
    } else if (tab === "Vessel Information") {
      this.resetShowTabs(2);
      this.slides.slideTo(2, 500);
    } else if (tab === "Resource Booking") {
      this.resetShowTabs(3);
      this.slides.slideTo(3, 500);
    }
    else if (tab === "Attachments") {
      this.resetShowTabs(4);
      this.slides.slideTo(4, 500);
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

  openSelecedTab(selectedIndex){
    if(this.selectedTabsIndex != selectedIndex)
    {
      this.selectedTabsIndex = selectedIndex;
    }else{
      this.selectedTabsIndex = -1;
    }
  }

  loadTA() {
    this.taProvider.searchTaById(this.viewRequest).subscribe(
      response => {
        this.viewResponse = <TruckappointmentdetailsoModel>response;
      }
    );
  }
  openMoveTypeInModel()
  {
    this.navCtrl.push(TaadditionaldetailComponent,{
      isMoveTypeIn: true,
    });
  }
  openMoveTypeOutModel() {
    this.navCtrl.push(TaadditionaldetailComponent, {
      isMoveTypeIn: false,

    });
  }
}
