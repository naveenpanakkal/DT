import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {TruckComparisonRequest} from "../../shared/model/truckcomparison/truckcomparison.request";
import {CompareDiffModel} from "../../shared/model/generic/comparediff.model";
import {TruckComparisonReponseModel} from "../../shared/model/truckcomparison/truckcomparisonresponse.model";
import {TruckservicesProvider} from "../../providers/webservices/truckservices";
import {TranslateService} from "@ngx-translate/core";
import {sortArray, Utils} from "../../shared/utils";

/**
 * Generated class for the TruckcomparisonPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-truckcomparison',
  templateUrl: 'truckcomparison.html',
  providers: [TruckComparisonRequest, CompareDiffModel, TruckComparisonReponseModel,Utils]
})
export class TruckComparisonPage {

  public truckCmpDiffmodel: CompareDiffModel;
  public truckCmpDiffmodelArray: CompareDiffModel[];

  public empty: boolean;
  ascending: boolean = true;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public truckComparisonRequest: TruckComparisonRequest,
              public truckComparisonService: TruckservicesProvider,
              public truckComparsionResponse: TruckComparisonReponseModel,
              public translate: TranslateService) {
    this.truckComparisonRequest.truckRegistrationId = this.navParams.get('registrationId');
    translate.setDefaultLang('en');
    translate.use('en');
    this.initializeUI();
    this.populateComparisonView();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TruckcomparisonPage');
  }

  initializeUI() {
    this.truckCmpDiffmodelArray = new Array<CompareDiffModel>();
    /*this.truckComparisonRequest = new TruckComparisonRequest();*/
  }

  populateComparisonView() {
    this.truckComparisonService.compare(this.truckComparisonRequest).subscribe(
      response => {
        this.truckComparsionResponse = <TruckComparisonReponseModel>response;
        console.log("Vessel Comparison Unparsed Response JSON : <<" + JSON.stringify(response) + ">>");
        this.compareObjects(this.truckComparsionResponse.amended, this.truckComparsionResponse.approved);
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
      this.empty = true;
      return;
    }
    for (let prop in s) {
      if (s.hasOwnProperty(prop)) {
        if (t.hasOwnProperty(prop)) {

          console.log("s[prop]== " + s[prop] + ">>");
          console.log("t[prop]== <<" + t[prop] + ">>");
          //BugFix for 537
          if ((s[prop] != t[prop]) && (prop != 'isDeleted') &&
            (prop != 'wrkflwId') &&
            !(((s[prop] == null) && (t[prop] == '')) || ((s[prop] == '') && (t[prop] == null)))) {
            this.empty = true;
            this.truckCmpDiffmodel = new CompareDiffModel();
            if (prop == 'length') {
              this.truckCmpDiffmodel.diffattribute = 'Length(Metres)';
            } else {
              this.translate.get(prop).subscribe(
                value => {
                  this.truckCmpDiffmodel.diffattribute = value;
                }
              );
            }

            this.truckCmpDiffmodel.oldValue = s[prop];
            this.truckCmpDiffmodel.newValue = t[prop];

            this.truckCmpDiffmodelArray.push(this.truckCmpDiffmodel);
            this.truckCmpDiffmodelArray = sortArray(this.truckCmpDiffmodelArray, "diffattribute",this.ascending);
            console.log("property " + prop + " does not match");
          }
        }
      }
    }
    if (this.truckCmpDiffmodelArray.length == 0) {
      this.empty = true;
    }
    else {
      this.empty = false;
    }
  }
}
