import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkflowPage } from './workflow';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    WorkflowPage,
  ],
  imports: [
    IonicPageModule.forChild(WorkflowPage),
    TranslateModule
  ],
  exports: [
    WorkflowPage,
    TranslateModule
  ]
})
export class WorkflowPageModule {}
