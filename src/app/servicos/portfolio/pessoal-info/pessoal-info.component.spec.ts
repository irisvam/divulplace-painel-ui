import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoalInfoComponent } from './pessoal-info.component';

describe('PessoalInfoComponent', () => {
  let component: PessoalInfoComponent;
  let fixture: ComponentFixture<PessoalInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PessoalInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PessoalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
