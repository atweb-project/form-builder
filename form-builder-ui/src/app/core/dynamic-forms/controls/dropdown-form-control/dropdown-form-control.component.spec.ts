import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownFormControlComponent } from './dropdown-form-control.component';

describe('DropdownFormControlComponent', () => {
  let component: DropdownFormControlComponent;
  let fixture: ComponentFixture<DropdownFormControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownFormControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
