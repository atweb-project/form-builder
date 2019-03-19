import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
  ViewChildren,
  QueryList
} from '@angular/core';
import {
  CdkDragDrop,
  transferArrayItem,
  moveItemInArray,
  copyArrayItem,
  CdkDragStart,
  CdkDragMove
} from '@angular/cdk/drag-drop';
import { MatList } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  @ViewChild('columnsList', { read: ElementRef }) child: ElementRef;
  @ViewChild('controlsList', { read: ElementRef }) controlChild: ElementRef;
  @ViewChildren('controlDropLists') controlDropLists: QueryList<ElementRef>;
  structureColumns = [
    { label: '1 column', subLabel: '100%', widthOfColumns: [100] },
    { label: '2 columns', subLabel: '2 x 50%', widthOfColumns: [50, 50] },
    { label: '2 columns', subLabel: '33% + 66%', widthOfColumns: [33, 66] },
    { label: '2 columns', subLabel: '66% + 33%', widthOfColumns: [66, 33] },
    { label: '3 columns', subLabel: '3 x 33%', widthOfColumns: [33, 33, 33] },
    {
      label: '3 columns',
      subLabel: '25% + 50% + 25%',
      widthOfColumns: [25, 50, 25]
    },
    {
      label: '4 columns',
      subLabel: '4 x 25%',
      widthOfColumns: [25, 25, 25, 25]
    }
  ];
  selectedColumns = [];
  selectedIndex: number;
  selectedHtmlElement: any;
  formControls = ['Input Text', 'Checkbox'];
  selectedFormControls = [];
  listOfIds = [];
  selectedControlIndex: number;
  selectedHtmlControl: any;

  constructor() {}

  ngOnInit() {}

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
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewChecked() {
    if (this.controlDropLists) {
      this.listOfIds = this.controlDropLists.map(p => p.nativeElement.id);
    }
  }

  addSelectedColumn(columnContainer: string, index: number) {
    this.selectedColumns.splice(index, 0, columnContainer);
  }

  removeSelectedColumns(column: object) {
    this.selectedColumns = this.selectedColumns.filter(item => item !== column);
  }

  dropControls(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      this.addSelectedControl(event.item.data, event.currentIndex);
    }
  }

  addSelectedControl(control: string, index: number) {
    this.selectedFormControls.splice(index, 0, control);
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
}