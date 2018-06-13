import {Component} from '@angular/core';
import {Utils} from "../../../shared/utils";
import {TaAddContainerListSO, TaAddContainerSO} from "../../../shared/model/ta/taaddcontainer.model";
import {NavParams, ViewController} from "ionic-angular";
import {TruckappointmentserviceProvider} from "../../../providers/webservices/truckappointmentservices";
import {DefinedSetResModel} from "../../../shared/model/definedset/definedsetres.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

/**
 * Generated class for the TaAddQuantityComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'ta-add-quantity',
  templateUrl: 'ta-add-quantity.html',
  providers: [Utils]
})
export class TaAddQuantityComponent {

  mode: string = '';
  public addQuantityRequest: TaAddContainerSO = new TaAddContainerSO();
  public requestTypeList: DefinedSetResModel[] = [];

  error: boolean = false;
  addQuantityForm: FormGroup;

  constructor(private taProvider: TruckappointmentserviceProvider,
              params: NavParams, public formBuilder: FormBuilder, public viewCtrl: ViewController) {

    this.requestTypeList = params.get('requestType');
    this.addQuantityRequest.locationCreate = params.get('locationCreate');
    this.addQuantityRequest.spNameCreate = params.get('spNameCreate');
    this.mode = params.get('mode');
    this.initializeFieldValidation();
  }

  initializeFieldValidation() {
    this.addQuantityForm = this.formBuilder.group({
        requestType: ['', Validators.compose([Validators.required])],
        requestNo: ['', Validators.compose([Validators.required])]
      }
    );
  }

  searchQuantity() {
    this.taProvider.addQuantity(this.addQuantityRequest)
      .subscribe(response => {
          let containerList: TaAddContainerListSO = <TaAddContainerListSO> response;
          if (containerList && containerList.list && containerList.list.length == 1) {
            this.viewCtrl.dismiss({
              addQuantity: containerList.list[0]
            });
          } else {
            this.viewCtrl.dismiss({
              addQuantity: null
            });
          }
        },
        error => {
          //Show error message
        });
  }

  submit() {
    if (this.addQuantityForm.valid) {
      this.searchQuantity();
    }  else {
      this.error = true;
    }
  }

  close() {
    this.viewCtrl.dismiss(null);
  }

}
