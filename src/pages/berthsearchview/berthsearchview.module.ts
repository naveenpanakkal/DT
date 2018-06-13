import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BerthSearchViewPage } from './berthsearchview';

@NgModule({
  declarations: [
    BerthSearchViewPage,
  ],
  imports: [
    IonicPageModule.forChild(BerthSearchViewPage),
  ],
  exports: [
    BerthSearchViewPage
  ]
})
export class BerthSearchViewPageModule {}
