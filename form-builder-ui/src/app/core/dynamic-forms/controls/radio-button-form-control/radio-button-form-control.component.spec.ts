import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioButtonFormControlComponent } from './radio-button-form-control.component';

describe('RadioButtonFormControlComponent', () => {
  let component: RadioButtonFormControlComponent;
  let fixture: ComponentFixture<RadioButtonFormControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioButtonFormControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioButtonFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
