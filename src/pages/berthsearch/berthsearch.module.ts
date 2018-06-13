import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BerthsearchPage } from './berthsearch';

@NgModule({
  declarations: [
    BerthsearchPage,
  ],
  imports: [
    IonicPageModule.forChild(BerthsearchPage),
  ],
  exports: [
    BerthsearchPage
  ]
})
export class BerthsearchPageModule {}
