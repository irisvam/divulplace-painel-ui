import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCrudComponent } from './image-crud.component';

describe('ImageCrudComponent', () => {
  let component: ImageCrudComponent;
  let fixture: ComponentFixture<ImageCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
