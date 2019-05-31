import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormBuilderComponent implements OnInit {
  listOfIds = [];
  isDragging = false;
  constructor() {}

  ngOnInit() {}

  getListOfDroppableIds(listOfIds: any[]) {
    return (this.listOfIds = listOfIds);
  }

  getDraggingEvent(event: boolean) {
    return (this.isDragging = event);
  }
}
