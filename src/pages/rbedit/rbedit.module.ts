import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RBeditPage } from './rbedit';

@NgModule({
  declarations: [
    RBeditPage,
  ],
  imports: [
    IonicPageModule.forChild(RBeditPage),
  ],
  exports: [
    RBeditPage
  ]
})
export class RBeditPageModule {}
