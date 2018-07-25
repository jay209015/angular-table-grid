import { Component, OnInit } from '@angular/core';
import {TableGridDetails} from 'table-grid';
import {TableGridOptions} from 'table-grid';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements TableGridDetails {
  gridOptions: TableGridOptions;
  gridRow: any;
  gridCell: any;

  constructor() { }

  detailsInit(gridCell) {
    this.gridCell = this.getLipsum();
  }

  getLipsum() {
    return 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s' +
      ' standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type ' +
      'specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially' +
      ' unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more' +
      ' recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.';
  }
}
