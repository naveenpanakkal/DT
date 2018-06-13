import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {NotificationSelectedItemDetailsPage} from "./notificationSelectedItemDetails";

@NgModule({
  declarations: [
    NotificationSelectedItemDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(NotificationSelectedItemDetailsPage),
    TranslateModule
  ],
  exports: [
    NotificationSelectedItemDetailsPage,
    TranslateModule
  ]
})
export class NotificationSelectedItemDetailsPageModule {}
