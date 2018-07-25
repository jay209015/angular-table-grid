import {Component, Input, OnInit} from '@angular/core';
import {TableGridColumn} from '../../interfaces/table-grid-column';

@Component({
  selector: 'lib-table-grid-row',
  templateUrl: './table-grid-row.component.html',
  styleUrls: ['./table-grid-row.component.css']
})
export class TableGridRowComponent implements OnInit {
  @Input() gridRow: object;
  @Input() gridColumns: TableGridColumn[];
  constructor() { }

  ngOnInit() {
  }

}
