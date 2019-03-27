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
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  CdkDragDrop,
  moveItemInArray,
  CdkDrag,
  CdkDropList
} from '@angular/cdk/drag-drop';
import { FormColumn } from '../../../core/dynamic-forms/models/form-column-properties.model';
import * as _ from 'lodash';
import { IFormControlConfig } from '../../../core/dynamic-forms/models/form-control-config.interface';
import { MatDialog } from '@angular/material';
import { FormControlSettingsComponent } from '../form-control-settings/form-control-settings.component';

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
    const selectedControls = [];
    this.selectedColumns.forEach(item => {
      selectedControls.push(
        item.selectedControls.filter(
          ({ type }) => !_.isNil(type) && type !== 'button'
        )
      );
    });
    return _.flatten(selectedControls);
  }
  constructor(private fb: FormBuilder, private dialog: MatDialog) {}

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
      const droppedControl = _.cloneDeep(event.item.data);
      this.addSelectedControl(
        droppedControl,
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
    const dialogRef = this.dialog.open(FormControlSettingsComponent, {
      data: { control }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const finalObject = _.cloneDeep(control);
        finalObject.label = result.label;
        finalObject.name = result.name;
        finalObject.placeholder = result.placeholder;
        finalObject.value = result.value;
        finalObject.containerId = containerId;
        this.selectedColumns[columnIndex].selectedControls.splice(
          controlIndex,
          1,
          finalObject
        );
        this.refreshFormControls(columnIndex);
      }
    });
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

  private refreshFormControls(columnIndex) {
    if (this.form) {
      const controls = Object.keys(this.form.controls);
      const configControls = this.controls.map(item => item.name);

      controls
        .filter(item => !configControls.includes(item))
        .forEach(item => this.form.removeControl(item));

      configControls
        .filter(item => !controls.includes(item))
        .forEach(name => {
          const config = this.selectedColumns[
            columnIndex
          ].selectedControls.find(item => item.name === name);
          this.form.addControl(name, this.createControl(config));
          this.setDisabledControl(config);
          this.setRequiredControl(config);
        });
    }
  }

  private setDisabledControl(control) {
    if (control.disabled) {
      this.form.get(control.name).disable();
    }
  }

  private setRequiredControl(control) {
    if (control.required) {
      this.form.get(control.name).setValidators(Validators.required);
    }
  }
}
