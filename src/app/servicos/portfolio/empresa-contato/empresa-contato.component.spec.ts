import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaContatoComponent } from './empresa-contato.component';

describe('EmpresaContatoComponent', () => {
  let component: EmpresaContatoComponent;
  let fixture: ComponentFixture<EmpresaContatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresaContatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaContatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
