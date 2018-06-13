import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkflowdetailsPage } from './workflowdetails';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    WorkflowdetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(WorkflowdetailsPage),
    TranslateModule
  ],
  exports: [
    WorkflowdetailsPage,
    TranslateModule
  ]
})
export class WorkflowdetailsPageModule {}
