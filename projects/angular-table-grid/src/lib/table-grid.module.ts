import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableGridComponent} from './components/table-grid/table-grid.component';
import {TableGridRowComponent} from './components/table-grid-row/table-grid-row.component';
import {TableGridCellComponent} from './components/table-grid-cell/table-grid-cell.component';
import {TableGridDetailsComponent} from './components/table-grid-details/table-grid-details.component';
import {TableGridPaginationComponent} from './components/table-grid-pagination/table-grid-pagination.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TableGridComponent,
    TableGridRowComponent,
    TableGridCellComponent,
    TableGridDetailsComponent,
    TableGridPaginationComponent
  ],
  exports: [
    TableGridComponent,
    TableGridRowComponent,
    TableGridCellComponent
  ],
  entryComponents: [TableGridDetailsComponent]
})
export class TableGridModule {
}
