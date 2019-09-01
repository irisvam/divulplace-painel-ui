import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiversosCrudComponent } from './diversos-crud.component';

describe('DiversosCrudComponent', () => {
  let component: DiversosCrudComponent;
  let fixture: ComponentFixture<DiversosCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiversosCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiversosCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
