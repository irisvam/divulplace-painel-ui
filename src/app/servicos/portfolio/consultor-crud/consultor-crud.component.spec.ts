import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultorCrudComponent } from './consultor-crud.component';

describe('ConsultorCrudComponent', () => {
  let component: ConsultorCrudComponent;
  let fixture: ComponentFixture<ConsultorCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultorCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultorCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
