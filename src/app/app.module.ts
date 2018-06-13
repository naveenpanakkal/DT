import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {Http, HttpModule} from '@angular/http';
import {Mawani} from './app.component';
import {HomePage} from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import {MaintabsPage} from '../pages/maintabs/maintabs';
import {MorePage} from '../pages/more/more';
import {VesselsearchviewPage} from '../pages/vesselsearchview/vesselsearchview';
import {BerthSearchViewPage} from "../pages/berthsearchview/berthsearchview";
import {BerthhistoryPage} from "../pages/berthhistory/berthhistory";
import {VesselsearchdetailsPage} from '../pages/vesselsearchdetails/vesselsearchdetails';
import {ProfilePage} from '../pages/profile/profile';
import {Camera} from '@ionic-native/camera';
import {FileTransfer, FileTransferObject} from '@ionic-native/file-transfer';
import {File} from '@ionic-native/file';
import {FileOpener} from '@ionic-native/file-opener';
import {BerthsearchPage} from "../pages/berthsearch/berthsearch";
import {TrucksearchPage} from '../pages/trucksearch/trucksearch';
import {TruckSearchResultsPage} from '../pages/trucksearchresult/trucksearchresult';
import {TruckdetailsPage} from '../pages/truckdetails/truckdetails';
import {TrucksearchdetailsPage} from '../pages/trucksearchdetails/trucksearchdetails';
import {TruckhistoryPage} from '../pages/truckhistory/truckhistory';
import {ServicesPage} from '../pages/services/services';
import {ExamplePage} from '../pages/example/example';
import {SettingsPage} from '../pages/settings/settings';
import {VesselViewPage} from '../pages/vesselview/vesselview';
import {WorkflowPage} from '../pages/workflow/workflow';
import {WorkflowdetailsPage} from '../pages/workflowdetails/workflowdetails';
import {VesselHistoryPage} from '../pages/vesselhistory/vesselhistory';
import {BerthcomparisonPage} from '../pages/berthcomparison/berthcomparison';
import {Keyboard} from '@ionic-native/keyboard';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {LanguageProvider} from '../providers/language/language';
import {OAuthModule} from 'angular-oauth2-oidc';
import {AuthProvider} from '../providers/auth/auth';
import {FileChooser} from '@ionic-native/file-chooser';
import {Ng2OrderModule} from 'ng2-order-pipe';
import {SortPipe} from '../pipes/sort/sort';
import {VesselFilterPopoverPage} from '../pages/vesselfilterpopover/vesselfilterpopover';
import {VesselSortPopoverPage} from '../pages/vesselsortpopover/vesselsortpopover';
import {IonicStorageModule} from '@ionic/storage';
import {SubmitPage} from '../pages/submit/submit';
import {TruckfilterpopoverPage} from '../pages/truckfilterpopover/truckfilterpopover';
import {TruckSortpopoverPage} from '../pages/trucksortpopover/trucksortpopover';
import {BerthfilterpopoverPage} from '../pages/berthfilterpopover/berthfilterpopover';
import {BerthsortpopoverPage} from '../pages/berthsortpopover/berthsortpopover';
import {RestserviceProvider} from '../providers/restservice/restservice';
import {CommonservicesProvider} from "../providers/webservices/commonservices";
import {TruckservicesProvider} from "../providers/webservices/truckservices";
import {VesselservicesProvider} from "../providers/webservices/vesselservices";
import {BerthServicesProvider} from "../providers/webservices/berthservices";
import {DeliveryorderservicesProvider} from "../providers/webservices/deliveryorderservices";
import {TruckComparisonPage} from "../pages/truckcomparison/truckcomparison";
import {VesselComparisonPage} from "../pages/vesselcomparison/vesselcomparison";
import {ExecuteactionPage} from "../pages/executeaction/executeaction";
import {TruncatePipe} from "../pipes/truncate/truncate";
import {ExamplePageModule} from "../pages/example/example.module";
import {ExecuteactionPageModule} from "../pages/executeaction/executeaction.module";
import {LoginPageModule} from "../pages/login/login.module";
import {MaintabsPageModule} from "../pages/maintabs/maintabs.module";
import {MorePageModule} from "../pages/more/more.module";
import {ProfilePageModule} from "../pages/profile/profile.module";
import {ServicesPageModule} from "../pages/services/services.module";
import {SettingsPageModule} from "../pages/settings/settings.module";
import {SubmitPageModule} from "../pages/submit/submit.module";
import {TruckcomparisonPageModule} from "../pages/truckcomparison/truckcomparison.module";
import {TruckfilterpopoverPageModule} from "../pages/truckfilterpopover/truckfilterpopover.module";
import {TruckhistoryPageModule} from "../pages/truckhistory/truckhistory.module";
import {TrucksearchPageModule} from "../pages/trucksearch/trucksearch.module";
import {TrucksearchdetailsPageModule} from "../pages/trucksearchdetails/trucksearchdetails.module";
import {TrucksearchresultPageModule} from "../pages/trucksearchresult/trucksearchresult.module";
import {TruckdetailsPageModule} from "../pages/truckdetails/truckdetails.module";
import {TrucksortpopoverPageModule} from "../pages/trucksortpopover/trucksortpopover.module";
import {VesselcomparisonPageModule} from "../pages/vesselcomparison/vesselcomparison.module";
import {VesselFilterPopoverPageModule} from "../pages/vesselfilterpopover/vesselfilterpopover.module";
import {HistoryPageModule} from "../pages/vesselhistory/vesselhistory.module";
import {VesselsearchdetailsPageModule} from "../pages/vesselsearchdetails/vesselsearchdetails.module";
import {VesselsearchviewPageModule} from "../pages/vesselsearchview/vesselsearchview.module";
import {BerthSearchViewPageModule} from "../pages/berthsearchview/berthsearchview.module";
import {FilterpopoverPageModule} from "../pages/vesselsortpopover/vesselsortpopover.module";
import {VesselViewPageModule} from "../pages/vesselview/vesselview.module";
import {WorkflowPageModule} from "../pages/workflow/workflow.module";
import {WorkflowdetailsPageModule} from "../pages/workflowdetails/workflowdetails.module";
import {DatePipe} from '@angular/common';
import {FiletransferProvider} from '../providers/filetransfer/filetransfer';
import {FilePath} from "@ionic-native/file-path";
import {BerthsearchsummaryPageModule} from "../pages/berthsearchsummary/berthsearchsummary.module";
import {BerthhistoryPageModule} from "../pages/berthhistory/berthhistory.module";
import {BerthfilterpopoverPageModule} from "../pages/berthfilterpopover/berthfilterpopover.module";
import {BerthsortpopoverPageModule} from "../pages/berthsortpopover/berthsortpopover.module";
import {BerthcomparisonPageModule} from '../pages/berthcomparison/berthcomparison.module';
import {BerthsearchPageModule} from '../pages/berthsearch/berthsearch.module';
import {DosearchresultPageModule} from "../pages/dosearchresult/dosearchresult.module";
import {DosearchresultPage} from "../pages/dosearchresult/dosearchresult";
import {DosearchPage} from "../pages/dosearch/dosearch";
import {DosearchPageModule} from "../pages/dosearch/dosearch.module";
import {DosearchsummaryPage} from "../pages/dosearchsummary/dosearchsummary";
import {DosearchdetailviewPage} from "../pages/dosearchdetailview/dosearchdetailview";
import {DosearchsummaryPageModule} from "../pages/dosearchsummary/dosearchsummary.module";
import {DosearchdetailviewPageModule} from "../pages/dosearchdetailview/dosearchdetailview.module";
import {BerthsearchsummaryPage} from "../pages/berthsearchsummary/berthsearchsummary";
import {BerthsearchdetailviewPage} from "../pages/berthsearchdetailview/berthsearchdetailview";
import {BerthsearchdetailviewPageModule} from "../pages/berthsearchdetailview/berthsearchdetailview.module";
import {VoyagesearchresultPageModule} from "../pages/voyagesearchresult/voyagesearchresult.module";
import {VoyagesearchdetailsPageModule} from "../pages/voyagesearchdetails/voyagesearchdetails.module";
import {VoyagesortpopoverPageModule} from "../pages/voyagesortpopover/voyagesortpopover.module";
import {VoyagefilterpopoverPageModule} from "../pages/voyagefilterpopover/voyagefilterpopover.module";
import {VoyagedetailsPageModule} from "../pages/voyagedetails/voyagedetails.module";
import {VoyagesearchresultPage} from "../pages/voyagesearchresult/voyagesearchresult";
import {VoyagesearchdetailsPage} from "../pages/voyagesearchdetails/voyagesearchdetails";
import {VoyagesortpopoverPage} from "../pages/voyagesortpopover/voyagesortpopover";
import {VoyagedetailsPage} from "../pages/voyagedetails/voyagedetails";
import {VoyagefilterpopoverPage} from "../pages/voyagefilterpopover/voyagefilterpopover";
import {DefinedSetValue} from "../shared/model/voyage/voyageenquiryinitdefineditem.model";
import {DefinedSetRequest} from "../shared/model/voyage/voyageenquiryinitdefinedsetrequest.model";
import {DocreatePageModule} from "../pages/docreate/docreate.module";
import {DocreatePage} from "../pages/docreate/docreate";
import {DohistoryPageModule} from "../pages/dohistory/dohistory.module";
import {DohistoryPage} from "../pages/dohistory/dohistory";
import {DosortModule} from "../pages/dosort/dosort.module";
import {DosortPage} from "../pages/dosort/dosort";
import {InformationmodalComponentModule} from "../components/informationmodal/informationmodal.module";
import {InformationmodalComponent} from "../components/informationmodal/informationmodal";

