import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { RbAddContainerComponent } from './rb-add-container';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    RbAddContainerComponent,
  ],
  imports: [
    IonicModule,
    TranslateModule
  ],
  exports: [
    RbAddContainerComponent,
    TranslateModule
  ]
})
export class RbAddContainerComponentModule {}
