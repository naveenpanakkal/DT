import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, Navbar, NavController, NavParams} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {DatePipe} from "@angular/common";
import {Utils} from "../../shared/utils";
import {Keyboard} from "@ionic-native/keyboard";
import {FormBuilder, FormGroup, FormArray, Validators, FormControl} from '@angular/forms';
import {VesselloaddischargesummarysearchresultPage} from "../vesselloaddischargesummarysearchresult/vesselloaddischargesummarysearchresult";
import {TranslateService} from "@ngx-translate/core";
import {VesselViewPage} from "../vesselview/vesselview";
import {VldsSearchReqModel} from "../../shared/model/VLDS/vldssearchallreq.model";
import {ValidationService} from "../../shared/validation.service";

/**
 * Generated class for the vesselloaddischargesummaryfilter page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-vesselloaddischargesummaryfilter',
  templateUrl: 'vesselloaddischargesummaryfilter.html',
  providers: [Utils]
})

export class VesselloaddischargesummaryfilterPage {
  vldsrotationnumber: any;
  vldsvesselname: any;
  vldsstatus: any;
  vldsetafrom: any;
  vldsetato: any;
  vldsatdfrom: any;
  vldsatdto: any;
  groupOne: FormGroup;
  disableControls: boolean;
  isStatus1: boolean = false;
  isStatus3: boolean = false;
  filter: boolean = false;
  dateFormat: string = 'DD/MM/YYYY';
  etaValidate: boolean = false;
  atdValidate: boolean = false;
  previousValueforName: string = '';
  public vldsSearchReqModal: VldsSearchReqModel;
  attenionHeadding: string;
  lessFromDate: string;
  lessToDate: string;
  invalidRotation:boolean = false;
  invalidVessel:boolean = false;
  vesselNamePattern: string = "^[a-z0-9A-Z ]*$";

  constructor(public keyboard: Keyboard,
              public navCtrl: NavController, public navParams: NavParams,
              public datepipe: DatePipe,
              public utils: Utils, public translate: TranslateService,
              private alertCtrl: AlertController, public formBuilder: FormBuilder, private storage: Storage) {
    translate.setDefaultLang('en');
    translate.use('en');
    this.groupOne = formBuilder.group({
      rotationnumber: ['', Validators.compose([ValidationService.numberValidate])],
      vesselname: ['',Validators.compose([Validators.pattern(this.vesselNamePattern)])],
      vldsstatus: [''],
      vldsetafrom: ['', Validators.compose([Validators.required])],
      vldsetato: ['', Validators.compose([Validators.required])],
      vldsatdfrom: ['', Validators.compose([Validators.required])],
      vldsatdto: ['', Validators.compose([Validators.required])],
    });

    this.vldsSearchReqModal = this.navParams.get("Request");
    this.previousValueforName = ''
    this.vldsrotationnumber = this.vldsSearchReqModal.rotationNoSrch;
    this.rotationChange();
    this.vldsvesselname = this.vldsSearchReqModal.vesselName;
    if(!this.vldsSearchReqModal.vesselStatusSrch) {
      this.vldsstatus = this.utils.getLocaleString("VLDS_select");
    } else {
      this.vldsstatus = this.vldsSearchReqModal.vesselStatusSrch;
      this.valueselected();
    }

    if (null != this.vldsSearchReqModal.etaFromDateSrch && this.vldsSearchReqModal.etaFromDateSrch != "") {
      this.vldsetafrom = this.parsedate(this.vldsSearchReqModal.etaFromDateSrch);
    }if (null != this.vldsSearchReqModal.etaToDateSrch && this.vldsSearchReqModal.etaToDateSrch != "") {
      this.vldsetato = this.parsedate(this.vldsSearchReqModal.etaToDateSrch);
    }if (null != this.vldsSearchReqModal.atdFrmDateSrch && this.vldsSearchReqModal.atdFrmDateSrch != "") {
      this.vldsatdfrom = this.parsedate(this.vldsSearchReqModal.atdFrmDateSrch);
    }if (null != this.vldsSearchReqModal.atdToDateSrch && this.vldsSearchReqModal.atdToDateSrch != "") {
      this.vldsatdto = this.parsedate(this.vldsSearchReqModal.atdToDateSrch);
    }

  }

  ionViewDidLoad() {
   // this.vldsstatus = this.utils.getLocaleString("VLDS_select");
    this.vldsetafrom = this.vldsSearchReqModal.etaFromDateSrch;
     this.vldsetato = this.vldsSearchReqModal.etaToDateSrch;
  }

  reset() {
    this.vldsrotationnumber = "";
    this.vldsvesselname = "";
    this.vldsstatus = this.utils.getLocaleString("VLDS_select");
    this.vldsetafrom = "";
    this.vldsetato = "";
    this.vldsatdfrom = "";
    this.vldsatdto = "";
    this.previousValueforName = '';
    this.isStatus1 = false;
    this.isStatus3 = false;

    this.rotationChange();
  }

  parsedate(dtstring) {
    if (dtstring != null && dtstring.length > 5) {
      let pattern = /(\d{2})(\d{2})(\d{4})/;
      dtstring = dtstring.replace("/", "");
      dtstring = dtstring.replace("/", "");
      let date = new Date(dtstring.replace(pattern, '$3-$2-$1'));
      return date.toISOString();
    }
    else {
      return null;
    }
  }

  keyUpValidate(e, format, model) {
    this.utils.keyUpValidate(e, format);
    if (model == 'rotationNumber') {
      this.vldsrotationnumber = e.target.value;
    } else if (model == 'vesselname') {
      this.vldsvesselname = e.target.value;
    }
  }

  keyUpChecker(ev) {
    let elementChecker: string;
    let format = /^[a-zA-Z0-9 ]*$/i;
    elementChecker = ev.target.value;
    let currentKeyCode = ev.keyCode;
    if (currentKeyCode >= 48 && currentKeyCode <= 57) {
      this.vldsvesselname = ev.target.value;
    }
    if (currentKeyCode >= 65 && currentKeyCode <= 90) {
      this.vldsvesselname = ev.target.value;
    }
    if (currentKeyCode >= 96 && currentKeyCode <= 105) {
      this.vldsvesselname = ev.target.value;
    }
    if (currentKeyCode == 32) {
      this.vldsvesselname = ev.target.value;
    }
    if (!format.test(elementChecker)) {
      this.vldsvesselname = this.previousValueforName;
    }
    else {
      this.previousValueforName = this.vldsvesselname;
    }
  }

  keyboardClose() {
    this.keyboard.close();
  }

  rotationChange() {
    if (null != this.vldsrotationnumber && this.vldsrotationnumber.length > 0) {
      this.disableControls = true;
      this.etaValidate = false;
      this.atdValidate = false;
    } else {
      this.disableControls = false;
    }
  }
  validateFormat(format: string, item: string) {
      if(item == 'rotationNumber') {
        if(this.validate(this.vldsrotationnumber, format)) {
          this.vldsrotationnumber = "";
          this.invalidRotation = true;
          //this.presentAlert("ATTENTION", 'Rotation number is Invalid.');
          return;
        }
      } else if(item == 'vesselName') {
        if(null == this.vldsvesselname) {
          this.vldsvesselname = "";
          this.invalidVessel = true;
          //this.presentAlert("ATTENTION", 'Vessel Name is Invalid.');
          return;
        } else if(this.validate(this.vldsvesselname, format)) {
          this.vldsvesselname = "";
          this.invalidVessel = true;
          //this.presentAlert("ATTENTION", 'Vessel Name is Invalid.');
          return;
        }
      }
      this.invalidRotation = false;
      this.invalidVessel = false;
  }

  validate(model, format) {
    if(model!=null && model.length>0)
    {
      let pattern = new RegExp(format);
      try {
        if (pattern.test(model)) {
          return false;
        }
        else {
          return true;
        }
      } catch (ex) {
        console.log(ex);
      }
    }
    else {
      return false;
    }
  }
  presentAlert(title: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  showVLDSresults() {

    this.attenionHeadding = this.utils.getLocaleString("attention");
    this.lessFromDate = this.utils.getLocaleString("VLDS_eta_less_from_date");
    this.lessToDate = this.utils.getLocaleString("VLDS_eta_less_to_date");
    this.etaValidate = false;
    this.atdValidate = false;
    let etaFrom = this.vldsetafrom;
    let etaTo = this.vldsetato;
    let ataFrom = this.vldsatdfrom;
    let ataTo = this.vldsatdto;
    if(this.vldsrotationnumber==null || this.vldsrotationnumber=="")
    {
      if(this.vldsetafrom!="" && this.vldsetato != "") {
        etaFrom = this.parsedate(etaFrom);
        etaFrom = new Date(this.datepipe.transform(etaFrom));
        etaFrom.setHours(0, 0, 0, 0);
        etaTo = this.parsedate(etaTo);
        etaTo = new Date(this.datepipe.transform(etaTo));
        etaTo.setHours(0, 0, 0, 0);
        if (etaFrom > etaTo) {
          this.etaValidate = true;
          this.presentAlert(this.attenionHeadding, this.lessFromDate);
          return;
        }
      }
      if(this.vldsatdfrom!="" && this.vldsatdto != "") {
        ataFrom = this.parsedate(ataFrom);
        ataFrom = new Date(this.datepipe.transform(ataFrom));
        ataFrom.setHours(0, 0, 0, 0);
        ataTo = this.parsedate(ataTo);
        ataTo = new Date(this.datepipe.transform(ataTo));
        ataTo.setHours(0, 0, 0, 0);
        if (ataFrom > ataTo) {
          this.atdValidate = true;
          this.presentAlert(this.attenionHeadding, this.lessToDate);
          return;
        }
      }
      if(this.vldsvesselname != null && this.vldsvesselname != "") {
        this.validateFormat('^[a-zA-Z0-9 ]*$','vesselName');
        if(this.invalidVessel == true) {
          return;
        }
      }

    } else {
      this.validateFormat('^((?!(0))[0-9]*)$','rotationNumber');
      if(this.invalidRotation == true || this.invalidVessel == true) {
        return;
      }
    }
    if (this.isStatus1 && (!this.disableControls) &&
      (this.vldsetafrom == "" || this.vldsetato == "" || this.vldsetafrom == null || this.vldsetato == null)) {
      this.etaValidate = true;
      return;
    }
    if (this.isStatus3 && (!this.disableControls) &&
      (this.vldsatdfrom == "" || this.vldsatdto == "" || this.vldsatdfrom == null || this.vldsatdto == null)) {
      this.atdValidate = true;
      return;
    }
    if (!this.etaValidate && !this.atdValidate) {
      if (this.vldsatdfrom && this.vldsatdfrom != "") {
        // this.storage.set('vlatdfrom', this.vldsatdfrom);
        this.vldsatdfrom = this.parsedate(this.vldsatdfrom);
        this.vldsatdfrom = this.datepipe.transform(this.vldsatdfrom, 'dd/MM/yyyy');
      } else {
        this.vldsatdfrom = "";
      }
      if (null != this.vldsatdto && this.vldsatdto != "") {
        // this.storage.set('vlatdto', this.vldsatdto);
        this.vldsatdto = this.parsedate(this.vldsatdto);
        this.vldsatdto = this.datepipe.transform(this.vldsatdto, 'dd/MM/yyyy');
      } else {
        this.vldsatdto = "";
      }
      if (null != this.vldsetafrom && this.vldsetafrom != "") {
        // this.storage.set('vletafrom', this.vldsetafrom);
        this.vldsetafrom = this.parsedate(this.vldsetafrom);
        this.vldsetafrom = this.datepipe.transform(this.vldsetafrom, 'dd/MM/yyyy');
      } else {
        this.vldsetafrom = "";
      }
      if (null != this.vldsetato && this.vldsetato != "") {
        // this.storage.set('vletato', this.vldsetato);
        this.vldsetato = this.parsedate(this.vldsetato);
        this.vldsetato = this.datepipe.transform(this.vldsetato, 'dd/MM/yyyy');
      } else {
        this.vldsetato = "";
      }

      if (this.vldsstatus == this.utils.getLocaleString("VLDS_select")) {
        this.vldsstatus = "";
      }

      this.vldsSearchReqModal.rotationNoSrch = this.vldsrotationnumber;
      this.vldsSearchReqModal.vesselName = this.vldsvesselname;
      this.vldsSearchReqModal.vesselStatusSrch = this.vldsstatus;
      this.vldsSearchReqModal.etaFromDateSrch = this.vldsetafrom;
      this.vldsSearchReqModal.etaToDateSrch = this.vldsetato;
      this.vldsSearchReqModal.atdFrmDateSrch = this.vldsatdfrom;
      this.vldsSearchReqModal.atdToDateSrch = this.vldsatdto;
      this.navCtrl.pop();

    }
  }

  disableSerach() {
    if(this.vldsrotationnumber!=null && this.vldsrotationnumber.length>0)
    {
      if (this.groupOne.controls.rotationnumber.valid)
        return false;
      else
        return true;
    }
    else {
      if (this.groupOne.controls.rotationnumber.valid
        && this.groupOne.controls.vesselname.valid
      ) {
        return false;
      }
      else {
        return true;
      }
    }
  }

  valueselected() {
    this.etaValidate = false;
    this.atdValidate = false;
    this.isStatus1 = false;
    this.isStatus3 = false;
    let VLDSStatus1;
    let VLDSStatus3;
    this.vldsatdfrom = "";
    this.vldsatdto = "";
    this.vldsetafrom = "";
    this.vldsetato = "";
    VLDSStatus1 = this.utils.getLocaleString("VLDS_yettoarriveValue");
    VLDSStatus3 = this.utils.getLocaleString("VLDS_sailed");
    if (this.vldsstatus == VLDSStatus1) {
      this.isStatus1 = true;
    }
    if (this.vldsstatus == VLDSStatus3) {
      this.isStatus3 = true;
    }
  }

}
