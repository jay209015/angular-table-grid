import {TableGridOptions} from './table-grid-options';

export interface TableGridDetails {
  gridOptions: TableGridOptions;
  gridRow: any;
  gridCell: any;
  detailsInit?: (any) => void;
}
