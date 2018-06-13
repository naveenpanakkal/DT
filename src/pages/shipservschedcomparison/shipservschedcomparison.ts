import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {VesselComparisonReponseModel} from "../../shared/model/vesselcomparison/vesselcomparisonreponse.model";
import {VesselComparisonRequest} from "../../shared/model/vesselcomparison/vesselcomparison.request";
import {TranslateService} from "@ngx-translate/core";
import {CompareDiffModel} from "../../shared/model/generic/comparediff.model";
import {VesselservicesProvider} from "../../providers/webservices/vesselservices";
import {sortArray, Utils} from "../../shared/utils";
import {SssComparisonRequestModal} from "../../shared/model/shipservsched/ssscomparisonrequest.modal";
import {SssCompariosnResponseModal} from "../../shared/model/shipservsched/ssscomparisonresponse.modal";
import {SSSServiceProvider} from "../../providers/webservices/sssservices";

/*
* ===========================================================================
* Copyright 2017 Dubai Trade.
* All Rights Reserved
* ===========================================================================
*
*  vesselcomparison.ts file contains VesselComparisonPage class which holds functions to
*  populate the data for vessel comparison page UI.
*
*/
@IonicPage()
@Component({
  selector: 'page-shipservschedcomparison',
  templateUrl: 'shipservschedcomparison.html',
  providers: [SssComparisonRequestModal,
    SssCompariosnResponseModal, CompareDiffModel,Utils]
})
export class ShipServiceComparisonPage {

  public ssscmpdiffModelArray: CompareDiffModel[];
  public ssscmpdiffObject: CompareDiffModel;
  public empty : boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public sssComparisonService: SSSServiceProvider,
              public sssComparisonRequest: SssComparisonRequestModal,
              public sssComparsionResponseModel: SssCompariosnResponseModal,
              public translate: TranslateService,public utils: Utils,) {

    this.sssComparisonRequest.scheduleDetailsId = this.navParams.get('registrationId');
    translate.setDefaultLang('en');
    translate.use('en');
    this.initializeUI();
    this.populateComparisonView();

  }

  ionViewDidLoad() {

  }

  initializeUI() {
    this.ssscmpdiffModelArray = new Array<CompareDiffModel>();

  }

  populateComparisonView() {
    this.sssComparisonService.compare(this.sssComparisonRequest).subscribe(
      response => {
        this.sssComparsionResponseModel = <SssCompariosnResponseModal>response;


        this.compareObjects(this.sssComparsionResponseModel.amended, this.sssComparsionResponseModel.approved);

      },
      error => {
        /*handle error*/
      }
    )
  }

  compareObjects(s, t) {
    if (typeof s !== typeof t) {

      this.empty = true;
      return;
    }
    if (typeof s !== "object") {
      this.empty = true;
      return;
    }
    for (let prop in s) {
      if (s.hasOwnProperty(prop)) {
        if (t.hasOwnProperty(prop)) {
          if ((s[prop] != t[prop]) && (prop != 'isDeleted') &&
          (prop != 'wrkflwId') &&(prop != 'spNameList')&&(prop != 'frequencySo') &&(prop != 'partnerLinesSos')
            &&(prop != 'vesselSo') &&(prop != 'portOfCallSo')&&(prop != 'boxOperatorMaster')&&(prop != 'shippingLineList')
            &&(prop != 'partnerLinesSos') &&
          !(((s[prop] == null) && (t[prop] == '')) || ((s[prop] == '') && (t[prop] == null)))) {
            this.empty = true;
            this.ssscmpdiffObject = new CompareDiffModel();
            this.translate.get(prop).subscribe(
              value => {
                this.ssscmpdiffObject.diffattribute = value;
              }
            );
            this.ssscmpdiffObject.oldValue = s[prop];
            this.ssscmpdiffObject.newValue = t[prop];
              this.ssscmpdiffModelArray.push(this.ssscmpdiffObject);
          }
        }
      }
      this.ssscmpdiffModelArray = sortArray(this.ssscmpdiffModelArray, "diffattribute", true);
    }
    if (this.ssscmpdiffModelArray.length == 0) {
      this.empty = true;
    }
    else {
      this.empty = false;
    }
  }
}
