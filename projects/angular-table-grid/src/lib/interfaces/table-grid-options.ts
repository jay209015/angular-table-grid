import {TableGridColumn} from './table-grid-column';
import {TableGridDetails} from './table-grid-details';
import {Type} from '@angular/core';
import {Observable} from 'rxjs';
import {TableGridRowDataRequest} from './table-grid-row-data-request';

export interface TableGridOptions {
  columns: TableGridColumn[];
  getRowData: (rowDataRequest: TableGridRowDataRequest) => Observable<any>;
  enableDetails?: boolean;
  getDetails?: (node: object) => any ;
  detailComponent?: Type<TableGridDetails>;
  totalRows?: number;
  perPage?: number;
  page?: number;
}
