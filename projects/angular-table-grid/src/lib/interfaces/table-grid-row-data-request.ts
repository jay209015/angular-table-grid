import {TableGridSorting} from './table-grid-sorting';
import {TableGridFilters} from './table-grid-filters';
import {TableGridPagination} from './table-grid-pagination';
import {HttpParams} from '@angular/common/http';

export interface TableGridRowDataRequest {
  pagination: TableGridPagination;
  filters: TableGridFilters[];
  sorting: TableGridSorting[];
  params: HttpParams;
}
