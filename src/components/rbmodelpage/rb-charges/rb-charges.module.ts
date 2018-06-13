import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { RBChargesComponent } from './rb-charges';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    RBChargesComponent,
  ],
  imports: [
    IonicModule,
    TranslateModule
  ],
  exports: [
    RBChargesComponent,
    TranslateModule
  ]
})
export class RbChargesComponentModule {}
