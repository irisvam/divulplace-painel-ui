import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-form-feedback',
  templateUrl: './form-feedback.component.html',
  styleUrls: ['./form-feedback.component.scss']
})
export class FormFeedbackComponent implements OnInit {

  @Input() show = false;
  @Input() success = false;

  constructor() { }

  ngOnInit() {
  }

}
