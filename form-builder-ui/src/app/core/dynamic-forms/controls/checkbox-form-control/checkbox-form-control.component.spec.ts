import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxFormControlComponent } from './checkbox-form-control.component';

describe('CheckboxFormControlComponent', () => {
  let component: CheckboxFormControlComponent;
  let fixture: ComponentFixture<CheckboxFormControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboxFormControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
