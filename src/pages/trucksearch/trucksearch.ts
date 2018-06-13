import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, App, NavParams, AlertController, Navbar, Content} from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {TruckdetailsPage} from '../truckdetails/truckdetails';
import {TruckSearchForReqModel} from '../../shared/model/trucksearchview/trucksearchforreg.model';
import {TruckRegResultModel} from '../../shared/model/trucksearchdetails/truckregresult.model';
import {TruckservicesProvider} from "../../providers/webservices/truckservices";
import {TRUCK_COUNTRY_MASTER} from "../../shared/serviceconfiguration";
import {Keyboard} from '@ionic-native/keyboard';
import {Utils, validatePattern, formValidatePattern} from "../../shared/utils";
import {ValidationService} from "../../shared/validation.service";

/**
 * Generated class for the TrucksearchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-trucksearch',
  templateUrl: 'trucksearch.html',
  providers: [TruckSearchForReqModel, TruckRegResultModel, Utils]
})
export class TrucksearchPage {
  formOne: FormGroup;
  formTwo: FormGroup;
  formThree: FormGroup;
  searchTerm: string = '';
  searchControl: FormControl;
  countryitems: any;
  searching: any = false;
  searchQuery: string = '';
  previouslicensePlateNo: string = '';
  items: string[];
  states: string[];

  validateCountry: boolean = true;
  validateState: boolean = true;
  showAlert: boolean = false;
  sh_msg: boolean = false;
  isCountrySelected: boolean = true;
  private searchtruckcountry: boolean = false;
  private searchtruckstate: boolean = false;

  private submit: boolean = false;

  private showcolnstat: boolean = false;

  truckcountry: any;
  truckstate: any;
  platetype: any;
  platecode: any;
  lpn: any;

  temparray: any[] = [];

  countryarray: any[] = [];
  statearray: any[];

  filterarray: any[] = [];
  temporary: any;
  showCountryField: boolean;
  showStateField: boolean;
  tempCountryList: any[];
  rawCountryList: any[];
  stateDisabledStatus: boolean = true;
  alertMsg: string;

  @ViewChild(Content) content: Content;
  @ViewChild('navbar') navBar: Navbar;

  constructor(public keyboard: Keyboard, public http: Http, public navCtrl: NavController, public utils: Utils, public trucksearchresultService: TruckservicesProvider, public app: App, public navParams: NavParams, public alertCtrl: AlertController, public formBuilder: FormBuilder, public truckSearchForReqModel: TruckSearchForReqModel, public truckRegResultModel: TruckRegResultModel) {


    this.searchControl = new FormControl();

    this.formOne = this.formBuilder.group({
      seacou: ['', Validators.compose([Validators.required])],
      seasta: ['', Validators.compose([Validators.required])]
    });


    this.formTwo = this.formBuilder.group({
      plateType: ['', Validators.compose([Validators.required])],
      plateCode: ['', Validators.compose([Validators.required])]
    });


    this.formThree = this.formBuilder.group({
      licplatenum: ['', [ValidationService.licensePlateNoValidate, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(255)])]]
    });


  }

  keyUpChecker(ev) {
    let elementChecker: string;
    let format = /^([a-zA-Z0-9])([a-zA-Z0-9- \/])*$/i;
    elementChecker = ev.target.value;
    let currentKeyCode = ev.keyCode;
    this.utils.keyUpValidate(ev, format);
    if (currentKeyCode >= 48 && currentKeyCode <= 57) {
      this.truckSearchForReqModel.licensePlateNo = ev.target.value;
    }
    if (currentKeyCode >= 65 && currentKeyCode <= 90) {
      this.truckSearchForReqModel.licensePlateNo = ev.target.value;
    }
    if (currentKeyCode >= 96 && currentKeyCode <= 105) {
      this.truckSearchForReqModel.licensePlateNo = ev.target.value;
    }
    if (currentKeyCode == 32) {
      this.truckSearchForReqModel.licensePlateNo = ev.target.value;
    }
    if (currentKeyCode == 229) {
      this.truckSearchForReqModel.licensePlateNo = ev.target.value;
      this.previouslicensePlateNo = this.truckSearchForReqModel.licensePlateNo;
    }
  }
  ionViewDidEnter() {
    this.sh_msg = false;
    this.navBar.backButtonClick = () => {
      this.truckSearchForReqModel.countryOfRegistration = '';
      this.truckSearchForReqModel.state = '';
      this.navCtrl.pop();
    }

  }

  ionViewDidLoad() {
    this.truckcountry = null;
    this.truckstate = null;
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      this.searching = false;
      this.setFilteredItems();
    });

    this.loadlists('', '');
  }

  loadlists(country: string, state: string) {
    var headers = new Headers();

    let body = {"countryName": country, "stateName": state};

    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({headers: headers});
    this.http.post(TRUCK_COUNTRY_MASTER, JSON.stringify(body), options).map(res => res.json().list).subscribe((data) => {
      this.temporary = data;
      this.initilize();
    })
  }

  initilize() {
    this.temparray = this.temporary;
  }

  searchcountry() {
    this.showcolnstat = !this.showcolnstat;
  }

  setcountandstate(s) {
    this.showcolnstat = !this.showcolnstat;
    this.truckcountry = s.countryName;
    this.truckstate = s.stateName;
  }


  onSearchInput() {
    this.setFilteredItems();
    this.searching = true;
  }


  searchtruck() {
    this.submit = true;
    this.truckSearchForReqModel.licensePlateNo = validatePattern("/^[a-z0-9A-Z ]*$/", this.truckSearchForReqModel.licensePlateNo);
    if (!this.truckSearchForReqModel.licensePlateNo || !this.truckSearchForReqModel.state ||
      !this.truckSearchForReqModel.countryOfRegistration ||
      !this.truckSearchForReqModel.plateType ||
      !this.truckSearchForReqModel.plateCode) {
      this.presentAlert("Attention", 'Please Enter All Mandatory Fields');
      return;
    }
    else if (this.formOne.valid && this.formTwo.valid && this.formThree.valid) {
      if (this.truckSearchForReqModel.licensePlateNo && this.truckSearchForReqModel.licensePlateNo.length >= 3 && this.truckSearchForReqModel.licensePlateNo.length <= 255) {
        this.truckSearchForReqModel.CheckcountryOfRegistration = this.truckSearchForReqModel.countryOfRegistration;
        this.truckSearchForReqModel.CheckState = this.truckSearchForReqModel.state;
        this.trucksearchresultService.searchTruckForRegistration(this.truckSearchForReqModel)
          .subscribe(response => {
              this.truckRegResultModel = <TruckRegResultModel>response;
              if (this.truckRegResultModel && this.truckRegResultModel.truckRegistrationId) {
                if (this.truckRegResultModel.clientCode) {
                  if (this.truckRegResultModel.clientCode == localStorage.getItem('CLIENT_CODE') && !(this.truckRegResultModel.status == "Rejected")) {
                    if (this.truckRegResultModel.amendRequestStatus == "Pending") {
                      let alert = this.alertCtrl.create({
                        title: 'Alert',
                        subTitle: 'The truck is already registered. Click Ok to view details.',
                        buttons: [
                          {
                            text: 'Ok',
                            handler: () => {
                              this.navCtrl.push(TruckdetailsPage, {
                                sel_truckId: this.truckRegResultModel.truckRegistrationId,
                                reg_aut_so_list: this.truckRegResultModel.truckRegAuthorityMasterSOList,
                                mode: 'view'
                              });
                            },
                          },
                          {
                            text: 'Cancel',
                            handler: () => {
                              // console.log('cancel click');
                            },
                          }],
                        enableBackdropDismiss: false
                      });
                      alert.present();
                    }
                    else {
                      let alert = this.alertCtrl.create({
                        title: 'Alert',
                        subTitle: 'The truck is already registered. Click Ok to edit details.',
                        buttons: [
                          {
                            text: 'Ok',
                            handler: () => {
                              this.navCtrl.push(TruckdetailsPage, {
                                sel_truckId: this.truckRegResultModel.truckRegistrationId,
                                reg_aut_so_list: this.truckRegResultModel.truckRegAuthorityMasterSOList,
                                mode: 'edit'
                              });
                            },
                          },
                          {
                            text: 'Cancel',
                            handler: () => {
                              // console.log('cancel click');
                            },
                          }],
                        enableBackdropDismiss: false
                      });
                      alert.present();
                    }
                  } else {
                    if (this.truckRegResultModel.status == "Approved") {
                      //rereg
                      let alert = this.alertCtrl.create({
                        title: 'Alert',
                        subTitle: 'The truck is already registered under another company. Do you want to re-register?',
                        buttons: [
                          {
                            text: 'Yes',
                            handler: () => {
                              this.navCtrl.push(TruckdetailsPage, {
                                sel_truckId: this.truckRegResultModel.truckRegistrationId,
                                reg_aut_so_list: this.truckRegResultModel.truckRegAuthorityMasterSOList,
                                mode: 'edit',
                                rereg: 'rereg'
                              });
                            },
                          },
                          {
                            text: 'No',
                            handler: () => {
                              // console.log('cancel click');
                            },
                          }],
                        enableBackdropDismiss: false
                      });
                      alert.present();
                    }
                    else if (this.truckRegResultModel.amendRequestStatus == "Pending" && this.truckRegResultModel.clientCode == localStorage.getItem('CLIENT_CODE')) {
                      let alert = this.alertCtrl.create({
                        title: 'Alert',
                        subTitle: 'The truck is already registered. Click Ok to view details.',
                        buttons: [
                          {
                            text: 'Ok',
                            handler: () => {
                              this.navCtrl.push(TruckdetailsPage, {
                                sel_truckId: this.truckRegResultModel.truckRegistrationId,
                                reg_aut_so_list: this.truckRegResultModel.truckRegAuthorityMasterSOList,
                                mode: 'view'
                              });
                            },
                          },
                          {
                            text: 'Cancel',
                            handler: () => {
                              // console.log('cancel click');
                            },
                          }],
                        enableBackdropDismiss: false
                      });
                      alert.present();
                    }
                    else {
                      let alert = this.alertCtrl.create({
                        title: 'Alert',
                        subTitle: 'The truck details are not available. Do you want to register?',
                        buttons: [
                          {
                            text: 'Ok',
                            handler: () => {
                              this.navCtrl.push(TruckdetailsPage, {
                                reg_aut_so_list: this.truckRegResultModel.truckRegAuthorityMasterSOList,
                                pool_so_list: this.truckRegResultModel.truckRegPoolSOList,
                                terminal_so_list: this.truckRegResultModel.truckRegTerminalSOList,
                                country: this.truckSearchForReqModel.countryOfRegistration,
                                state: this.truckSearchForReqModel.state,
                                PlateType: this.truckSearchForReqModel.plateType,
                                PlateCode: this.truckSearchForReqModel.plateCode,
                                LPN: this.truckSearchForReqModel.licensePlateNo,
                                mode: 'new'
                              });
                            },
                          },
                          {
                            text: 'Cancel',
                            handler: () => {
                              // console.log('cancel click');
                            },
                          }],
                        enableBackdropDismiss: false
                      });
                      alert.present();
                    }
                  }
                }
                else {
                  let alert = this.alertCtrl.create({
                    title: 'Alert',
                    subTitle: 'The truck details are not available. Do you want to register?',
                    buttons: [
                      {
                        text: 'Ok',
                        handler: () => {
                          this.navCtrl.push(TruckdetailsPage, {
                            reg_aut_so_list: this.truckRegResultModel.truckRegAuthorityMasterSOList,
                            pool_so_list: this.truckRegResultModel.truckRegPoolSOList,
                            terminal_so_list: this.truckRegResultModel.truckRegTerminalSOList,
                            country: this.truckSearchForReqModel.countryOfRegistration,
                            state: this.truckSearchForReqModel.state,
                            PlateType: this.truckSearchForReqModel.plateType,
                            PlateCode: this.truckSearchForReqModel.plateCode,
                            LPN: this.truckSearchForReqModel.licensePlateNo,
                            mode: 'new'
                          });
                        },
                      },
                      {
                        text: 'Cancel',
                        handler: () => {
                          // console.log('cancel click');
                        },
                      }],
                    enableBackdropDismiss: false
                  });
                  alert.present();
                }
              }
              else {
                let alert = this.alertCtrl.create({
                  title: 'Alert',
                  subTitle: 'The truck details are not available. Do you want to register?',
                  buttons: [
                    {
                      text: 'Ok',
                      handler: () => {
                        this.navCtrl.push(TruckdetailsPage, {
                          reg_aut_so_list: this.truckRegResultModel.truckRegAuthorityMasterSOList,
                          pool_so_list: this.truckRegResultModel.truckRegPoolSOList,
                          terminal_so_list: this.truckRegResultModel.truckRegTerminalSOList,
                          country: this.truckSearchForReqModel.countryOfRegistration,
                          state: this.truckSearchForReqModel.state,
                          PlateType: this.truckSearchForReqModel.plateType,
                          PlateCode: this.truckSearchForReqModel.plateCode,
                          LPN: this.truckSearchForReqModel.licensePlateNo,
                          mode: 'new'
                        });
                      },
                    },
                    {
                      text: 'Cancel',
                      handler: () => {
                        // console.log('cancel click');
                      },
                    }],
                  enableBackdropDismiss: false
                });
                alert.present();
              }
            },
            error => {
              if (error[0] && error[0].errorCode && error[0].errorCode === 'ERR_COUNTRY_STATE' && !this.showAlert) {
                let alert = this.alertCtrl.create({
                  title: 'Alert',
                  subTitle: 'Country / State is Invalid.',
                  buttons: ['Dismiss']
                });
                this.truckSearchForReqModel.state = "";
                this.truckSearchForReqModel.countryOfRegistration = "";
                alert.present();
                this.showAlert = true;
              }
            });
      }
    }
    else {

      /*this.alertMsg = 'Please Enter All Mandatory Fields';
      const alert = this.alertCtrl.create({
        title: 'Alert',
        message: this.alertMsg,
        buttons: [
          {
            text: 'OK',
            handler: () => {
              alert.dismiss();
            }
          }
        ]
      });
      alert.present();*/
      this.content.scrollToTop(0);
    }
  }

  setFilteredItems() {


  }

  getvalue(item) {
    // this.truckcountry = item;
    // this.searchtruckcountry = !this.searchtruckcountry;
  }

  getstatevalue(state) {
    // this.truckstate = state;
    //  this.searchtruckstate = !this.searchtruckstate;
  }

  getstateItems(truckstate) {

  }

  hideCountryChange() {
    setTimeout(() => {
      this.showAlert = false;
      if (this.validateCountry == true && this.truckSearchForReqModel.countryOfRegistration.length > 0) {
        if (this.truckSearchForReqModel.state && this.truckSearchForReqModel.state.length > 0) {
          let searchResp = this.temparray.find((item) => {

            if (this.truckSearchForReqModel.countryOfRegistration
              && this.truckSearchForReqModel.countryOfRegistration.toString().toLowerCase()
              == item.countryName.toString().toLowerCase()
              && this.truckSearchForReqModel.state && this.truckSearchForReqModel.state.toString().toLowerCase()
              == item.stateName.toString().toLowerCase()) {
              return (item.stateName);
            }
          })
          if (!searchResp && this.sh_msg) {
            this.truckSearchForReqModel.countryOfRegistration = "";
            // if(this.truckSearchForReqModel.countryOfRegistration.length < 3 &&
            //   this.truckSearchForReqModel.countryOfRegistration.length != 0){
            //   this.presentAlert("Attention", 'Country is Invalid.');
            // }
            // else{
            this.presentAlert("Attention", 'Country is Invalid.');
            this.showAlert = true;
            // }
          }
          else {
            this.countryarray.forEach(country => {
              if (country.toString().toLowerCase()
                == this.truckSearchForReqModel.countryOfRegistration.toString().toLowerCase()) {
                this.truckSearchForReqModel.countryOfRegistration = country.toString()
              }
            })
            /*this.truckSearchForReqModel.state=''*/

          }
          this.showCountryField = false;
        } else {
          let searchResp = this.temparray.find((item) => {
            if (this.truckSearchForReqModel.countryOfRegistration
              && this.truckSearchForReqModel.countryOfRegistration.toString().toLowerCase()
              == item.countryName.toString().toLowerCase()) {
              return (item.stateName);
            }
          })
          if (!searchResp && this.sh_msg) {
            this.truckSearchForReqModel.countryOfRegistration = "";
            if (this.truckSearchForReqModel.countryOfRegistration.length < 3 &&
              this.truckSearchForReqModel.countryOfRegistration.length > 0) {
              //this.presentAlert("Alert", 'Please enter at least 3 characters.');
              this.presentAlert("Attention", 'Country is Invalid.');
            }
            else {
              this.presentAlert("Attention", 'Country is Invalid.');
              this.showAlert = true;
            }
            this.truckSearchForReqModel.state = ''
          }
          else {
            this.countryarray.forEach(country => {
              if (country.toString().toLowerCase()
                == this.truckSearchForReqModel.countryOfRegistration.toString().toLowerCase()) {
                this.truckSearchForReqModel.countryOfRegistration = country.toString()
              }
            })
            this.truckSearchForReqModel.state = ''

          }
          this.showCountryField = false;
        }
      } else {
        this.validateCountry = true;
      }
    }, 500);
  }


  getCountryNames(ev: any) {
    // set val to the value of the searchbar
    let val = ev.target.value;
    // if the value is an empty string don't filter the items
    this.tempCountryList = [];
    this.rawCountryList = [];
    for (let itemElement of this.temparray) {
      this.tempCountryList.push(itemElement.countryName);
    }
    this.rawCountryList = Array.from(new Set(this.tempCountryList));
    if (val && val.trim() != '') {
      this.isCountrySelected = true;
      this.countryarray = this.rawCountryList.filter((item) => {

        if (item.toLowerCase().includes(val.toLowerCase())) {
          this.showCountryField = true;
        }
        return (item.toLowerCase().includes(val.toLowerCase()));
      })

      if (this.countryarray.length > 0) {
        if (this.countryarray[0].toLowerCase() == val) {
          this.sh_msg = false;
        } else {
          this.sh_msg = true;
        }
      }
    } else {
      // hide the results when the query is empty
      this.showCountryField = false;
      this.isCountrySelected = false;
    }
  }

  isFocused() {
    this.sh_msg = true;
  }

  hideStateChange() {
    setTimeout(() => {
      this.showAlert = false;
      if (this.validateState == true && this.truckSearchForReqModel.state.length > 0) {
        if (this.truckSearchForReqModel.countryOfRegistration && this.truckSearchForReqModel.countryOfRegistration.length > 0) {
          let searchResp = this.temparray.find((item) => {

            if (this.truckSearchForReqModel.countryOfRegistration
              && this.truckSearchForReqModel.countryOfRegistration == item.countryName
              && this.truckSearchForReqModel.state && this.truckSearchForReqModel.state.toString().toLowerCase()
              == item.stateName.toString().toLowerCase()) {
              return item.stateName;
            }
          })
          if (!searchResp && this.sh_msg) {
            this.truckSearchForReqModel.state = "";
            if (this.truckSearchForReqModel.state.length < 3 &&
              this.truckSearchForReqModel.state.length > 0) {
              //this.presentAlert("Attention", 'Please enter at least 3 characters.');
              this.presentAlert("Attention", 'State is Invalid.');
            }
            else {
              this.presentAlert("Attention", 'State is Invalid.');
            }
            this.showAlert = true;
          }

          this.showStateField = false;
        } else {
          let searchResp = this.temparray.find((item) => {

            if (this.truckSearchForReqModel.state && this.truckSearchForReqModel.state.toString().toLowerCase()
              == item.stateName.toString().toLowerCase()) {
              return item.stateName;
            }
          })
          if (!searchResp && this.sh_msg) {
            this.truckSearchForReqModel.state = '';
            if (this.truckSearchForReqModel.state.length < 3 &&
              this.truckSearchForReqModel.state.length > 0) {
              this.presentAlert("Attention", 'State is Invalid.');
            }
            else {
              this.presentAlert("Attention", 'State is Invalid.');
            }
            this.showAlert = true;

          }
          else {
            this.statearray.forEach(state => {
              if (state.toString().toLowerCase()
                == this.truckSearchForReqModel.state.toString().toLowerCase()) {
                this.truckSearchForReqModel.state = state.toString()
              }
            })
          }
          this.showStateField = false;
        }
      } else {
        this.validateState = true;
      }
    }, 500);
  }

  clear_country() {
    this.truckSearchForReqModel.countryOfRegistration = "";
    this.showCountryField = false;
  }

  clear_state() {
    this.truckSearchForReqModel.state = "";
    this.showStateField = false;
  }

  getStateNames(ev: any) {
    if(this.truckSearchForReqModel.countryOfRegistration == null ||  this.truckSearchForReqModel.countryOfRegistration == '' )
    {
      return ;
    }
// set val to the value of the searchbar
    let val = ev.target.value;
// if the value is an empty string don't filter the items

    if (val && val.trim() != '') {
      this.statearray = this.temparray.filter((item) => {
        if (this.truckSearchForReqModel.countryOfRegistration
          && this.truckSearchForReqModel.countryOfRegistration != ""
          && this.truckSearchForReqModel.countryOfRegistration == item.countryName) {

          if (item.stateName.toLowerCase().includes(val.toLowerCase())) {
            this.showStateField = true;
          }
          return (item.stateName.toLowerCase().includes(val.toLowerCase()));
        } else if (this.truckSearchForReqModel.countryOfRegistration == "") {
          if (item.stateName.toLowerCase().includes(val.toLowerCase())) {
            this.showStateField = true;
          }
          return (item.stateName.toLowerCase().includes(val.toLowerCase()));
        }
      })

    } else {
// hide the results when the query is empty
      this.showStateField = false;
    }
  }

  selectCountry(item: any) {
    this.validateCountry = false;
    if (!this.truckSearchForReqModel.state || this.truckSearchForReqModel.state == '') {
      this.truckSearchForReqModel.countryOfRegistration = item;
    } else {
      let searchResp = this.temparray.find((element) => {

        if (element.countryName == item
          && this.truckSearchForReqModel.state == element.stateName) {
          this.truckSearchForReqModel.countryOfRegistration = item;
          return (element);
        }
      })
      if (!searchResp && this.truckSearchForReqModel.countryOfRegistration !== "") {
        this.truckSearchForReqModel.countryOfRegistration = "";
        this.presentAlert("Attention", 'Country is Invalid.');
      }
    }
    this.showCountryField = false;
    this.stateDisabledStatus = false;

  }

  selectState(item: any) {
    this.validateState = false;
    this.truckSearchForReqModel.state = item.stateName;
    this.showStateField = false;
  }

  hideCountry() {
    if (this.showCountryField) {
      this.showCountryField = false;
    }
  }

  hideState() {
    if (this.showStateField) {
      this.showStateField = false;
    }
  }

  isStateActive() {
    return this.stateDisabledStatus;
  }

  presentAlert(title: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  keyboardClose() {
    this.keyboard.close();
  }

  licPlateNumOnFocus(event: any) {
    if (this.truckSearchForReqModel.licensePlateNo) {
      setTimeout(() => {
        event.target.target.selectionStart = this.truckSearchForReqModel.licensePlateNo.length;
        event.target.target.selectionEnd = this.truckSearchForReqModel.licensePlateNo.length;
      });
    }
  }
}

