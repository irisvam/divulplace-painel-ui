import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { FormDebugComponent } from './form-debug/form-debug.component';
import { FormFeedbackComponent } from './form-feedback/form-feedback.component';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [FormDebugComponent, FormFeedbackComponent, AlertModalComponent, ConfirmModalComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    TooltipModule.forRoot()
  ],
  exports: [FormDebugComponent, FormFeedbackComponent, AlertModalComponent, ConfirmModalComponent]
})
export class SharedModule { }
