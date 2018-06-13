import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CshCmpModelComponent } from './csh-cmp-model';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    CshCmpModelComponent,
  ],
  imports: [
    IonicModule,
    TranslateModule
  ],
  exports: [
    CshCmpModelComponent,
    TranslateModule
  ]
})
export class CshCmpModelComponentModule {}
