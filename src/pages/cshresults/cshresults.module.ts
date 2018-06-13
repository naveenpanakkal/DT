import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {CSHResultsPage} from "./cshresults";

@NgModule({
  declarations: [
    CSHResultsPage,
  ],
  imports: [
    IonicPageModule.forChild(CSHResultsPage),
    TranslateModule
  ],
  exports: [
    CSHResultsPage,
    TranslateModule
  ]
})
export class CSHResultsPageModule {}
