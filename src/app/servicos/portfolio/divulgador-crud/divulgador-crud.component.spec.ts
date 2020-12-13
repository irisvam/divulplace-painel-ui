import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DivulgadorCrudComponent } from './divulgador-crud.component';

describe('DiversosCrudComponent', () => {
  let component: DivulgadorCrudComponent;
  let fixture: ComponentFixture<DivulgadorCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DivulgadorCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivulgadorCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
