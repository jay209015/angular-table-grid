import {Component, Input, OnInit} from '@angular/core';
import {TableGridOptions} from '../../interfaces/table-grid-options';
import {TableGridDetails} from '../../interfaces/table-grid-details';

@Component({
  selector: 'lib-table-grid-details',
  templateUrl: './table-grid-details.component.html',
  styleUrls: ['./table-grid-details.component.css']
})
export class TableGridDetailsComponent implements TableGridDetails {
  gridOptions: TableGridOptions;
  gridRow: any;
  gridCell: any;

  detailsInit(gridCell) {
    this.gridCell = gridCell;
  }
}
