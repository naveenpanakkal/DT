import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Utils} from "../../../shared/utils";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {VldsMailModel} from "../../../shared/model/VLDS/vldsmail.model";
import {VldsServiceProvider} from "../../../providers/webservices/vldsservice";

/**
 * Generated class for the LoaddischargemailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-loaddischargedownload',
  templateUrl: 'loaddischargedownload.html',
  providers: [Utils,VldsMailModel,VldsServiceProvider]
})
export class LoadDischargeDownloadPage {
  groupOne : FormGroup;
  groupTwo : FormGroup;
  pages: Array<{ title: string, showDetails: boolean, hide: boolean }>;
  agentList:  string[];
  filterList:  string[];
  containerSize:  string[];
  terminalList:  string[];
  terminalArray : DownloadTerminals[] = new Array();
  agentArray : DownloadAgents[] = new Array();
  statusArray : DownloadStatusFilter[] = new Array();
  sizeArray : DownloadSizeList[] = new Array();
  mailId : string;
  downloadMode : string;
  downloadType : string;
  rotationNumber : string;
  exportType : string;
  formValidate: boolean = false;
  line: string;

  allFilterSelected: boolean = false;
  allAgentSelected: boolean = false;
  allSizeSelected: boolean = false;
  allTerminalSelected: boolean = false;

  toggleFilterSelected: boolean = false;
  toggleAgentSelected: boolean = false;
  toggleSizeSelected: boolean = false;
  toggleTerminalSelected: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl: ViewController,public utils: Utils,
              public formBuilder: FormBuilder, public vldsMailModal :VldsMailModel,
              public vldsServiceProvider : VldsServiceProvider) {
    this.terminalList = navParams.get('terminal_list');//[edit,new,view]
    this.agentList = navParams.get('agentList');
    this.downloadMode = navParams.get('downloadMode');
    this.rotationNumber = navParams.get('rotationNumber');
    this.line = navParams.get('line');
    if(this.downloadMode == 'pdf') {
      this.filterList = ["Discharge","Load","Restow","Summary"];
      this.downloadType = 'Download PDF';
    } else if(this.downloadMode == 'excel') {
      this.filterList = ["Discharge","Load","Restow"];
      this.downloadType = 'Download CSV';
    }
    this.containerSize = ["20ft","40ft","40ft+"];

    this.terminalList.forEach( e => {this.terminalArray.push(new DownloadTerminals(e)) });
    this.agentList.forEach( e => {this.agentArray.push(new DownloadAgents(e)) });
    this.filterList.forEach( e => {this.statusArray.push(new DownloadStatusFilter(e)) });
    this.containerSize.forEach( e => {this.sizeArray.push(new DownloadSizeList(e)) });


    this.pages = [
      {title: 'Select Agent', showDetails: false, hide: false},
      {title: 'Select Filter', showDetails: false, hide: false},
      {title: 'Select Size', showDetails: false, hide: false},
      {title: 'Terminal', showDetails: false, hide: false},
    ];

    this.groupOne = formBuilder.group({
      rotationnumber: [''],
      vesselname: ['' ],
      vldsstatus: ['',]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoaddischargemailPage');
  }
  close() {
    this.viewCtrl.dismiss(null);
  }

  keyUpValidate(e,format,model)
  {
    this.utils.keyUpValidate(e, format);
    if(model=='rotationNumber')
    {
      //this.vldsrotationnumber= e.target.value;
    }
  }

  toggleDetails(page) {
    if (page.title == 'Select Agent') {
      this.pages[0].showDetails = !this.pages[0].showDetails;
    } else if (page.title == 'Select Filter') {
      this.pages[1].showDetails = !this.pages[1].showDetails;
    } else if (page.title == 'Select Size') {
      this.pages[2].showDetails = !this.pages[2].showDetails;
    } else if (page.title == 'Terminal') {
      this.pages[3].showDetails = !this.pages[3].showDetails;
    }
  }
  getIcon(page) {
    if (page.showDetails) {
      return "arrow-dropup";
    } else {
      return "arrow-dropdown";
    }
  }

  toggleFilterSelect() {
    if(this.toggleFilterSelected == true ){
      this.allFilterSelected = this.allFilterSelected;
      this.toggleFilterSelected = false;
    }
    else{
      this.allFilterSelected = !this.allFilterSelected;
      for(let i = 0 ; i < this.statusArray.length; i++ ) {
        this.statusArray[i].status = this.allFilterSelected;
      }
    }
    this.toggleFilterSelected = false;

  }

  toggleFilter(indeX : number){

    this.statusArray[indeX].status = !this.statusArray[indeX].status;
    for(let i = 0 ; i < this.statusArray.length; i++ ) {
      if(this.statusArray[i].status == false){
        if(this.allFilterSelected == true) {
          this.toggleFilterSelected = true;
        }
        this.allFilterSelected = false;
        return;
      }
    }
    if(this.allFilterSelected == false) {
      this.toggleFilterSelected = true;
    }
    this.allFilterSelected = true;
    return;
  }

  toggleAgentSelect() {
    if(this.toggleAgentSelected == true){
      this.allAgentSelected = this.allAgentSelected;
      this.toggleAgentSelected = false;
    }
    else{
      this.allAgentSelected = !this.allAgentSelected;
      for(let i = 0 ; i < this.agentArray.length; i++ ) {
        this.agentArray[i].status = this.allAgentSelected;
      }
    }
    this.toggleAgentSelected = false;

  }

  toggleAgent(indeX : number){
    this.agentArray[indeX].status = !this.agentArray[indeX].status;

    for(let i = 0 ; i < this.agentArray.length; i++ ) {
      if(this.agentArray[i].status == false){
        if(this.allAgentSelected == true) {
          this.toggleAgentSelected = true;
        }
        this.allAgentSelected = false;
        return;
      }
    }
    if(this.allAgentSelected == false) {
      this.toggleAgentSelected = true;
    }
    this.allAgentSelected = true;
    return;
  }

  toggleSizeSelect() {
    if(this.toggleSizeSelected == true){
      this.allSizeSelected = this.allSizeSelected;
      this.toggleSizeSelected = false;
    }
    else{
      this.allSizeSelected = !this.allSizeSelected;
      for(let i = 0 ; i < this.sizeArray.length; i++ ) {
        this.sizeArray[i].status = this.allSizeSelected;
      }
    }
    this.toggleSizeSelected = false;

  }

  toggleSize(indeX : number){
    this.sizeArray[indeX].status = !this.sizeArray[indeX].status;

    for(let i = 0 ; i < this.sizeArray.length; i++ ) {
      if(this.sizeArray[i].status == false){
        if(this.allSizeSelected == true) {
          this.toggleSizeSelected = true;
        }
        this.allSizeSelected = false;
        return;
      }
    }
    if(this.allSizeSelected == false) {
      this.toggleSizeSelected = true;
    }
    this.allSizeSelected = true;
    return;
  }

  toggleTerminalSelect() {
    if(this.toggleTerminalSelected == true){
      this.allTerminalSelected = this.allTerminalSelected;
      this.toggleTerminalSelected = false;
    }
    else{
      this.allTerminalSelected = !this.allTerminalSelected;
      for(let i = 0 ; i < this.terminalArray.length; i++ ) {
        this.terminalArray[i].status = this.allTerminalSelected;
      }
    }
    this.toggleTerminalSelected = false;

  }

  toggleTerminal(indeX : number){
    this.terminalArray[indeX].status = !this.terminalArray[indeX].status;

    for(let i = 0 ; i < this.terminalArray.length; i++ ) {
      if(this.terminalArray[i].status == false){
        if(this.allTerminalSelected == true) {
          this.toggleTerminalSelected = true;
        }
        this.allTerminalSelected = false;
        return;
      }
    }
    if(this.allTerminalSelected == false) {
      this.toggleTerminalSelected = true;
    }
    this.allTerminalSelected = true;
    return;
  }
  isAgentEmpty() {
    if(this.agentArray.length > 0) {
      return false;
    } else {
      return true
    }
  }
  isTerminaltEmpty() {
    if(this.terminalArray.length > 0) {
      return false;
    } else {
      return true
    }
  }

  downloadDoc() {
    this.formValidate = true;
    this.vldsMailModal = new VldsMailModel();
    this.vldsMailModal.terminal = "";
    this.vldsMailModal.agent = "";
    this.vldsMailModal.size = "";
    this.vldsMailModal.filter = "";
    for(let i = 0 ; i < this.terminalArray.length; i++ ) {
      if(this.terminalArray[i].status == true) {
        this.vldsMailModal.terminal = this.vldsMailModal.terminal+','+this.terminalArray[i].terminalName;
      }
    }
    this.vldsMailModal.terminal = this.vldsMailModal.terminal.slice(1,this.vldsMailModal.terminal.length);

    for(let i = 0 ; i < this.agentArray.length; i++ ) {
      if(this.agentArray[i].status == true) {
        this.vldsMailModal.agent = this.vldsMailModal.agent+','+this.agentArray[i].agentName;
      }
    }
    this.vldsMailModal.agent = this.vldsMailModal.agent.slice(1,this.vldsMailModal.agent.length);

    for(let i = 0 ; i < this.statusArray.length; i++ ) {
      if(this.statusArray[i].status == true) {
        this.vldsMailModal.filter = this.vldsMailModal.filter+','+this.statusArray[i].filterName;
      }
    }
    this.vldsMailModal.filter = this.vldsMailModal.filter.slice(1,this.vldsMailModal.filter.length);

    for(let i = 0 ; i < this.sizeArray.length; i++ ) {
      if(this.sizeArray[i].status == true) {
        this.vldsMailModal.size = this.vldsMailModal.size+','+this.sizeArray[i].sizeValue;
      }
    }
    this.vldsMailModal.size = this.vldsMailModal.size.slice(1,this.vldsMailModal.size.length);

    this.vldsMailModal.rotationNoSrch = this.rotationNumber;
    this.vldsMailModal.line = this.line;
    this.vldsMailModal.size = this.vldsMailModal.size.replace("20ft", "20 FT");
    this.vldsMailModal.size = this.vldsMailModal.size.replace("40ft", "40 FT");
    this.vldsMailModal.size = this.vldsMailModal.size.replace("40ft+", "40 FT+");
    if(null == this.vldsMailModal.terminal || this.vldsMailModal.terminal== "") {
      this.setAllTerminals()
    }
    if(null == this.vldsMailModal.agent || this.vldsMailModal.agent== "") {
      this.setAllAgents()
    }
    let args = new Map();
    args.set("agent", this.vldsMailModal.agent);
    args.set("filter", this.vldsMailModal.filter);
    args.set("size", this.vldsMailModal.size);
    args.set("terminal", this.vldsMailModal.terminal);
    args.set("line", this.vldsMailModal.line);
    args.set("exportType", this.downloadMode);
    args.set("rotationNoSrch", this.rotationNumber);
    this.vldsServiceProvider.vldsDownload(args,this.downloadMode);
  }

  setAllTerminals(){
    for(let i = 0 ; i < this.terminalArray.length; i++ ) {
        this.vldsMailModal.terminal = this.vldsMailModal.terminal+','+this.terminalArray[i].terminalName;
    }
    this.vldsMailModal.terminal = this.vldsMailModal.terminal.slice(1,this.vldsMailModal.terminal.length);
  }

  setAllAgents(){
    for(let i = 0 ; i < this.agentArray.length; i++ ) {
        this.vldsMailModal.agent = this.vldsMailModal.agent+','+this.agentArray[i].agentName;
    }
    this.vldsMailModal.agent = this.vldsMailModal.agent.slice(1,this.vldsMailModal.agent.length);
  }
}



class DownloadTerminals {
  terminalName: string;
  status: boolean = false;

  constructor(terminal : string){
    this.terminalName = terminal;
  }
}

class DownloadAgents {
  agentName: string;
  status: boolean = false;

  constructor(agent : string){
    this.agentName = agent;
  }
}

class DownloadStatusFilter {
  filterName: string;
  status: boolean = false;

  constructor(filter : string){
    this.filterName = filter;
  }
}

class DownloadSizeList {
  sizeValue: string;
  status: boolean = false;

  constructor(size : string){
    this.sizeValue = size;
  }
}

