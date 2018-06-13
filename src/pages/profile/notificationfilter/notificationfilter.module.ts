import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {NotificationFilterPage} from "./notificationfilter";

@NgModule({
  declarations: [
    NotificationFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(NotificationFilterPage),
    TranslateModule
  ],
  exports: [
    NotificationFilterPage,
    TranslateModule
  ]
})
export class NotificationFilterPageModule {}
