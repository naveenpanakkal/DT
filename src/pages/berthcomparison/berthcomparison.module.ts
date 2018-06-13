import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BerthcomparisonPage } from './berthcomparison';

@NgModule({
  declarations: [
    BerthcomparisonPage,
  ],
  imports: [
    IonicPageModule.forChild(BerthcomparisonPage),
  ],
  exports: [
    BerthcomparisonPage
  ]
})
export class BerthcomparisonPageModule {}
