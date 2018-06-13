import {Component} from '@angular/core';
import {Utils} from "../../../shared/utils";
import {NavParams, ViewController,AlertController} from "ionic-angular";
import {RBServiceProvider} from "../../../providers/webservices/rbservices";
import {DefinedSetResModel} from "../../../shared/model/definedset/definedsetres.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ContainerDetailsReqModal} from "../../../shared/model/rb/rbContainerDetailsReq.modal";
import {ContainerDetailsResponseModal} from "../../../shared/model/rb/rbContainerDetailsResponse.modal";
/**
 * Generated class for the TaAddQuantityComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'rb-add-container',
  templateUrl: 'rb-add-container.html',
  providers: [Utils,RBServiceProvider,ContainerDetailsReqModal,ContainerDetailsResponseModal]
})
export class RbAddContainerComponent {

  mode: string = '';
  tdtype:string;
  containerNo:string;
  alertHeadding: string;
  location:string;
  spname:string;
  terminal:string;

  constructor(private rbServiceProvider: RBServiceProvider,
              private containerDetailsReqModal:ContainerDetailsReqModal,
              private containerDetailsResponseModal:ContainerDetailsResponseModal,
              params: NavParams, public formBuilder: FormBuilder, public viewCtrl: ViewController, 
              private alertCtrl: AlertController,public utils: Utils) {

    this.tdtype = params.get('tradetype');
    this.location = params.get('location');
    this.spname = params.get('spname');
    this.terminal = params.get('terminal');
    this.mode = params.get('mode');
    this.alertHeadding = this.utils.getLocaleString("attention");
  }



  searchImportContainers() {
    this.rbServiceProvider.getContainerDetails(this.containerDetailsReqModal)
      .subscribe(response => {
          let containerList: ContainerDetailsResponseModal = <ContainerDetailsResponseModal> response;
          if (containerList) {
            this.viewCtrl.dismiss({
              containers: containerList
            });
          } else {
            this.viewCtrl.dismiss({
              containers: null
            });
          }
        },
        error => {
          //Show error message
        });
  }
 searchExportContainers() {
    this.rbServiceProvider.getExportContainerDetails(this.containerDetailsReqModal)
      .subscribe(response => {
          let containerList: ContainerDetailsResponseModal = <ContainerDetailsResponseModal> response;
          if (containerList) {
            this.viewCtrl.dismiss({
              containers: containerList
            });
          } else {
            this.viewCtrl.dismiss({
              containers: null
            });
          }
        },
        error => {
          //Show error message
        });
  }
   searchTSContainers() {
    this.rbServiceProvider.getTSContainerDetails(this.containerDetailsReqModal)
      .subscribe(response => {
          let containerList: ContainerDetailsResponseModal = <ContainerDetailsResponseModal> response;
          if (containerList) {
            this.viewCtrl.dismiss({
              containers: containerList
            });
          } else {
            this.viewCtrl.dismiss({
              containers: null
            });
          }
        },
        error => {
          //Show error message
        });
  }
  submit() {
    if (this.containerNo) {
      this.containerDetailsReqModal.caNo="";
      this.containerDetailsReqModal.tradeType=this.tdtype;
      this.containerDetailsReqModal.doNo="";
      this.containerDetailsReqModal.containerNo=this.containerNo;
      this.containerDetailsReqModal.locationContainer=this.location;
      this.containerDetailsReqModal.spName=this.spname;
      this.containerDetailsReqModal.terminalContainer=this.terminal;
      if(this.tdtype=="Import"){
        this.searchImportContainers();
      }else if(this.tdtype=="Export"){
        this.searchExportContainers();
      }else if(this.tdtype=="T/S"){
        this.searchTSContainers();
      }
    }else{
      this.presentAlert(this.alertHeadding, 'Please provide valid container number');
    }
  }
  reset(){
    this.containerNo="";
  }
  close() {
    this.viewCtrl.dismiss(null);
  }
presentAlert(title: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: [{
        text:'Ok',
        handler: () => {
        
        },
      }]
    });
    alert.present();
  }
}
