import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecadoComponent } from './recado.component';

describe('RecadoComponent', () => {
  let component: RecadoComponent;
  let fixture: ComponentFixture<RecadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
