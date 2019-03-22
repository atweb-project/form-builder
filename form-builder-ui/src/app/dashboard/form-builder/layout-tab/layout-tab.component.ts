import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormColumn } from 'src/app/core/dynamic-forms/models/form-column-properties.model';
import { CdkDragStart, CdkDragMove } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-layout-tab',
  templateUrl: './layout-tab.component.html',
  styleUrls: ['./layout-tab.component.scss']
})
export class LayoutTabComponent implements OnInit {
  @ViewChild('columnsList', { read: ElementRef }) child: ElementRef;
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
  selectedIndex: number;
  selectedHtmlElement: any;

  constructor() {}

  ngOnInit() {}

  dragStartRows(event: CdkDragStart) {
    this.selectedIndex = this.structureColumns.indexOf(event.source.data);
    this.selectedHtmlElement = this.child.nativeElement.children[
      this.selectedIndex
    ];
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

  noReturnPredicate() {
    return false;
  }
}
