import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {HoldContainerSortPage} from "./holdcontainersort";

@NgModule({
  declarations: [
    HoldContainerSortPage,
  ],
  imports: [
    IonicPageModule.forChild(HoldContainerSortPage),
    TranslateModule
  ],
  exports: [
    HoldContainerSortPage,
    TranslateModule
  ]
})

export class HoldContainerSearchSortPageModule {}