import {CacreatePageModule} from "../pages/cacreate/cacreate.module";
import {CasearchsummayModule} from "../pages/casearchsummay/casearchsummay.module";
import {CasearchdetailviewPageModule} from "../pages/casearchdetailview/casearchdetailview.module";
import {CasearchresultPageModule} from "../pages/casearchresult/casearchresult.module";
import {CasearchPageModule} from "../pages/casearch/casearch.module";
import {CacreatePage} from "../pages/cacreate/cacreate";
import {Casearchsummay} from "../pages/casearchsummay/casearchsummay";
import {CasearchPage} from "../pages/casearch/casearch";
import {CasearchdetailviewPage} from "../pages/casearchdetailview/casearchdetailview";
import {CasearchresultPage} from "../pages/casearchresult/casearchresult";
import {ContaineracceptanceProvider} from "../providers/webservices/containeracceptanceservices";
import {Network} from "@ionic-native/network";
import {CAIMGDModelComponent} from "../components/camodelpages/caimdgmodelpage/caimdgmodel";
import {CAIMGDModelComponentModule} from "../components/camodelpages/caimdgmodelpage/caimdgmodel.module";
import {CAReeferModelComponent} from "../components/camodelpages/careefermodelpage/careefermodel";
import {CAReeferModelComponentModule} from "../components/camodelpages/careefermodelpage/careefermodel.module";
import {CADamageModelComponentModule} from "../components/camodelpages/cadamagemodalpage/cadamagemodel.module";
import {CADamageModelComponent} from "../components/camodelpages/cadamagemodalpage/cadamagemodel";

