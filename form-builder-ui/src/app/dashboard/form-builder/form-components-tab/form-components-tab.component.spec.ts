import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponentsTabComponent } from './form-components-tab.component';

describe('FormComponentsTabComponent', () => {
  let component: FormComponentsTabComponent;
  let fixture: ComponentFixture<FormComponentsTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormComponentsTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponentsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
