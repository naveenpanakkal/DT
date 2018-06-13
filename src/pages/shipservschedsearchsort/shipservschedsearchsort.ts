import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Utils} from "../../shared/utils";
import {TranslateService} from "@ngx-translate/core";
import {ShipServSchedSortModel} from "../../shared/model/shipservsched/sssSort.model";

/**
 * Generated class for the ShipServSchedSearchSortPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-shipservschedsearchsort',
  templateUrl: 'shipservschedsearchsort.html',
  providers:[Utils,ShipServSchedSortModel]
})
export class ShipServSchedSearchSortPage {

  sortMode:string = 'sss_desc';
  ascend:boolean = false;

  sortSelect:string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public utils: Utils,
              public translate: TranslateService,
              public sortModel:ShipServSchedSortModel) {
    translate.setDefaultLang('en');
    translate.use('en');
    this.sortModel = this.navParams.get('sssSortModel');
    this.initOrder();
    this.initSortOption();
  }

  initOrder(){
    if(this.sortModel.sortOrder == false) {
      this.sortMode = 'sss_desc';
      this.ascend = false;
    } else {
      this.sortMode = 'sss_asc';
      this.ascend = true;
    }
  }
  initSortOption(){
    this.sortSelect = this.sortModel.sortOption;
  }

  changeOrder(){
    if(!this.ascend){
      this.sortMode = 'sss_desc';
    }else{
      this.sortMode = 'sss_asc';
    }
  }

  reset(){
    this.sortSelect = 'sssNoSummary';
    this.sortMode = 'sss_desc';
    this.ascend = false;
  }
  submit(){
    this.sortModel.sortOption = this.sortSelect;
    this.sortModel.sortOrder  = this.ascend;
    this.sortModel.fromPage = 'sort';
    this.navCtrl.pop();
  }
}
