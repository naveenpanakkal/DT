import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {CSHCreateEditPage} from "./cshdetailscreateandedit";

@NgModule({
  declarations: [
    CSHCreateEditPage,
  ],
  imports: [
    IonicPageModule.forChild(CSHCreateEditPage),
    TranslateModule
  ],
  exports: [
    CSHCreateEditPage,
    TranslateModule
  ]
})
export class CSHCreateEditPageModule {}
