import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DosortPage } from './dosort';

@NgModule({
  declarations: [
    DosortPage,
  ],
  imports: [
    IonicPageModule.forChild(DosortPage),
  ],
  exports: [
    DosortPage
  ]
})
export class DosortModule {}
