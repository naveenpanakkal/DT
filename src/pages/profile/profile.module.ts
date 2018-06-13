import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
    TranslateModule
  ],
  exports: [
    ProfilePage,
    TranslateModule
  ]
})
export class ProfilePageModule {}
