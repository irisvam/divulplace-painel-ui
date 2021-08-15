import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultorVideoComponent } from './consultor-video.component';

describe('ConsultorVideoComponent', () => {
  let component: ConsultorVideoComponent;
  let fixture: ComponentFixture<ConsultorVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultorVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultorVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
