import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {NotificationsortPage} from "./notificationssort";

@NgModule({
  declarations: [
    NotificationsortPage,
  ],
  imports: [
    IonicPageModule.forChild(NotificationsortPage),
    TranslateModule
  ],
  exports: [
    NotificationsortPage,
    TranslateModule
  ]
})
export class NotificationsortPageModule {}
