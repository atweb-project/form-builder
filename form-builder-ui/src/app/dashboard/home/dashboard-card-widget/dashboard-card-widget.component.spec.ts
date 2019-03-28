import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCardWidgetComponent } from './dashboard-card-widget.component';

describe('DashboardCardWidgetComponent', () => {
  let component: DashboardCardWidgetComponent;
  let fixture: ComponentFixture<DashboardCardWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardCardWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCardWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
