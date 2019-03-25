import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  ElementRef,
  AfterViewChecked,
  Output,
  EventEmitter
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {
  CdkDragDrop,
  moveItemInArray,
  CdkDrag,
  CdkDropList
} from '@angular/cdk/drag-drop';
import { FormColumn } from '../../../core/dynamic-forms/models/form-column-properties.model';
import * as _ from 'lodash';
import { IFormControlConfig } from '../../../core/dynamic-forms/models/form-control-config.interface';

@Component({
  selector: 'app-form-droppable-container',
  templateUrl: './form-droppable-container.component.html',
  styleUrls: ['./form-droppable-container.component.scss']
})
export class FormDroppableContainerComponent
  implements OnInit, AfterViewChecked {
  @ViewChildren('controlDropLists') controlDropLists: QueryList<ElementRef>;
  @Output() listOfPlaceholderIds = new EventEmitter();
  listOfIds = [];
  form: FormGroup;
  selectedColumns = [];
  selectedFormControls: IFormControlConfig[] = [];
  get controls() {
    return this.selectedFormControls.filter(({ type }) => type !== 'button');
  }
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.createGroup();
  }

  ngAfterViewChecked() {
    if (this.controlDropLists) {
      this.listOfIds = this.controlDropLists.map(p => p.nativeElement.id);
      this.listOfPlaceholderIds.emit(this.listOfIds);
    }
  }

  createGroup() {
    const group = this.fb.group({});
    this.controls.forEach(control =>
      group.addControl(control.name, this.createControl(control))
    );
    return group;
  }

  createControl(config: IFormControlConfig) {
    const { disabled, validation, value } = config;
    return this.fb.control({ disabled, value }, validation);
  }

  dropRows(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      this.addSelectedColumn(event.item.data, event.currentIndex);
    }
    console.log(event.currentIndex);
    console.log(this.selectedColumns);
  }

  addSelectedColumn(columnContainer: FormColumn, index: number) {
    const selectedObj = _.cloneDeep(columnContainer);
    selectedObj.id = index;
    const tempArray = _.cloneDeep(this.selectedColumns);
    const idExists = !_.isEmpty(tempArray.filter(item => item.id === index));
    this.selectedColumns.splice(index, 0, selectedObj);
    if (idExists) {
      this.selectedColumns.forEach((item, i) => {
        item.id = i;
        item.selectedControls.forEach((control, j) => {
          if (control.containerId) {
            control.containerId = Number(i.toString() + j.toString());
          }
        });
      });
    }
  }

  removeSelectedColumns(column: FormColumn) {
    this.selectedColumns = this.selectedColumns.filter(item => item !== column);
  }

  dropControls(
    event: CdkDragDrop<string[]>,
    column,
    columnIndex,
    controlIndex
  ) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      this.addSelectedControl(
        event.item.data,
        event.container.id,
        columnIndex,
        controlIndex
      );
    }
    console.log(this.selectedColumns);
  }

  addSelectedControl(
    control: IFormControlConfig,
    containerId: string,
    columnIndex: number,
    controlIndex: number
  ) {
    //  this.selectedFormControls.splice(index, 0, control);
    const finalObject = _.cloneDeep(control);
    finalObject.containerId = containerId;
    this.selectedColumns[columnIndex].selectedControls.splice(
      controlIndex,
      1,
      finalObject
    );
  }

  selectedContainerIsNotEmpty(selectedControls, index) {
    return (
      !_.isEmpty(selectedControls) && !selectedControls[index].emptyContainer
    );
  }

  enterPredicate(drag: CdkDrag, drop: CdkDropList) {
    const index = drop.id.toString()[1];
    return drop.data[index].emptyContainer;
  }
}
