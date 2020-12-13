import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DivulgadorComponent } from './divulgador.component';

describe('DivulgadorComponent', () => {
  let component: DivulgadorComponent;
  let fixture: ComponentFixture<DivulgadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DivulgadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivulgadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