import {CAOOGModelComponentModule} from "../components/camodelpages/caoogmodelpage/caoogmodel.module";
import {CAOOGModelComponent} from "../components/camodelpages/caoogmodelpage/caoogmodel";

import {CahistoryPage} from "../pages/cahistory/cahistory";
import {CahistoryPageModule} from "../pages/cahistory/cahistory.module";

import {VesselloaddischargesummaryfilterModule} from "../pages/vesselloaddischargesummaryfilter/vesselloaddischargesummaryfilter.module";
import {VesselloaddischargesummarysearchresultPageModule} from "../pages/vesselloaddischargesummarysearchresult/vesselloaddischargesummarysearchresult.module";
import {VesselloaddischargesummarydetailsPageModule} from "../pages/vesselloaddischargesummarydetails/vesselloaddischargesummarydetails.module";
import {VesselloaddischargesummaryfilterPage} from "../pages/vesselloaddischargesummaryfilter/vesselloaddischargesummaryfilter";
import {VesselloaddischargesummarysearchresultPage} from "../pages/vesselloaddischargesummarysearchresult/vesselloaddischargesummarysearchresult";
import {VesselloaddischargesummarydetailsPage} from "../pages/vesselloaddischargesummarydetails/vesselloaddischargesummarydetails";

import {LoadDischargeMailPage} from "../components/loaddischargemodal/loaddischargemail/loaddischargemail";
import {LoaddischargemailPageModule} from "../components/loaddischargemodal/loaddischargemail/loaddischargemail.module";
import {LoaddischargesortComponent} from '../components/loaddischargesort/loaddischargesort';
import {LoaddischargesortComponentModule} from '../components/loaddischargesort/loaddischargesort.module';
import {LoaddischargeDownloadPageModule} from "../components/loaddischargemodal/loaddischargedownload/loaddischargedownload.module";
import {LoadDischargeDownloadPage} from "../components/loaddischargemodal/loaddischargedownload/loaddischargedownload";
import {VesselloaddischargesummarysortPage} from "../pages/vesselloaddischargesummarysort/vesselloaddischargesummarysort";
import {ShipServSchedSearchResultViewPage} from "../pages/shipservschedsearchresultview/shipservschedsearchresultview";
import {VesselloaddischargesummarySortPageModule} from "../pages/vesselloaddischargesummarysort/vesselloaddischargesummarysort.module";
import {ShipServSchedSearchResultViewPageModule} from "../pages/shipservschedsearchresultview/shipservschedsearchresultview.module";
import {ShipServSchedSearchFilterPage} from "../pages/shipservschedsearchfilter/shipservschedsearchfilter";
import {ShipServSchedSearchFilterPageModule} from "../pages/shipservschedsearchfilter/shipservschedsearchfilter.module";
import {ShipServSchedSummaryViewPageModule} from "../pages/shipservschedsummaryview/shipservschedsummaryview.module";
import {ShipServSchedSummaryViewPage} from "../pages/shipservschedsummaryview/shipservschedsummaryview";
import {SSSServiceProvider} from "../providers/webservices/sssservices";
import {ShipServSchedDetailViewPage} from "../pages/shipservscheddetailview/shipservscheddetailview";
import {ShipServSchedDetailViewPageModule} from "../pages/shipservscheddetailview/shipservscheddetailview.module";
import {ShipServSchedSearchSortPage} from "../pages/shipservschedsearchsort/shipservschedsearchsort";
import {ShipServSchedSearchSortPageModule} from "../pages/shipservschedsearchsort/shipservschedsearchsort.module";
import {ShipServSchedHistoryViewPage} from "../pages/shipservschedhistoryview/shipservschedhistoryview";
import {ShipServSchedHistoryViewPageModule} from "../pages/shipservschedhistoryview/shipservschedhistoryview.module";

import {CSHResultsPageModule} from "../pages/cshresults/cshresults.module";
import {CSHResultsPage} from "../pages/cshresults/cshresults";

import {CasortPageModule} from "../pages/casort/casort.module";
import {CasortPage} from "../pages/casort/casort";
import {CshServiceProvider} from "../providers/webservices/cshservice";
import {CshsortPage} from "../pages/cshsort/cshsort";
import {CshsortPageModule} from "../pages/cshsort/cshsort.module";

import {CSHdetailsPageModule} from "../pages/cshdetailsview/cshdetailsview.module";
import {CSHDetailsPage} from "../pages/cshdetailsview/cshdetailsview";
import {CSHCreateEditPageModule} from "../pages/cshdetailscreateandedit/cshdetailscreateandedit.module";
import {CSHCreateEditPage} from "../pages/cshdetailscreateandedit/cshdetailscreateandedit";
import {CshSummaryPage} from "../pages/csh-summary/csh-summary";
import {CshSummaryPageModule} from "../pages/csh-summary/csh-summary.module";
import {CshfilterPage} from "../pages/cshfilter/cshfilter";
import {CshfilterPageModule} from "../pages/cshfilter/cshfilter.module";
import {CshHistoryPageModule} from "../pages/cshhistory/cshhistory.module";
import {CshHistoryPage} from "../pages/cshhistory/cshhistory";
import {CshCmpModelComponent} from '../components/cshModelPages/csh-cmp-model/csh-cmp-model';
import {CshCmpModelComponentModule} from "../components/cshModelPages/csh-cmp-model/csh-cmp-model.module";
import {TasearchresultPageModule} from "../pages/tasearchresult/tasearchresult.module";
import {TasearchresultPage} from "../pages/tasearchresult/tasearchresult";
import {TasortPage} from "../pages/tasort/tasort";
import {TruckappointmentserviceProvider} from "../providers/webservices/truckappointmentservices";
import {TasortPageModule} from "../pages/tasort/tasort.module";
import {TafilterPageModule} from "../pages/tafilter/tafilter.module";
import {TafilterPage} from "../pages/tafilter/tafilter";

