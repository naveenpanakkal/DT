import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BerthsearchsummaryPage } from './berthsearchsummary';

@NgModule({
  declarations: [
    BerthsearchsummaryPage,
  ],
  imports: [
    IonicPageModule.forChild(BerthsearchsummaryPage),
  ],
  exports: [
    BerthsearchsummaryPage
  ]
})
export class BerthsearchsummaryPageModule {}
