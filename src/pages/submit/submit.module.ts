import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubmitPage } from './submit';

@NgModule({
  declarations: [
    SubmitPage,
  ],
  imports: [
    IonicPageModule.forChild(SubmitPage),
  ],
  exports: [
    SubmitPage
  ]
})
export class SubmitPageModule {}
