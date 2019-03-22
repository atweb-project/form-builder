import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDroppableContainerComponent } from './form-droppable-container.component';

describe('FormDroppableContainerComponent', () => {
  let component: FormDroppableContainerComponent;
  let fixture: ComponentFixture<FormDroppableContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDroppableContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDroppableContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
