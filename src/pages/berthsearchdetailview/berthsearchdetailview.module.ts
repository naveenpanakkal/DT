import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BerthsearchdetailviewPage } from './berthsearchdetailview';

@NgModule({
  declarations: [
    BerthsearchdetailviewPage,
  ],
  imports: [
    IonicPageModule.forChild(BerthsearchdetailviewPage),
  ],
  exports: [
    BerthsearchdetailviewPage
  ]
})
export class BerthsearchdetailviewPageModule {}
