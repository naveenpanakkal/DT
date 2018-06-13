import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {LoadDischargeDownloadPage} from "./loaddischargedownload";

@NgModule({
  declarations: [
    LoadDischargeDownloadPage,
  ],
  imports: [
    IonicPageModule.forChild(LoadDischargeDownloadPage),

    TranslateModule
  ],
  exports: [
    LoadDischargeDownloadPage,
    TranslateModule
  ]
})
export class LoaddischargeDownloadPageModule {}
