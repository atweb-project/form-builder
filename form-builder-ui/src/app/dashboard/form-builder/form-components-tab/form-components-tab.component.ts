import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { IFormControlConfig } from '../../../core/dynamic-forms/models/form-control-config.interface';
import { CdkDragStart, CdkDragMove } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-form-components-tab',
  templateUrl: './form-components-tab.component.html',
  styleUrls: ['./form-components-tab.component.scss']
})
export class FormComponentsTabComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('listOfIds') listOfIds: [];
  @ViewChild('controlsList', { read: ElementRef }) controlChild: ElementRef;
  formControls = [
    { type: 'input', controlLabel: 'Input Text' },
    { type: 'checkbox', controlLabel: 'CheckBox' },
    { type: 'dropdown', controlLabel: 'DropDown' }
  ];
  selectedControlIndex: number;
  selectedHtmlControl: any;

  constructor() {}

  ngOnInit() {}

  dragStartControls(event: CdkDragStart) {
    this.selectedControlIndex = this.formControls.indexOf(event.source.data);
    this.selectedHtmlControl = this.controlChild.nativeElement.children[
      this.selectedControlIndex
    ];
  }

  movedControls(event: CdkDragMove) {
    if (
      this.controlChild.nativeElement.children[this.selectedControlIndex] !==
      this.selectedHtmlControl
    ) {
      this.controlChild.nativeElement.replaceChild(
        this.selectedHtmlControl,
        this.controlChild.nativeElement.children[this.selectedControlIndex]
      );
    }
  }

  noReturnPredicate() {
    return false;
  }
}
