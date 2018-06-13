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
  selector: 'addcontainermodel',
  templateUrl: 'ssr-add-container-model.html',
  providers: [Utils]
})
export class SsrAddContainerModel {

  @ViewChild(Content) content: Content;
  @ViewChild(Slides) slides: Slides;
  inputPattern: string = "^[0-9a-zA-Z]{0,30}$";
  public showTabs: Array<boolean> = [false, false];
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
  }

  public filterTabs(tab: string): void {
    if(this.selectedTab != tab){
      this.selectedTabsIndex = -1;
    }
    this.content.scrollToTop(50);
    this.content.scrollToTop(50);
    if (tab === this.utils.getLocaleString("ssr_tab1")) {
      this.resetShowTabs(0);
      this.slides.slideTo(0, 500);
    } else if (tab === this.utils.getLocaleString("ssr_tab2")) {
      this.resetShowTabs(1);
      this.slides.slideTo(1, 500);
    }else if (tab === this.utils.getLocaleString("ssr_tab3")) {
      this.resetShowTabs(2);
      this.slides.slideTo(2, 500);
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
  // Method that shows the next slide
  public slideNext(): void {
    this.slides.slideNext();
  }

  // Method that shows the previous slide
  public slidePrev(): void {
    this.slides.slidePrev();
  }

  close() {
    this.viewCtrl.dismiss(null);
  }


}


