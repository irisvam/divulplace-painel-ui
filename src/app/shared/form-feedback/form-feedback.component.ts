import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { FormValidations } from '../form-validatotions';

@Component({
  selector: 'app-form-feedback',
  templateUrl: './form-feedback.component.html',
  styleUrls: ['./form-feedback.component.scss']
})
export class FormFeedbackComponent implements OnInit {

  @Input() control: FormControl;
  @Input() label: string;
  
  constructor() { }

  ngOnInit() {
  }

  get errorMessage() {

    for (const propertyName in this.control.errors) {
      if(this.control.errors.hasOwnProperty(propertyName) && (this.control.touched || this.control.dirty)) {
        return FormValidations.getErrorMessage(this.label, propertyName, this.control.errors[propertyName]);
      }
    }
    return null;
  }

}
