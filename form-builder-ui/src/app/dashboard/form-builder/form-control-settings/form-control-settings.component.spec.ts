import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControlSettingsComponent } from './form-control-settings.component';

describe('FormControlSettingsComponent', () => {
  let component: FormControlSettingsComponent;
  let fixture: ComponentFixture<FormControlSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormControlSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormControlSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