import {TasummaryPage} from "../pages/tasummary/tasummary";
import {TasummaryPageModule} from "../pages/tasummary/tasummary.module";
import {TaeditPageModule} from "../pages/taedit/taedit.module";
import {TaeditPage} from "../pages/taedit/taedit";
import {TaviewPage} from "../pages/taview/taview";
import {TaviewPageModule} from "../pages/taview/taview.module";
import {TacreatePage} from "../pages/tacreate/tacreate";
import {TacreatePageModule} from "../pages/tacreate/tacreate.module";
import {TahistoryPageModule} from "../pages/tahistory/tahistory.module";
import {TahistoryPage} from "../pages/tahistory/tahistory";
import {TaAddQuantityComponent} from "../components/tamodelpages/ta-add-quantity/ta-add-quantity";
import {TaAddQuantityComponentModule} from "../components/tamodelpages/ta-add-quantity/ta-add-quantity.module";
import {TaAddContainerComponent} from "../components/tamodelpages/ta-add-container/ta-add-container";
import {TaAddContainerComponentModule} from "../components/tamodelpages/ta-add-container/ta-add-container.module";
import {TaadditionaldetailComponentModule} from "../components/tamodelpages/taadditionaldetail/taadditionaldetail.module";
import {TaadditionaldetailComponent} from "../components/tamodelpages/taadditionaldetail/taadditionaldetail";
import {RBsearchresultPage} from "../pages/rbsearchresult/rbsearchresult";
import {RBsortPage} from "../pages/rbsort/rbsort";
import {RBfilterPage} from "../pages/rbfilter/rbfilter";
import {RBsummaryPage} from "../pages/rbsummary/rbsummary";
import {RBeditPage} from "../pages/rbedit/rbedit";
import {RBviewPage} from "../pages/rbview/rbview";
import {RBcreatePage} from "../pages/rbcreate/rbcreate";
import {RBsearchresultPageModule} from "../pages/rbsearchresult/rbsearchresult.module";
import {RBsortPageModule} from "../pages/rbsort/rbsort.module";
import {RBfilterPageModule} from "../pages/rbfilter/rbfilter.module";
import {RBsummaryPageModule} from "../pages/rbsummary/rbsummary.module";
import {RBeditPageModule} from "../pages/rbedit/rbedit.module";
import {RBviewPageModule} from "../pages/rbview/rbview.module";
import {RBcreatePageModule} from "../pages/rbcreate/rbcreate.module";
import {RBhistoryPageModule} from "../pages/rbhistory/rbhistory.module";
import {RBhistoryPage} from "../pages/rbhistory/rbhistory";
import {RbAddContainerComponent} from "../components/rbmodelpage/rb-add-container/rb-add-container";
import {RbAddContainerComponentModule} from "../components/rbmodelpage/rb-add-container/rb-add-container.module";
import {RBCancelContainerComponent} from "../components/rbmodelpage/rb-cancel-container/rb-cancel-container";
import {RbCancelContainerComponentModule} from "../components/rbmodelpage/rb-cancel-container/rb-cancel-container.module";
import {RBSearchModelComponent} from "../components/rbsearchmodel/rbsearchmodel";
import {RBSearchModelComponentModule} from "../components/rbsearchmodel/rbsearchmodel.module";
import {TaConfirmationPageModule} from "../pages/taconfirmation/taconfirmation.module";
import {TaConfirmationPage} from "../pages/taconfirmation/taconfirmation";
import {GiGoFilterModule} from "../pages/gigo/gigofilter/gigofilter.module";
import {GiGoFilter} from "../pages/gigo/gigofilter/gigofilter";
import {GiGosortPageModule} from "../pages/gigo/gigosort/gigosort.module";
import {GiGosortPage} from "../pages/gigo/gigosort/gigosort";
import {GiGoSearchResultPageModule} from "../pages/gigo/gigosearchresult/gigosearchresult.module";
import {GiGoSearchResultPage} from "../pages/gigo/gigosearchresult/gigosearchresult";
import {GiGoDetailsPage} from "../pages/gigo/gigodetails/gigodetails";
import {GiGoDetailsPageModule} from "../pages/gigo/gigodetails/gigodetails.module";
import {GiGosummaryPageModule} from "../pages/gigo/gigosummary/gigosummary.module";
import {GiGosummaryPage} from "../pages/gigo/gigosummary/gigosummary";
import {GiGoCreatePageModule} from "../pages/gigo/gigocreate/gigocreate.module";
import {GiGoCreatePage} from "../pages/gigo/gigocreate/gigocreate";
import {RBChargesComponent} from "../components/rbmodelpage/rb-charges/rb-charges";
import {RbChargesComponentModule} from "../components/rbmodelpage/rb-charges/rb-charges.module";
import {RCHsortPageModule} from "../pages/rch/rchsort/rchsort.module";
import {RCHsortPage} from "../pages/rch/rchsort/rchsort";
import {RCHFilterModule} from "../pages/rch/rchfilter/rchfilter.module";
import {RCHFilter} from "../pages/rch/rchfilter/rchfilter";
import {RCHsearchresultPageModule} from "../pages/rch/rchsearchresult/rchsearchresult.module";
import {RCHsearchresultPage} from "../pages/rch/rchsearchresult/rchsearchresult";
import {HoldContainerFilterModule} from "../pages/holdcontainer/holdcontainerfilter/holdcontainerfilter.module";
import {HoldContainerFilter} from "../pages/holdcontainer/holdcontainerfilter/holdcontainerfilter";
import {HoldContainerSearchresultPage} from "../pages/holdcontainer/holdcontainersearchresult/holdcontainersearchresult";
import {HoldContainerSearchresultPageModule} from "../pages/holdcontainer/holdcontainersearchresult/holdcontainersearchresult.module";

