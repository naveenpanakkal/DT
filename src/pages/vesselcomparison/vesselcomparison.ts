import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {VesselComparisonReponseModel} from "../../shared/model/vesselcomparison/vesselcomparisonreponse.model";
import {VesselComparisonRequest} from "../../shared/model/vesselcomparison/vesselcomparison.request";
import {TranslateService} from "@ngx-translate/core";
import {CompareDiffModel} from "../../shared/model/generic/comparediff.model";
import {VesselservicesProvider} from "../../providers/webservices/vesselservices";
import {Utils} from "../../shared/utils";

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
  selector: 'page-vesselcomparison',
  templateUrl: 'vesselcomparison.html',
  providers: [VesselComparisonRequest,
    VesselComparisonReponseModel, CompareDiffModel,Utils]
})
export class VesselComparisonPage {

  public vesselcmpdiffModelArray: CompareDiffModel[];
  public vesselcmpdiffObject: CompareDiffModel;
  public empty : boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public vesselComparisonService: VesselservicesProvider,
              public vesselComparisonRequest: VesselComparisonRequest,
              public vesselComparsionResponseModel: VesselComparisonReponseModel,
              public translate: TranslateService,public utils: Utils,) {

    this.vesselComparisonRequest.vesselRegistrationId = this.navParams.get('registrationId');
    translate.setDefaultLang('en');
    translate.use('en');
    this.initializeUI();
    this.populateComparisonView();

  }

  ionViewDidLoad() {

  }

  initializeUI() {
    this.vesselcmpdiffModelArray = new Array<CompareDiffModel>();

  }

  populateComparisonView() {
    this.vesselComparisonService.compare(this.vesselComparisonRequest).subscribe(
      response => {
        this.vesselComparsionResponseModel = <VesselComparisonReponseModel>response;


        this.compareObjects(this.vesselComparsionResponseModel.amended, this.vesselComparsionResponseModel.approved);

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
          (prop != 'wrkflwId') &&
          !(((s[prop] == null) && (t[prop] == '')) || ((s[prop] == '') && (t[prop] == null)))) {
            this.empty = true;
            this.vesselcmpdiffObject = new CompareDiffModel();
            this.translate.get(prop).subscribe(
              value => {
                this.vesselcmpdiffObject.diffattribute = value;
              }
            );
            this.vesselcmpdiffObject.oldValue = s[prop];
            this.vesselcmpdiffObject.newValue = t[prop];

            this.vesselcmpdiffModelArray.push(this.vesselcmpdiffObject);
          }
        }
      }
    }
    if (this.vesselcmpdiffModelArray.length == 0) {
      this.empty = true;
    }
    else {
      this.empty = false;
    }
  }
}
