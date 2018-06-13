import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BerthsortpopoverPage } from './berthsortpopover';

@NgModule({
  declarations: [
    BerthsortpopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(BerthsortpopoverPage),
  ],
  exports: [
    BerthsortpopoverPage
  ]
})
export class BerthsortpopoverPageModule {}
