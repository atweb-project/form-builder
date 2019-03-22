import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
  ViewChildren,
  QueryList,
  AfterViewChecked
} from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  CdkDragStart,
  CdkDragMove,
  CdkDrag,
  CdkDropList
} from '@angular/cdk/drag-drop';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IFormControlConfig } from 'src/app/core/dynamic-forms/models/form-control-config.interface';
import * as _ from 'lodash';
import { FormColumn } from 'src/app/core/dynamic-forms/models/form-column-properties.model';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormBuilderComponent implements OnInit, AfterViewChecked {
  @ViewChild('columnsList', { read: ElementRef }) child: ElementRef;
  @ViewChild('controlsList', { read: ElementRef }) controlChild: ElementRef;
  @ViewChildren('controlDropLists') controlDropLists: QueryList<ElementRef>;
  form: FormGroup;
  structureColumns: FormColumn[] = [
    {
      label: '1 column',
      subLabel: '100%',
      widthOfColumns: [100],
      selectedControls: [{ emptyContainer: true }]
    },
    {
      label: '2 columns',
      subLabel: '2 x 50%',
      widthOfColumns: [50, 50],
      selectedControls: [{ emptyContainer: true }, { emptyContainer: true }]
    },
    {
      label: '2 columns',
      subLabel: '33% + 66%',
      widthOfColumns: [33, 66],
      selectedControls: [{ emptyContainer: true }, { emptyContainer: true }]
    },
    {
      label: '2 columns',
      subLabel: '66% + 33%',
      widthOfColumns: [66, 33],
      selectedControls: [{ emptyContainer: true }, { emptyContainer: true }]
    },
    {
      label: '3 columns',
      subLabel: '3 x 33%',
      widthOfColumns: [33, 33, 33],
      selectedControls: [
        { emptyContainer: true },
        { emptyContainer: true },
        { emptyContainer: true }
      ]
    },
    {
      label: '3 columns',
      subLabel: '25% + 50% + 25%',
      widthOfColumns: [25, 50, 25],
      selectedControls: [
        { emptyContainer: true },
        { emptyContainer: true },
        { emptyContainer: true }
      ]
    },
    {
      label: '4 columns',
      subLabel: '4 x 25%',
      widthOfColumns: [25, 25, 25, 25],
      selectedControls: [
        { emptyContainer: true },
        { emptyContainer: true },
        { emptyContainer: true },
        { emptyContainer: true }
      ]
    }
  ];
  selectedColumns = [];
  selectedIndex: number;
  selectedHtmlElement: any;
  formControls: IFormControlConfig[] = [
    { type: 'input', controlLabel: 'Input Text' },
    { type: 'checkbox', controlLabel: 'CheckBox' }
  ];
  selectedFormControls: IFormControlConfig[] = [];
  listOfIds = [];
  selectedControlIndex: number;
  selectedHtmlControl: any;

  get controls() {
    return this.selectedFormControls.filter(({ type }) => type !== 'button');
  }

  get formGroup() {
    return this.form;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.createGroup();
  }

  ngAfterViewChecked() {
    if (this.controlDropLists) {
      this.listOfIds = this.controlDropLists.map(p => p.nativeElement.id);
    }
  }

  dragStartRows(event: CdkDragStart) {
    this.selectedIndex = this.structureColumns.indexOf(event.source.data);
    this.selectedHtmlElement = this.child.nativeElement.children[
      this.selectedIndex
    ];
    //   console.log(this.selectedHtmlElement);
  }

  movedRows(event: CdkDragMove) {
    if (
      this.child.nativeElement.children[this.selectedIndex] !==
      this.selectedHtmlElement
    ) {
      this.child.nativeElement.replaceChild(
        this.selectedHtmlElement,
        this.child.nativeElement.children[this.selectedIndex]
      );
    }
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

  selectedContainerIsNotEmpty(selectedControls, index) {
    return (
      !_.isEmpty(selectedControls) && !selectedControls[index].emptyContainer
    );
  }

  noReturnPredicate() {
    return false;
  }

  enterPredicate(drag: CdkDrag, drop: CdkDropList) {
    const index = drop.id.toString()[1];
    return drop.data[index].emptyContainer;
  }
}
