import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormDebugComponent } from './form-debug/form-debug.component';
import { FormFeedbackComponent } from './form-feedback/form-feedback.component';
import { DropdownService } from './service/dropdown.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [FormDebugComponent, FormFeedbackComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [FormDebugComponent, FormFeedbackComponent]
})
export class SharedModule { }