import {GiGoServiceProvider} from "../providers/webservices/gigoservice";
import {DamageDetailsComponent} from "../components/gigomodelpage/damage-details/damagedetails";
import {DamageDetailsComponentModule} from "../components/gigomodelpage/damage-details/damagedetails.module";
import {SealDetailsComponent} from "../components/gigomodelpage/seal-details/seal-details";
import {SealDetailsComponentModule} from "../components/gigomodelpage/seal-details/seal-details.module";
import {HoldContainerSortPage} from "../pages/holdcontainer/holdcontainersort/holdcontainersort";
import {HoldContainerSearchSortPageModule} from "../pages/holdcontainer/holdcontainersort/holdcontainersort.module";
import {HoldContainerEditandView} from "../pages/holdcontainer/holdcontainerEditandView/holdcontainerEditandView";
import {HoldContainerEditandViewPageModule} from "../pages/holdcontainer/holdcontainerEditandView/holdcontainerEditandView.module";

import {HoldContainerSummaryPage} from "../pages/holdcontainer/holdcontainersummery/holdcontainersummary";
import {HoldContainerSummaryPageModule} from "../pages/holdcontainer/holdcontainersummery/holdcontainersummary.module";
import {HrcservicesProvider} from "../providers/webservices/hrcservices";
import {HChistoryPage} from "../pages/holdcontainer/holdcontainerhistory/holdcontainerhistory";
import {HChistoryPageModule} from "../pages/holdcontainer/holdcontainerhistory/holdcontainerhistory.module";
import {DamageDetailsViewContainerComponentModule,} from "../components/gigomodelpage/damage-details-view/damagedetailsview.module";
import {DamageDetailsViewContainerComponent} from "../components/gigomodelpage/damage-details-view/damagedetailsview";
import {SealDetailsViewContainerComponent} from "../components/gigomodelpage/seal-view-details/sealdetailsview";
import {SealDetailsViewContainerComponentModule} from "../components/gigomodelpage/seal-view-details/sealdetailsview.module";
import {RCHsummaryPageModule} from "../pages/rch/rchsummary/rchsummary.module";
import {RCHsummaryPage} from "../pages/rch/rchsummary/rchsummary";
import {RCHviewPage} from "../pages/rch/rchview/rchview";
import {RCHviewPageModule} from "../pages/rch/rchview/rchview.module";
import {RCHReleaseviewPageModule} from "../pages/rch/rchrelease/rchrelease.module";
import {RCHReleaseviewPage} from "../pages/rch/rchrelease/rchrelease";

