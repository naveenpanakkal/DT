import { Component } from '@angular/core';
import {Utils,sortArray} from "../../../shared/utils";
import {AlertController, NavParams, ViewController} from "ionic-angular";
import {Keyboard} from "@ionic-native/keyboard";
import {CSHSearchByIDResultModel} from "../../../shared/model/csh/cshsearchbyidresult.model";
import {cshComparisonReponseModel} from "../../../shared/model/csh/cshComparisonresponse.model";
import {CshServiceProvider} from "../../../providers/webservices/cshservice";
import {CompareDiffModel} from "../../../shared/model/generic/comparediff.model";
import {TranslateService} from "@ngx-translate/core";


/**
 * Generated class for the CshCmpModelComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'csh-cmp-model',
  templateUrl: 'csh-cmp-model.html',
  providers: [cshComparisonReponseModel,CSHSearchByIDResultModel,Utils]
})
export class CshCmpModelComponent {

  /*cshNo:number;
  cshRequestNo:number;*/
  //cshSearchByIdModel:CSHSearchByIDResultModel;
  //cshComparisonResponse : cshComparisonReponseModel;
  public cshCmpDiffmodel: CompareDiffModel;
  public cshCmpDiffmodelArray: CompareDiffModel[];
  public empty: boolean;
  ascending: boolean = true;

  text: string;

  constructor(params: NavParams, public viewCtrl: ViewController,
              public keyboard: Keyboard,
              private alertCtrl: AlertController,
              public utils: Utils,
              public comparisonProvider :CshServiceProvider,
              public translate: TranslateService,
              public cshSearchByIdModel:CSHSearchByIDResultModel,
              public cshComparisonResponse : cshComparisonReponseModel,
              ) {
    console.log('Hello CshCmpModelComponent Component');
    this.cshCmpDiffmodelArray = new Array<CompareDiffModel>();

    this.cshSearchByIdModel.cshNo = params.get('cshNo');
    this.cshSearchByIdModel.cshRequestNo = params.get('cshRequestNo');
    this.comparisonProvider.cshCompare(this.cshSearchByIdModel).subscribe(
      response => {
        this.cshComparisonResponse = <cshComparisonReponseModel>response;
        console.log("Vessel Comparison Unparsed Response JSON : <<" + JSON.stringify(response) + ">>");
        this.compareObjects(this.cshComparisonResponse.amended, this.cshComparisonResponse.approved);
      },
      error => {
        /*handle error*/
      }

    );
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

          //BugFix for 537
          if ((s[prop] != t[prop]) && (prop != 'wrkflwId') && !(((s[prop] == null) && (t[prop] == '')) ||
              ((s[prop] == '') && (t[prop] == null)))) {
            this.empty = true;
            this.cshCmpDiffmodel = new CompareDiffModel();
            this.translate.get(prop).subscribe(
              value => {
                this.cshCmpDiffmodel.diffattribute = value;
              }
            );

            this.cshCmpDiffmodel.oldValue = s[prop];
            this.cshCmpDiffmodel.newValue = t[prop];

            this.cshCmpDiffmodelArray.push(this.cshCmpDiffmodel);
            this.cshCmpDiffmodelArray = sortArray(this.cshCmpDiffmodelArray, "diffattribute",this.ascending);
            console.log("property " + prop + " does not match");
          }
        }
      }
    }
    if (this.cshCmpDiffmodelArray.length == 0) {
      this.empty = true;
    }
    else {
      this.empty = false;
    }
  }

  //For closing the view
  close() {
    this.viewCtrl.dismiss(null);
  }
}// End  of the model Class
