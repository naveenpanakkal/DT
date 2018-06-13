import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {CSHDetailsPage} from "./cshdetailsview";

@NgModule({
  declarations: [
    CSHDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(CSHDetailsPage),
    TranslateModule
  ],
  exports: [
    CSHDetailsPage,
    TranslateModule
  ]
})
export class CSHdetailsPageModule {}