import {GIGOCancelContainerComponent} from "../components/gigomodelpage/gigo-cancel-container/gigo-cancel-container";
import {GigoCancelContainerComponentModule} from "../components/gigomodelpage/gigo-cancel-container/gigo-cancel-container.module";
import {GigoCreateSummary} from "../pages/gigo/gigocreatesummary/gigocreatesummary";
import {GigoCreateSummaryModule} from "../pages/gigo/gigocreatesummary/gigocreatesummary.module";
import {GigoHistoryPage} from "../pages/gigo/gigohistory/gigohistory";
import {GigoHistoryPageModule} from "../pages/gigo/gigohistory/gigohistory.module";
import {HoldContainerCreatePage} from "../pages/holdcontainer/holdcontainercreate/holdcontainercreate";
import {HoldContainerCreatePageModule} from "../pages/holdcontainer/holdcontainercreate/holdcontainercreate.module";
import {HoldContainerConfirmation} from "../pages/holdcontainer/holdcontainerconfirmation/holdcontainerconfirmation";
import {HoldContainerConfirmationModule} from "../pages/holdcontainer/holdcontainerconfirmation/holdcontainerconfirmation.module";
import {RchConfirmationModule} from "../pages/rch/rchconfirmation/rchconfirmation.module";
import {RchConfirmation} from "../pages/rch/rchconfirmation/rchconfirmation";
import {SsrCreatePage} from "../pages/ssr/ssr-create/ssrcreate";
import {SsrCreatePageModule} from "../pages/ssr/ssr-create/ssrcreate.module";
import {SsrConfirmationModule} from "../pages/ssr/ssr-confirmation/ssrconfirmation.module";
import {SsrConfirmation} from "../pages/ssr/ssr-confirmation/ssrconfirmation";
import {SsrFilter} from "../pages/ssr/ssr-filter/ssrfilter";
import {SsrFilterModule} from "../pages/ssr/ssr-filter/ssrfilter.module";
import {SsrHistoryPageModule} from "../pages/ssr/ssr-history/ssrhistory.module";
import {SsrHistoryPage} from "../pages/ssr/ssr-history/ssrhistory";
import {SsrsortPage} from "../pages/ssr/ssr-sort/ssrsort";
import {SsrsortPageModule} from "../pages/ssr/ssr-sort/ssrsort.module";
import {SsrsummaryPageModule} from "../pages/ssr/ssr-summary/ssrsummary.module";
import {SsrSearchResultPageModule} from "../pages/ssr/ssr-searchresult/ssrsearchresult.module";
import {SsrSearchResultPage} from "../pages/ssr/ssr-searchresult/ssrsearchresult";
import {SsrEditPage} from "../pages/ssr/ssr-edit/ssredit";
import {SsrEditPageModule} from "../pages/ssr/ssr-edit/ssredit.module";
import {SsrsummaryPage} from "../pages/ssr/ssr-summary/ssrsummary";
import {SsrCancelContainerComponentModule} from "../components/ssrmodelpage/ssr-cancel-container/ssr-cancel-container.module";
import {SsrCancelContainerComponent} from "../components/ssrmodelpage/ssr-cancel-container/ssr-cancel-container";
import {SsrViewPage} from "../pages/ssr/ssr-view/ssrview";
import {SsrViewPageModule} from "../pages/ssr/ssr-view/ssrview.module";
import {SsrServiceProvider} from "../providers/webservices/ssrservices";
import {ShipServiceComparisonPage} from "../pages/shipservschedcomparison/shipservschedcomparison";
import {ShipServiceComparisonPageModule} from "../pages/shipservschedcomparison/shipservschedcomparison.module";
import {GenericAddContainerComponentModule} from "../components/addContainerGenericModel/generic-add-container.module";
import {GenericAddContainerComponent} from "../components/addContainerGenericModel/generic-add-container";
import {YsrFilterPage} from "../pages/ysr/ysr-filter/ysr-filter";
import {YsrFilterPageModule} from "../pages/ysr/ysr-filter/ysr-filter.module";
import {YsrSortPage} from "../pages/ysr/ysr-sort/ysr-sort";
import {YsrSortPageModule} from "../pages/ysr/ysr-sort/ysr-sort.module";
import {YsrPdfComponentModule} from "../components/ysrmodel/ysr-pdf-modelpage/ysr-pdf.module";
import {YsrPdfComponent} from "../components/ysrmodel/ysr-pdf-modelpage/ysr-pdf";
import {YsrMailComponentModule} from "../components/ysrmodel/ysr-mail-modelpage/ysr-mail.module";
import {YsrMailComponent} from "../components/ysrmodel/ysr-mail-modelpage/ysr-mail";
import {YsrCcvComponent} from "../components/ysrmodel/ysr-cvc-modelpage/ysr-ccv";
import {YsrCcvComponentModule} from "../components/ysrmodel/ysr-cvc-modelpage/ysr-ccv.module";
import {Utils} from "../shared/utils";
import {DtEventsModule} from "../directives/dt-events/dt-events.module";
import {SsrApproverComponent} from "../components/ssrmodelpage/ssr-approver-details/ssr-approver";
import {SsrApproverComponentModule} from "../components/ssrmodelpage/ssr-approver-details/ssr-approver.module";
import {SsrCostComponentModule} from "../components/ssrmodelpage/ssr-cost-container/ssr-cost.module";
import {SsrCostComponent} from "../components/ssrmodelpage/ssr-cost-container/ssr-cost";
import {GigoEmailContainerComponentModule} from "../components/gigomodelpage/gigo-email-container/gigo-email-container.module";
import {GigoEmailContainerComponent} from "../components/gigomodelpage/gigo-email-container/gigo-email-container";
import {NotificationSelectedItemDetailsPageModule} from "../pages/profile/notificationSelectedItemDetails/notificationSelectedItemDetails.module";
import {NotificationSelectedItemDetailsPage} from "../pages/profile/notificationSelectedItemDetails/notificationSelectedItemDetails";
import {NotificationFilterPage} from "../pages/profile/notificationfilter/notificationfilter";
import {NotificationFilterPageModule} from "../pages/profile/notificationfilter/notificationfilter.module";
import {NotificationsortPageModule} from "../pages/profile/notificationsort/notificationssort.module";
import {NotificationsortPage} from "../pages/profile/notificationsort/notificationssort";

import {SsrAddContainerModel} from "../components/ssrmodelpage/ssr-add-container-model/ssr-add-container-model";
import {SsrAddContainerModelModule} from "../components/ssrmodelpage/ssr-add-container-model/ssr-add-container-model.module";
import {SsrSelectRotationModelModule} from "../components/ssrmodelpage/ssr-select-rotation-model/select-rotation-model.module";
import {SsrSelectRotationModel} from "../components/ssrmodelpage/ssr-select-rotation-model/select-rotation-model";


