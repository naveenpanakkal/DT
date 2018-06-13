import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {SsrApproverComponent} from "./ssr-approver";


@NgModule({
  declarations: [
    SsrApproverComponent,
  ],
  imports: [
    IonicModule,
    TranslateModule
  ],
  exports: [
    SsrApproverComponent,
    TranslateModule
  ]
})
export class SsrApproverComponentModule {}
