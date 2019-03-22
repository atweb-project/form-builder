import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonFormControlComponent } from './button-form-control.component';

describe('ButtonFormControlComponent', () => {
  let component: ButtonFormControlComponent;
  let fixture: ComponentFixture<ButtonFormControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonFormControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
