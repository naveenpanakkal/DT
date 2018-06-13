import {Component} from '@angular/core';
import {ViewController, IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { DatePipe } from '@angular/common';
import {Utils} from "../../shared/utils";
import {Keyboard} from '@ionic-native/keyboard';
import {FormBuilder, FormGroup, FormArray, Validators, FormControl} from '@angular/forms';
/**
 * Generated class for the BerthfilterpopoverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-berthfilterpopover',
  templateUrl: 'berthfilterpopover.html',
  providers:[Utils]

})
export class BerthfilterpopoverPage {
  pattern=/06([0-9])/;
  inputStringPattern: string = "^[a-zA-Z0-9 ]*$";
  pages: Array<{ title: string, showDetails: boolean }>;
  showSubmenu: any;
  filterSelected: any;
  rotationNo: string;
  vesselName: string;
  maxvalue: any;
  date : Date;
  dateFormat: string = 'DD/MM/YYYY HH:mm';
   public eta: any;
  public createdDate: any;
  minDate : any;
  maxDate : any;
  etatime:any;
  varetaDate = null;
  disableControls:boolean;
  groupOne : FormGroup;

  constructor(public keyboard: Keyboard, public navCtrl: NavController, public navParams: NavParams,
  public viewCtrl: ViewController, private storage: Storage, public datepipe: DatePipe,
              public utils:Utils,public formBuilder: FormBuilder) {

    this.pages = [
      {title: 'Rotation Number', showDetails: false},
      {title: 'Vessel Name', showDetails: false},
      {title: 'ETA(GST)', showDetails: false},
      {title: 'Berth Booking Status', showDetails: false}
    ];

    this.maxvalue = new Date().toISOString();
    storage.get('submenu').then((val) => {
      if (!val) {
       }
      else {
         if (val.title === 'Berth Booking Status') {
          this.pages = [
            {title: 'Rotation Number', showDetails: false},
            {title: 'Vessel Name', showDetails: false},
            {title: 'ETA(GST)', showDetails: false},
            {title: 'Berth Booking Status', showDetails: false}
          ]
        }
      }
    });
        storage.get('filterSelected').then((val) => {
        if(val) {
        this.filterSelected = val;
      } else {
        this.filterSelected = 'All';
      }
    });

    storage.get('vesselname').then((val) => {
           this.vesselName = val;
     });

    storage.get('rotationno').then((val) => {
         this.rotationNo = val;
         this.rotationChange();
    });
     if (null == localStorage.getItem('ETA') || ("" == localStorage.getItem('ETA'))) {
     this.eta="";
     this.varetaDate = null;
    }
    else {
      this.eta =localStorage.getItem('ETA') ;
      this.etatime=this.eta.split("T")[1];
      this.etatime=this.etatime.substr(0,this.etatime.lastIndexOf(':'));
      this.varetaDate = this.datepipe.transform(this.eta.split("T")[0], 'dd/MM/yyyy');
      this.varetaDate = this.varetaDate+" "+this.etatime;
    //  this.eta = this.datepipe.transform(this.eta, 'yyyy-MM-dd HH:mm');
     }
     this.groupOne = formBuilder.group({
      eta: [''],
      vesselName: [''],
      filterSelected: [''],
      rotationnumber: ['', Validators.compose([Validators.pattern(/^((?!(0))[0-9]*)$/)])],
     });
      this.setETApicker();
  }
 getIcon(page) {
    if (page.showDetails) {
      return "arrow-dropup";
    } else {
      return "arrow-dropdown";
    }
  }

  toggleDetails(page) {
    this.showSubmenu = true;
    if (page.title == 'Rotation Number') {
      this.pages[0].showDetails = !this.pages[0].showDetails;
      this.pages[1].showDetails = false;
      this.pages[2].showDetails = false;
      this.pages[3].showDetails = false;
    } else if (page.title == 'Vessel Name') {
      this.pages[0].showDetails = false;
      this.pages[1].showDetails = !this.pages[1].showDetails;
      this.pages[2].showDetails = false;
      this.pages[3].showDetails = false;
    } else if (page.title == 'ETA(GST)') {
      this.pages[0].showDetails = false;
      this.pages[1].showDetails = false;
      this.pages[2].showDetails = !this.pages[2].showDetails;
      this.pages[3].showDetails = false;
    } else if (page.title == 'Berth Booking Status') {
      this.pages[0].showDetails = false;
      this.pages[1].showDetails = false;
      this.pages[2].showDetails = false;
      this.pages[3].showDetails = !this.pages[3].showDetails;
    }
    this.storage.set('submenu', page);
  }
  clear() {
    this.filterSelected = "All";
    this.rotationNo = null;
    this.vesselName = null;
    this.eta = null;
    this.varetaDate=null;
    this.storage.remove('filterSelected');
    this.storage.remove('rotationno');
    this.storage.remove('vesselname');
    localStorage.removeItem('ETA');
    this.rotationChange();
  }
 submit() {

if(this.groupOne.valid) {
      this.storage.set('filterSelected', this.filterSelected);
    this.storage.set('rotationno', this.rotationNo);
    this.storage.set('vesselname', this.vesselName);
     if (this.eta) {
      localStorage.setItem('ETA', this.eta);
      this.etatime=this.eta.split("T")[1];
      this.etatime=this.etatime.substr(0,this.etatime.lastIndexOf(':'));
      this.varetaDate = this.datepipe.transform(this.eta.split("T")[0], 'dd/MM/yyyy');
      this.varetaDate = this.varetaDate+" "+this.etatime;
    } else {
     localStorage.removeItem('ETA');
      this.varetaDate=null;
    }
 this.viewCtrl.dismiss({
      statusFilter: this.filterSelected,
      vesselName: this.vesselName,
      rotationNo: this.rotationNo,
      eta: this.varetaDate,
    }).catch(() => {
      console.log('error');
    });
}

 }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BerthfilterpopoverPage');

  }
  setETApicker(){
    this.minDate = new Date();
    this.minDate.setMonth(this.minDate.getMonth() -3);
    this.maxDate = new Date();
    this.maxDate.setMonth(this.maxDate.getMonth() +3);
    this.minDate= this.minDate.toISOString().substr(0,10);
    this.maxDate = this.maxDate.toISOString().substr(0,10);
  }
  keyUpValidate(e,format,model)
  {
    this.utils.keyUpValidate(e, format);
    if(model=='rotationNo')
    {
      this.rotationNo=e.target.value;
    }else if (model=='vesselName'){
      this.vesselName=e.target.value;
    }

  }
  keyboardClose() {
    this.keyboard.close();
}
rotationChange() {
     if(null != this.rotationNo && this.rotationNo.length >0) {
      this.disableControls=true;
     } else {
      this.disableControls= false;
      this.rotationNo="";
    }
  }
}