export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    Mawani,
    HomePage,
    SortPipe,
    TruncatePipe
  ],

  imports: [
    DtEventsModule,
    ExamplePageModule,
    ExecuteactionPageModule,
    LoginPageModule,
    MaintabsPageModule,
    MorePageModule,
    ProfilePageModule,
    NotificationSelectedItemDetailsPageModule,
    NotificationFilterPageModule,
    NotificationsortPageModule,
    ServicesPageModule,
    SettingsPageModule,
    SubmitPageModule,
    TruckcomparisonPageModule,
    TrucksearchresultPageModule,
    TruckfilterpopoverPageModule,
    TruckhistoryPageModule,
    TrucksearchPageModule,
    TrucksearchdetailsPageModule,
    TruckdetailsPageModule,
    TrucksortpopoverPageModule,
    VesselcomparisonPageModule,
    VesselFilterPopoverPageModule,
    HistoryPageModule,
    VesselsearchdetailsPageModule,
    VesselsearchviewPageModule,
    FilterpopoverPageModule,
    VesselViewPageModule,
    WorkflowPageModule,
    WorkflowdetailsPageModule,

    DosearchresultPageModule,
    DosearchPageModule,
    DosearchsummaryPageModule,
    DosearchdetailviewPageModule,
    DocreatePageModule,
    DosortModule,
    DohistoryPageModule,

    BerthSearchViewPageModule,
    BerthsearchsummaryPageModule,
    BerthsearchdetailviewPageModule,
    BerthhistoryPageModule,
    BerthfilterpopoverPageModule,
    BerthsortpopoverPageModule,
    BerthcomparisonPageModule,
    BerthsearchPageModule,

    VoyagesearchresultPageModule,
    VoyagesearchdetailsPageModule,
    VoyagesortpopoverPageModule,
    VoyagefilterpopoverPageModule,
    VoyagedetailsPageModule,

    CacreatePageModule,
    CasearchPageModule,
    CasearchresultPageModule,
    CasearchsummayModule,
    CasearchdetailviewPageModule,
    CahistoryPageModule,
    LoaddischargemailPageModule,
    LoaddischargeDownloadPageModule,
    InformationmodalComponentModule,
    // InformationWithHeaderModalComponentModule,
    CAIMGDModelComponentModule,
    CAReeferModelComponentModule,
    CADamageModelComponentModule,
    CAOOGModelComponentModule,
    CasortPageModule,

    TasearchresultPageModule,
    TasortPageModule,
    TafilterPageModule,
    TasummaryPageModule,
    TaeditPageModule,
    TaviewPageModule,
    TacreatePageModule,
    TahistoryPageModule,
    TaAddQuantityComponentModule,
    TaAddContainerComponentModule,
    TaadditionaldetailComponentModule,
    TaConfirmationPageModule,

    RBsearchresultPageModule,
    RBsortPageModule,
    RBfilterPageModule,
    RBsummaryPageModule,
    RBeditPageModule,
    RBviewPageModule,
    RBcreatePageModule,
    RBhistoryPageModule,
    RbChargesComponentModule,

    VesselloaddischargesummaryfilterModule,
    VesselloaddischargesummarysearchresultPageModule,
    VesselloaddischargesummarydetailsPageModule,
    LoaddischargesortComponentModule,
    VesselloaddischargesummarySortPageModule,

    ShipServSchedSearchResultViewPageModule,
    ShipServSchedSearchFilterPageModule,
    ShipServSchedSummaryViewPageModule,
    ShipServSchedDetailViewPageModule,
    ShipServSchedSearchSortPageModule,
    ShipServSchedHistoryViewPageModule,
    ShipServiceComparisonPageModule,
    HChistoryPageModule,

    CSHCreateEditPageModule,
    CSHResultsPageModule,
    CshsortPageModule,
    CSHdetailsPageModule,
    CshSummaryPageModule,
    CshfilterPageModule,
    CshHistoryPageModule,
    CshCmpModelComponentModule,

    GiGoFilterModule,
    GiGosortPageModule,
    GiGoSearchResultPageModule,
    GiGoDetailsPageModule,
    GiGosummaryPageModule,
    GiGoCreatePageModule,
    GigoCancelContainerComponentModule,
    GigoEmailContainerComponentModule,
    DamageDetailsComponentModule,
    SealDetailsViewContainerComponentModule,
    HoldContainerSummaryPageModule,
    DamageDetailsViewContainerComponentModule,
    GigoHistoryPageModule,
    GigoCreateSummaryModule,

    RCHsortPageModule,
    RCHFilterModule,
    RCHsearchresultPageModule,
    RCHsummaryPageModule,
    RCHviewPageModule,
    RCHReleaseviewPageModule,
    RchConfirmationModule,

    HoldContainerFilterModule,
    HoldContainerSearchresultPageModule,
    HoldContainerSearchSortPageModule,
    HoldContainerEditandViewPageModule,
    HoldContainerCreatePageModule,
    HoldContainerConfirmationModule,
    SealDetailsComponentModule,

    SsrApproverComponentModule,
    SsrCostComponentModule,
    SsrCreatePageModule,
    SsrConfirmationModule,
    SsrViewPageModule,
    SsrFilterModule,
    SsrHistoryPageModule,
    SsrsortPageModule,
    SsrsummaryPageModule,
    SsrSearchResultPageModule,
    SsrEditPageModule,
    SsrCancelContainerComponentModule,
    SsrAddContainerModelModule,
    SsrSelectRotationModelModule,
    YsrFilterPageModule,
    YsrSortPageModule,
    YsrPdfComponentModule,
    YsrMailComponentModule,
    YsrCcvComponentModule,

    GenericAddContainerComponentModule,

    BrowserModule,
    HttpModule,
    Ng2OrderModule,
    RbAddContainerComponentModule,
    RbCancelContainerComponentModule,
    RBSearchModelComponentModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(Mawani, {
      // mode:'md',
      // pageTransition: 'md-transition',
      // pageTransitionDelay:100,
      // platforms: {
      //   ios: {
      //     pageTransition: 'ios-transition',
      //     backButtonIcon:"ios-arrow-back",
      //     iconMode:"ios",
      //     pageTransitionDelay:16,
      //     menuType:"reveal",
      //     alertEnter:"alert-pop-in",
      //     alertLeave:"alert-pop-out",
      //     activator:"highlight",
      //     actionSheetEnter:"action-sheet-slide-in",
      //     actionSheetLeave:"action-sheet-slide-out"
      //   }
      // },
      // tabsHighlight:false,
      // modalEnter: 'modal-slide-in',
      // modalLeave: 'modal-slide-out',
      scrollAssist: true,
      autoFocusAssist: false,
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
    OAuthModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Mawani,
    HomePage,
    LoginPage,
    MaintabsPage,
    MorePage,
    VesselsearchviewPage,
    VesselsearchdetailsPage,
    ProfilePage,
    NotificationSelectedItemDetailsPage,
    NotificationFilterPage,
    NotificationsortPage,
    TruckSearchResultsPage,
    TrucksearchPage,
    TruckdetailsPage,
    TrucksearchdetailsPage,
    TruckhistoryPage,
    TruckComparisonPage,
    ServicesPage,
    ExamplePage,
    SettingsPage,
    VesselFilterPopoverPage,
    VesselSortPopoverPage,
    VesselComparisonPage,
    ExecuteactionPage,
    SubmitPage,
    VesselViewPage,
    TruckfilterpopoverPage,
    TruckSortpopoverPage,
    WorkflowPage,
    WorkflowdetailsPage,
    VesselHistoryPage,
    BerthSearchViewPage,
    DosearchresultPage,
    DosearchPage,
    DosearchdetailviewPage,
    DocreatePage,
    DosearchsummaryPage,
    DosortPage,
    DohistoryPage,
    BerthsearchsummaryPage,
    BerthsearchdetailviewPage,
    BerthhistoryPage,
    VoyagesearchresultPage,
    VoyagesearchdetailsPage,
    VoyagesortpopoverPage,
    VoyagefilterpopoverPage,
    VoyagedetailsPage,
    BerthfilterpopoverPage,
    BerthsortpopoverPage,
    BerthcomparisonPage,
    BerthsearchPage,
    InformationmodalComponent,
    CAIMGDModelComponent,
    CAReeferModelComponent,
    CADamageModelComponent,
    CAOOGModelComponent,
    CacreatePage,
    CasearchPage,
    CasearchresultPage,
    Casearchsummay,
    CasearchdetailviewPage,
    CahistoryPage,
    CasortPage,
    HoldContainerConfirmation,

    TasearchresultPage,
    TasortPage,
    TafilterPage,
    TasummaryPage,
    TaeditPage,
    TaviewPage,
    TacreatePage,
    TahistoryPage,
    TaAddQuantityComponent,
    TaAddContainerComponent,
    TaadditionaldetailComponent,
    TaConfirmationPage,
    GigoHistoryPage,
    GigoCreateSummary,

    RBsearchresultPage,
    RBsortPage,
    RBfilterPage,
    RBsummaryPage,

    RBeditPage,
    RBviewPage,
    RBcreatePage,
    RBhistoryPage,
    RBChargesComponent,
    RchConfirmation,
    SsrsummaryPage,

    VesselloaddischargesummaryfilterPage,
    VesselloaddischargesummarysearchresultPage,
    VesselloaddischargesummarydetailsPage,
    LoaddischargesortComponent,
    LoadDischargeMailPage,
    LoadDischargeDownloadPage,
    VesselloaddischargesummarysortPage,

    GiGoFilter,
    GiGosortPage,
    GiGoSearchResultPage,
    GiGoDetailsPage,
    GiGosummaryPage,
    GiGoCreatePage,
    GIGOCancelContainerComponent,
    GigoEmailContainerComponent,
    DamageDetailsComponent,
    DamageDetailsViewContainerComponent,
    SealDetailsViewContainerComponent,
    SealDetailsComponent,
    HoldContainerSummaryPage,
    HChistoryPage,

    RCHsortPage,
    RCHFilter,
    RCHsearchresultPage,
    RCHsummaryPage,
    RCHviewPage,
    RCHReleaseviewPage,

    HoldContainerFilter,
    HoldContainerSearchresultPage,
    HoldContainerSortPage,
    HoldContainerEditandView,
    HoldContainerCreatePage,

    ShipServSchedSearchResultViewPage,
    ShipServSchedSearchFilterPage,
    ShipServSchedSummaryViewPage,
    ShipServSchedDetailViewPage,
    ShipServSchedSearchSortPage,
    ShipServSchedHistoryViewPage,
    ShipServSchedSearchSortPage,
    ShipServiceComparisonPage,
    CshsortPage,
    CSHResultsPage,
    CSHDetailsPage,
    CSHCreateEditPage,
    CshSummaryPage,
    CshHistoryPage,
    CshfilterPage,
    CshCmpModelComponent,
    RbAddContainerComponent,
    RBCancelContainerComponent,
    RBSearchModelComponent,

    SsrConfirmation,
    SsrViewPage,
    SsrFilter,
    SsrHistoryPage,
    SsrsortPage,
    SsrSearchResultPage,
    SsrEditPage,
    SsrCancelContainerComponent,
    SsrCreatePage,
    SsrApproverComponent,
    SsrCostComponent,
    SsrSelectRotationModel,
    SsrAddContainerModel,
    YsrFilterPage,
    YsrSortPage,
    YsrPdfComponent,
    YsrMailComponent,
    YsrCcvComponent,
    GenericAddContainerComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    Keyboard,
    DatePipe,
    FileChooser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LanguageProvider,
    TranslateService,
    FileTransfer,
    FileTransferObject,
    File,
    FileOpener,
    FilePath,
    Network,
    AuthProvider,
    RestserviceProvider,
    CommonservicesProvider,
    TruckservicesProvider,
    VesselservicesProvider,
    BerthServicesProvider,
    ContaineracceptanceProvider,
    DeliveryorderservicesProvider,
    TruckappointmentserviceProvider,
    SSSServiceProvider,
    DefinedSetValue,
    DefinedSetRequest,
    FiletransferProvider,
    GiGoServiceProvider,
    HrcservicesProvider,
    CshServiceProvider,
    SsrServiceProvider,
    Utils
  ]
})

export class AppModule {

}


