import {Type} from '@angular/core';
import {TableGridCustomCell} from './table-grid-custom-cell';

export interface TableGridColumn {
  headerTitle: string;
  fieldName: string;
  sortable?: boolean;
  visible?: boolean;
  component?: Type<TableGridCustomCell>;
}
