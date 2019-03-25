import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormBuilderComponent implements OnInit {
  listOfIds = [];
  constructor() {}

  ngOnInit() {}

  getListOfDroppableIds(listOfIds) {
    return (this.listOfIds = listOfIds);
  }
}
