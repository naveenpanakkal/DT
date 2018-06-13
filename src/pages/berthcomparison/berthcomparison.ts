import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {BerthServicesProvider} from "../../providers/webservices/berthservices";
import {BerthComparisonReponseModel} from "../../shared/model/berthsearchview/berthcomparisonreponse.model";
import {BerthSearchDetailsReqModel} from "../../shared/model/berthsearchview/berthsearchdetails/berthsearchdetailsreq.model";
import {BerthSearchDetailsResultModel} from "../../shared/model/berthsearchview/berthsearchdetails/berthsearchdetailsresult.model";
import {CompareDiffModel} from "../../shared/model/generic/comparediff.model";
import {TranslateService} from "@ngx-translate/core";
import {Utils} from "../../shared/utils";

/**
 * Generated class for the BerthcomparisonPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-berthcomparison',
  templateUrl: 'berthcomparison.html',
  providers: [BerthSearchDetailsReqModel, BerthSearchDetailsResultModel, CompareDiffModel, BerthComparisonReponseModel,Utils]
})
export class BerthcomparisonPage {
  public cmpdiffModelArray: CompareDiffModel[];
  public cmpdiffObject: CompareDiffModel;
  public empty: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public berthComparsionResponseModel: BerthComparisonReponseModel,
              public bBerthSearchDetailsReqModel: BerthSearchDetailsReqModel,
              public berthSearchDetailsResultModel: BerthSearchDetailsResultModel,
              public berthServicesProvider: BerthServicesProvider,public utils:Utils,
              public translate: TranslateService) {
    this.bBerthSearchDetailsReqModel.requestID = this.navParams.get('requestID');
    this.bBerthSearchDetailsReqModel.rotationNumber = this.navParams.get('rotationNumber');
    translate.setDefaultLang('en');
    translate.use('en');
    this.initializeUI();
    this.populateComparisonView();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BerthcomparisonPage');
  }

  initializeUI() {
    this.cmpdiffModelArray = new Array<CompareDiffModel>();
    console.log("Request JSON <<" + JSON.stringify(this.bBerthSearchDetailsReqModel) + ">>");
  }

  populateComparisonView() {
    this.berthServicesProvider.compare(this.bBerthSearchDetailsReqModel).subscribe(
      response => {
        this.berthComparsionResponseModel = <BerthComparisonReponseModel>response;
        console.log("Berth Comparison Unparsed Response JSON : <<" + JSON.stringify(response) + ">>");

        this.compareObjects(this.berthComparsionResponseModel.amended, this.berthComparsionResponseModel.approved);


      },
      error => {
        /*handle error*/
      }
    )
  }

  compareObjects(s, t) {
    if (typeof s !== typeof t) {
      console.log("two objects not the same type");
      this.empty = true;
      return;
    }
    if (typeof s !== "object") {
      console.log('arguments are not typeof === "object"');
      this.empty = true;
      return;
    }
    for (let prop in s) {
      if (s.hasOwnProperty(prop)) {
        if (t.hasOwnProperty(prop)) {
          console.log("s[prop]== " + s[prop] + ">>");
          console.log("t[prop]== <<" + t[prop] + ">>");
          if ((s[prop] != t[prop]) && (prop != 'isDeleted') &&
            (prop != 'wrkflwId') &&
            (prop != "berthCargoDetlSO") && (prop != "berthInfoDetlSO") && (prop != "berthRegAttachSO") &&
            !(((s[prop] == null) && (t[prop] == '')) || ((s[prop] == '') && (t[prop] == null)))) {


            this.empty = true;
            this.cmpdiffObject = new CompareDiffModel();
            if (prop == 'vesselType') {
              this.cmpdiffObject.diffattribute = 'Vessel Code';
            } else if (prop == 'loa') {
              this.cmpdiffObject.diffattribute = 'LOA (meters)';
            } else if (prop == 'imoNo') {
              this.cmpdiffObject.diffattribute = 'IMO No';
            } else {
              this.cmpdiffObject.diffattribute = prop;
              this.translate.get(prop).subscribe(
                value => {
                  this.cmpdiffObject.diffattribute = value;
                  console.log( prop + " : " + value);
                }
              );
            }
            this.cmpdiffObject.oldValue = s[prop];
            this.cmpdiffObject.newValue = t[prop];

            this.cmpdiffModelArray.push(this.cmpdiffObject);
          }
        }
      }
    }
    if (this.cmpdiffModelArray.length == 0) {
      this.empty = true;
    }
    else {
      this.empty = false;
    }
  }
}
