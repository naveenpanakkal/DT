import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
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
  selector: 'page-loaddischargemail',
  templateUrl: 'loaddischargemail.html',
  providers: [Utils,VldsMailModel,VldsServiceProvider]
})
export class LoadDischargeMailPage {
  groupOne : FormGroup;
  groupTwo : FormGroup;
  pages: Array<{ title: string, showDetails: boolean, hide: boolean }>;
  agentList:  string[];
  filterList:  string[];
  containerSize:  string[];
  terminalList:  string[];
  terminalArray : Terminals[] = [];
  agentArray : Agents[] = [];
  statusArray : StatusFilter[] = [];
  sizeArray : SizeList[] = [];
  mailId : string;
  submitClicked: boolean = false;
  rotationNumber : string;
  line: string;
  allFilterSelected: boolean = false;
  allAgentSelected: boolean = false;
  allSizeSelected: boolean = false;
  allTerminalSelected: boolean = false;

  toggleFilterSelected: boolean = false;
  toggleAgentSelected: boolean = false;
  toggleSizeSelected: boolean = false;
  toggleTerminalSelected: boolean = false;
  validMailId: boolean = false;
  format: string ="";
  alertEmail: string;
  sendMail: string;
  okTextSmall: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl: ViewController,public utils: Utils,
              public formBuilder: FormBuilder, public vldsMailModal :VldsMailModel,
              public vldsServiceProvider : VldsServiceProvider, public alertCtrl : AlertController) {
    this.terminalList = navParams.get('terminal_list');//[edit,new,view]
    this.agentList = navParams.get('agentList');
    this.filterList = ["Discharge","Load","Restow"];
    this.containerSize = ["20ft","40ft","40ft+"];
    this.rotationNumber = navParams.get('rotationNumber');
    this.line = navParams.get('line');
    this.terminalList.forEach( e => {this.terminalArray.push(new Terminals(e)) });
    this.agentList.forEach( e => {this.agentArray.push(new Agents(e)) });
    this.filterList.forEach( e => {this.statusArray.push(new StatusFilter(e)) });
    this.containerSize.forEach( e => {this.sizeArray.push(new SizeList(e)) });


    this.pages = [
      {title: 'Select Agent', showDetails: false, hide: false},
      {title: 'Select Filter', showDetails: false, hide: false},
      {title: 'Select Size', showDetails: false, hide: false},
      {title: 'Terminal', showDetails: false, hide: false},
      // {title: 'Report Format', showDetails: false, hide: false}
    ];

    this.groupOne = formBuilder.group({
      rotationnumber: [''],
      vesselname: ['' ],
      vldsstatus: ['',]
    });

    this.groupTwo = formBuilder.group({
      email: ['', [<any>Validators.required, <any>Validators.pattern(GlobalValidator.EMAIL_REGEX)]]
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
    } else if (page.title == 'Report Format') {
      this.pages[4].showDetails = !this.pages[4].showDetails;
    } else if (page.title == 'Add Mail IDs') {
      this.pages[4].showDetails = !this.pages[5].showDetails;
    }
  }
  getIcon(page) {
    if (page.showDetails) {
      return "arrow-dropup";
    } else {
      return "arrow-dropdown";
    }
  }

  submitDischarge() {
    this.submitClicked = true;
    this.vldsMailModal = new VldsMailModel();
    this.vldsMailModal.terminal = "";
    this.vldsMailModal.agent = "";
    this.vldsMailModal.size = "";
    this.vldsMailModal.filter = "";
    this.vldsMailModal.reportFormat = "";
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

    this.vldsMailModal.size = this.vldsMailModal.size.replace("20ft", "20 FT");
    this.vldsMailModal.size = this.vldsMailModal.size.replace("40ft", "40 FT");
    this.vldsMailModal.size = this.vldsMailModal.size.replace("40ft+", "40 FT+");
    if(null == this.vldsMailModal.terminal || this.vldsMailModal.terminal== "") {
      this.setAllTerminals()
    }
    if(null == this.vldsMailModal.agent || this.vldsMailModal.agent== "") {
      this.setAllAgents()
    }
    this.vldsMailModal.rotationNoSrch = this.rotationNumber;
    this.vldsMailModal.line = this.line;
    this.vldsMailModal.mailId = this.mailId;
    this.vldsMailModal.reportFormat = this.format;

if(this.validMailId && this.checkReportFormat())
    this.vldsServiceProvider.vldsSendMail(this.vldsMailModal).subscribe(response=> {
      this.vldsMailModal = response;
      this.alertEmail = this.utils.getLocaleString("VLDS_email_title");
      this.sendMail = this.utils.getLocaleString("VLDS_send_email");
      this.okTextSmall = this.utils.getLocaleString("ok_text_small");
      let alertMsg = this.alertEmail;
      const alert = this.alertCtrl.create({
        title: this.sendMail,
        message: alertMsg,
        buttons: [
          {
            text: this.okTextSmall,
            handler: () => {
              this.navCtrl.pop();
            }
          }
        ]
      });
      alert.present();
    },error =>{
    console.log("email - web service error"+error);
    });
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
  isEmptyMailId() {
    if(this.mailId && this.mailId.length >0 ) {
      return false;
    } else {
      return true;
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

  checkEmail(emailList : string) {
    if(emailList && emailList.length >0) {
      var emails = emailList.split(",");
      this.validMailId = true;
      var regex = /^[a-zA-Z0-9.!#$%&’*+=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i;

      for (var i = 0; i < emails.length; i++) {
        if (emails[i] == "" || !regex.test(emails[i])) {
          this.validMailId = false;
        }
      }
    } else {
      this.validMailId = false;
    }
    return this.validMailId;
  }

  checkReportFormat() {
    if(this.format &&
      ((this.format == "PDF")||
        (this.format == "CSV"))) {
      return true;
    } else {
      return false;
    }
  }

  setReportFormat(format: string) {
    this.format = format;
  }
}

class Terminals {
  terminalName: string;
  status: boolean = false;

  constructor(terminal : string){
    this.terminalName = terminal;
  }
}

class Agents {
  agentName: string;
  status: boolean = false;

  constructor(agent : string){
    this.agentName = agent;
  }
}

class StatusFilter {
  filterName: string;
  status: boolean = false;

  constructor(filter : string){
    this.filterName = filter;
  }
}

class SizeList {
  sizeValue: string;
  status: boolean = false;

  constructor(size : string){
    this.sizeValue = size;
  }
}
export class GlobalValidator {

  public static EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i;

}

