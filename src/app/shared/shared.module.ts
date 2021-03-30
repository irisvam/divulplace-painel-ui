import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { FormDebugComponent } from './form-debug/form-debug.component';
import { FormFeedbackComponent } from './form-feedback/form-feedback.component';
import { AlertModalComponent } from './alert-modal/alert-modal.component';

@NgModule({
  declarations: [FormDebugComponent, FormFeedbackComponent, AlertModalComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    TooltipModule.forRoot()
  ],
  exports: [FormDebugComponent, FormFeedbackComponent, AlertModalComponent]
})
export class SharedModule { }
