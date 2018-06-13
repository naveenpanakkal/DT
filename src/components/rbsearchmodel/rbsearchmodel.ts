import { Component } from '@angular/core';
import {AlertController, NavParams, ViewController} from "ionic-angular";
import {Keyboard} from "@ionic-native/keyboard";
import {RBServiceProvider} from "../../providers/webservices/rbservices";
import {ContainerDetailsReqModal} from "../../shared/model/rb/rbContainerDetailsReq.modal";
import {ContainerMasterResponse} from "../../shared/model/rb/rbContainerDetailsResponse.modal";
import {AcceptedContainers} from "../../shared/model/rb/rbContainerDetailsResponse.modal";
/**
 * Generated class for the CshCmpModelComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'rbsearchmodel',
  templateUrl: 'rbsearchmodel.html',
  providers: [RBServiceProvider,ContainerMasterResponse,ContainerDetailsReqModal]
})
export class RBSearchModelComponent {
  mode: string = '';
  location:string;
  spname:string;
  terminal:string;
  containerNo:string;
  isSelectedAll: boolean = false;
  caNo:string;
  doNo:string;
  containers:AcceptedContainers[];
  selectedcontainers:AcceptedContainers[];
  containercount : number;
  selectedTabsIndex = -1;
  constructor(params: NavParams, public viewCtrl: ViewController,
              public keyboard: Keyboard,
              private alertCtrl: AlertController,
              private rbServiceProvider: RBServiceProvider,
              private containerDetailsReqModal:ContainerDetailsReqModal,
              private containerDetailsResponseModal:ContainerMasterResponse) {

    this.caNo = params.get('caNo');
    this.doNo = params.get('doNo');
    this.location = params.get('location');
    this.spname = params.get('spname');
    this.terminal = params.get('terminal');
    this.mode = params.get('mode');
    this.selectedcontainers = new Array<AcceptedContainers>();
    this.containercount=0;
    this.searchContainers();
  }
  //For closing the view
  close() {
    this.viewCtrl.dismiss(null);
  }
  openSelecedTab(selectedIndex)
  {
     if(this.selectedTabsIndex != selectedIndex)
    {
      this.selectedTabsIndex = selectedIndex;
    }else{
      this.selectedTabsIndex = -1;
    }
  }
  // Method that to check data is availbale in the discharge,restow,Load and summary pages
  checkListIsNotEmpty(obj:any){
    if(obj === null|| obj === 'undefined' || obj === undefined)
    {
      return true;
    }
    return obj && obj !== 'null' && obj !== 'undefined' && obj.length === 0;
  }
   searchContainers() {
     this.containerDetailsReqModal.caNo=this.caNo;
     this.containerDetailsReqModal.doNo=this.doNo;
     this.containerDetailsReqModal.locationContainer=this.location;
     this.containerDetailsReqModal.spName=this.spname;
     this.containerDetailsReqModal.terminalContainer=this.terminal;
      this.containers = new Array<AcceptedContainers>();
      this.rbServiceProvider.rbContainerMaster(this.containerDetailsReqModal)
      .subscribe(response => {
          this.containerDetailsResponseModal = <ContainerMasterResponse> response;
          this.containers=this.containerDetailsResponseModal.list;
           for (let i=0;i<this.containers.length;i++){
              this.containers[i].selected=false;
            }
        },
        error => {
          //Show error message
        });
  }
submitContainers(){
  for (let i=0;i<this.containers.length;i++){
      if (this.containers[i].selected) {
         // this.containers.splice(i,1);
         this.selectedcontainers.push(this.containers[i]);
      }
  }
  if (this.selectedcontainers){
        this.viewCtrl.dismiss({
          containers: this.selectedcontainers
        });
      } else {
        this.viewCtrl.dismiss({
          containers: null
        });
      }
}
  selectAllContainer() {
    console.log('selectAllContainer :' + this.isSelectedAll);
    if (this.isSelectedAll) {
      for (let i = 0; i < this.containers.length; i++) {
        this.containers[i].selected = true;
      }
    } else {
      for (let i = 0; i < this.containers.length; i++) {
        this.containers[i].selected = false;
      }
    }
  }
containerCheck(selected:boolean){
  for (let i = 0; i < this.containers.length; i++) {
    if (!this.containers[i].selected) {
      this.isSelectedAll = false;
      return;
    }
  }
  this.isSelectedAll = true;
  if(selected) {
    this.containercount++;
    return selected;
  } else {
    this.containercount--;
    return false;
  }
}
  submit() {
    if (this.containers) {
      this.submitContainers();
    }
  }
}
