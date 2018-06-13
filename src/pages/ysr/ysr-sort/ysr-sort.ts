import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController,ModalController} from 'ionic-angular';
import {YsrCcvComponent} from "../../../components/ysrmodel/ysr-cvc-modelpage/ysr-ccv";
import {YsrPdfComponent} from "../../../components/ysrmodel/ysr-pdf-modelpage/ysr-pdf";
import {YsrMailComponent} from "../../../components/ysrmodel/ysr-mail-modelpage/ysr-mail";
import {Utils} from "../../../shared/utils";
import {YisrServicesProvider} from "../../../providers/webservices/yisrservices";
import {YisrSearchReqModel} from "../../../shared/model/YISR/yisrsearchreq.model";
import {YisrSearchResult} from "../../../shared/model/YISR/yisrsearch.model";
import {YisrListSO} from "../../../shared/model/YISR/yisrsearch.model";
/**
 * Generated class for the gigosort page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-ysrsort',
  templateUrl: 'ysr-sort.html',
  providers: [Utils,YisrServicesProvider,YisrSearchReqModel,YisrSearchResult,YisrListSO]
})

export class YsrSortPage {
  sortMode: string;
  sort : boolean = false;
  sortselect : any;
  ascend : boolean = false;
  public currentopenDischargeListindex: number = 0;
  selectedTabsIndex=0;
  yisrSearchResultListModal: YisrListSO;
  yisrSearchResult: YisrSearchResult[];
  yisrTempList:any[] = [];
  constructor(public navParams: NavParams,public utils:Utils, public viewCtrl: ViewController,
              public navCtrl: NavController,public yisrServiceProvider: YisrServicesProvider,
              public yisrSearchRequestModel: YisrSearchReqModel,public modalCtrl: ModalController) {
    this.yisrSearchRequestModel=this.navParams.get('searchRequest');
  }

  ionViewWillEnter() {
    this.searchYisr();
  }

  searchYisr()
  {
    this.yisrServiceProvider.yisrSearch(this.yisrSearchRequestModel).subscribe(response => {
      this.yisrSearchResultListModal = <YisrListSO>response;
      this.yisrSearchResult = this.yisrSearchResultListModal.list;
      this.createContainerList();
    });
  }
  createContainerList()
  {
    if(this.yisrSearchResultListModal ==undefined)
    {
      return;
    }
    let currentIndex = 0;
    while(!this.checkListIsNotEmpty(this.yisrSearchResult[currentIndex])) {
      if (this.yisrSearchResult[currentIndex].location != null &&
             this.yisrSearchResult[currentIndex].lineCode != null) {
        let currentContainerList = [];
        let location = this.yisrSearchResult[currentIndex].location;
        let lineCode = this.yisrSearchResult[currentIndex].lineCode;
        let terminalYard = this.yisrSearchResult[currentIndex].terminalYard;
        while (true) {
          currentContainerList.push({
            containerSize: this.yisrSearchResult[currentIndex].containerSize,
            below3: this.yisrSearchResult[currentIndex].below3,
            below7: this.yisrSearchResult[currentIndex].below7,
            below10: this.yisrSearchResult[currentIndex].below10,
            below15: this.yisrSearchResult[currentIndex].below15,
            below30: this.yisrSearchResult[currentIndex].below30,
            above30: this.yisrSearchResult[currentIndex].above30,
            total: this.yisrSearchResult[currentIndex].total,
          });
          if (this.yisrSearchResult[currentIndex].containerSize == "Total") {
            break;
          }
          currentIndex = currentIndex + 1;
        }
        currentIndex = currentIndex + 1;
        this.yisrTempList.push({
          location: location,
          lineCode: lineCode,
          terminalYard: terminalYard,
          list: currentContainerList
        });
      }
    }
    return;
  }
  checkListIsNotEmpty(obj:any){
    if(obj === null|| obj === 'undefined' || obj === undefined)
    {
      return true;
    }
    return obj && obj !== 'null' && obj !== 'undefined' && obj.length === 0;
  }
  // checkContainerDetails(index:any){
  //   if (this.yisrSearchResult[index].location != null &&
  //     this.yisrSearchResult[index].lineCode != null) {
  //     return true;
  //   }
  //   else {
  //     return false;
  //   }
  // }
  openSelecedTab(selectedIndex)
  {
    //(this.detailsArray.dropDownSelected=='true')? detailsArray.dropDownSelected='false':detailsArray.dropDownSelected='true';
    if(this.selectedTabsIndex != selectedIndex)
    {
      this.selectedTabsIndex = selectedIndex;
    }else{
      this.selectedTabsIndex = -1;
    }
  }
  openYisrDetails(selectedIndex) {
    if (this.selectedTabsIndex != selectedIndex) {
      this.selectedTabsIndex = selectedIndex;
    } else {
      this.selectedTabsIndex = -1;
    }
  }
  navigateToMail()
  {
    let profileModal = this.modalCtrl.create(YsrMailComponent, {

    });
    profileModal.present();
  }
  navigateTocsv()
  {
    let profileModal = this.modalCtrl.create(YsrCcvComponent, {

    });
    profileModal.present();
  }
  navigateTopdf()
  {
    let profileModal = this.modalCtrl.create(YsrPdfComponent, {

    });
    profileModal.present();
  }
}
