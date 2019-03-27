import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextareaFormControlComponent } from './textarea-form-control.component';

describe('TextareaFormControlComponent', () => {
  let component: TextareaFormControlComponent;
  let fixture: ComponentFixture<TextareaFormControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextareaFormControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareaFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
