import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { TaAddContainerComponent } from './ta-add-container';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    TaAddContainerComponent,
  ],
  imports: [
    IonicModule,
    TranslateModule
  ],
  exports: [
    TaAddContainerComponent,
    TranslateModule
  ]
})
export class TaAddContainerComponentModule {}
