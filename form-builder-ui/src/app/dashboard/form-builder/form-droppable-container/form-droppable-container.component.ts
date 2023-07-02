import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  ElementRef,
  AfterViewChecked,
  Output,
  EventEmitter,
  Input
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
import { MatDialog } from '@angular/material/dialog';
import { FormControlSettingsComponent } from '../form-control-settings/form-control-settings.component';

@Component({
  selector: 'app-form-droppable-container',
  templateUrl: './form-droppable-container.component.html',
  styleUrls: ['./form-droppable-container.component.css']
})
export class FormDroppableContainerComponent
  implements OnInit, AfterViewChecked {
  @Input()
  isDragging!: boolean;
  @Output() isDropped = new EventEmitter();
  @ViewChildren('controlDropLists')
  controlDropLists!: QueryList<ElementRef>;
  @Output() listOfPlaceholderIds = new EventEmitter();
  listOfIds: any = [];
  form!: FormGroup;
  selectedColumns: any = [];
  selectedFormControls: IFormControlConfig[] = [];
  get controls(): any {
    const selectedControls: any = [];
    this.selectedColumns.forEach((item: any): void => {
      selectedControls.push(
        item.selectedControls.filter(
          ({ type }: any): boolean => !_.isNil(type) && type !== 'button'
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

  createGroup(): FormGroup<{}> {
    const group = this.fb.group({});
    this.controls.forEach((control: any): void =>
      group.addControl(control.name, this.createControl(control))
    );
    return group;
  }

  createControl(config: IFormControlConfig) {
    const { disabled, validation, value } = config;
    return this.fb.control({ disabled, value }, validation);
  }

  dropRows(event: CdkDragDrop<string[]>) {
    this.isDropped.emit(false);
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
    const idExists = !_.isEmpty(tempArray.filter((item: { id: number; }) => item.id === index));
    this.selectedColumns.splice(index, 0, selectedObj);
    if (idExists) {
      this.selectedColumns.forEach((item: { id: any; selectedControls: any[]; }, i: { toString: () => any; }) => {
        item.id = i;
        item.selectedControls.forEach((control: { containerId: number; }, j: { toString: () => any; }) => {
          if (control.containerId) {
            control.containerId = Number(i.toString() + j.toString());
          }
        });
      });
    }
  }

  removeSelectedColumns(column: FormColumn) {
    this.selectedColumns = this.selectedColumns.filter((item: FormColumn) => item !== column);
  }

  dropControls(
    event: CdkDragDrop<string[]>,
    column: any,
    columnIndex: number,
    controlIndex: number
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

  selectedContainerIsNotEmpty(selectedControls: { [x: string]: { emptyContainer: any; }; }, index: string | number) {
    return (
      !_.isEmpty(selectedControls) && !selectedControls[index].emptyContainer
    );
  }

  enterPredicate(drag: CdkDrag, drop: CdkDropList) {
    const index = drop.id.toString()[1];
    return drop.data[index].emptyContainer;
  }

  isContainerEmptyOrElementIsNotDragging() {
    return !this.isDragging && _.isEmpty(this.selectedColumns);
  }

  private refreshFormControls(columnIndex: number) {
    if (this.form) {
      const controls = Object.keys(this.form.controls);
      const configControls = this.controls.map((item: IFormControlConfig): any => item.name);

      controls
        .filter(item => !configControls.includes(item))
        .forEach(item => this.form.removeControl(item));

      configControls
        .filter((item: string) => !controls.includes(item))
        .forEach((name: any) => {
          const config = this.selectedColumns[
            columnIndex
          ].selectedControls.find((item: { name: any; }) => item.name === name);
          this.form.addControl(name, this.createControl(config));
          this.setDisabledControl(config);
          this.setRequiredControl(config);
        });
    }
  }

  private setDisabledControl(control: IFormControlConfig) {
    if (control.disabled) {
      this.form.controls[control.name].disable();
    }
  }

  private setRequiredControl(control: IFormControlConfig): void {
    if (control.required) {
      this.form.controls[control.name].setValidators(Validators.required);
    }
  }
}
