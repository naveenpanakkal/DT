import {Component, ViewChild , } from '@angular/core';
import {AlertController, NavParams, ViewController, Navbar, Platform ,Content,Slides} from "ionic-angular";
import {ImdgDetailsModel} from "../../../shared/model/containeracceptance/imdgdetails.model";
import {DefinedSetResModel} from "../../../shared/model/definedset/definedsetres.model";
import {Keyboard} from "@ionic-native/keyboard";
import {Utils} from "../../../shared/utils";
import {GigoContainerDetailsSO, GigoSealDetailsSO} from "../../../shared/model/GIGO/gigodetails.model";
// import {FormGroup, FormArray, FormBuilder, Validators} from "@angular/forms";

/**
 * Generated class for the CAIMGDModelComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'ssrselectrotationmodel',
  templateUrl: 'select-rotation-model.html',
  providers: [Utils]
})
export class SsrSelectRotationModel {

  @ViewChild(Content) content: Content;
  @ViewChild(Slides) slides: Slides;
  inputPattern: string = "^[0-9a-zA-Z]{0,30}$";
  public showTabs: Array<boolean> = [false, false,false,false];
  public tabs: Array<any>;
  public showRightSlideNav: boolean;
  public showRightButton: boolean;
  public showLeftButton: boolean;
  editMode: boolean;
  public selectedTab: any;
  isCreator: boolean;
  containerEditMode: boolean;
  dirtyFlag: boolean;
  imdgArrayFlag: boolean = false;
  packagingList: DefinedSetResModel[] = [];
  dropDown:string = 'false';
  gigoSealDetails:GigoSealDetailsSO[];
  tempgigoSealDetails:GigoSealDetailsSO[];
  sealIssuerList : DefinedSetResModel[] = [];
  sealStatusList : DefinedSetResModel[] = [];
  sealTypeList : DefinedSetResModel[] = [];
  sealIssuer: string;
  sealStatus: string;
  sealType: string;
  selectedTabsIndex = 0;

  // Property used to store the callback of the event handler to unsubscribe to it when leaving this page
  public unregisterBackButtonAction: any;

  @ViewChild('navbar') navBar: Navbar;

  constructor(public platform: Platform, params: NavParams, public viewCtrl: ViewController,
              public keyboard: Keyboard,
              private alertCtrl: AlertController,
              public utils: Utils) {

    this.tabs = [
      this.utils.getLocaleString("ssr_rotatoin_tab1"),
      this.utils.getLocaleString("ssr_rotaton_tab2"),
    ];
    this.selectedTab = this.tabs[0];
    this.showRightSlideNav = false;
    this.showLeftButton = false;
    this.showRightButton = this.tabs.length > 2;
    this.resetShowTabs(0);
  }

  public filterTabs(tab: string): void {
    if(this.selectedTab != tab){
      this.selectedTabsIndex = -1;
    }
    this.content.scrollToTop(50);
    this.content.scrollToTop(50);
    if (tab === this.utils.getLocaleString("ssr_rotatoin_tab1")) {
      this.resetShowTabs(0);
      this.slides.slideTo(0, 500);
    } else if (tab === this.utils.getLocaleString("ssr_rotaton_tab2")) {
      this.resetShowTabs(1);
      this.slides.slideTo(1, 500);
    }
    this.selectedTab = tab;

  }
  public slideChanged(): void {
    let currentIndex = this.slides.getActiveIndex();
    this.showLeftButton = currentIndex !== 0;
    this.showRightButton = !this.slides.isEnd();

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
  close() {
    this.viewCtrl.dismiss(null);
  }


}


