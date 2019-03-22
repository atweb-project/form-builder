import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSettingsTabComponent } from './form-settings-tab.component';

describe('FormSettingsTabComponent', () => {
  let component: FormSettingsTabComponent;
  let fixture: ComponentFixture<FormSettingsTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSettingsTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSettingsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
