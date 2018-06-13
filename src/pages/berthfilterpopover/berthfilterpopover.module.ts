import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BerthfilterpopoverPage } from './berthfilterpopover';

@NgModule({
  declarations: [
    BerthfilterpopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(BerthfilterpopoverPage),
  ],
  exports: [
    BerthfilterpopoverPage
  ]
})
export class BerthfilterpopoverPageModule {}
