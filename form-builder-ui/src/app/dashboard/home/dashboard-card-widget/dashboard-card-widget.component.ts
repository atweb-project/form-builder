import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-dashboard-card-widget',
  templateUrl: './dashboard-card-widget.component.html',
  styleUrls: ['./dashboard-card-widget.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardCardWidgetComponent implements OnInit {
  @Input()
  icon!: string;
  @Input()
  cardTitle!: string;
  @Input()
  cardContent!: string;
  @Input()
  buttonText!: string;
  @Input()
  buttolUrl!: string;

  constructor() {}

  ngOnInit() {}
}
