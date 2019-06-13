import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableGridComponent} from './components/table-grid/table-grid.component';
import {TableGridRowComponent} from './components/table-grid-row/table-grid-row.component';
import {TableGridCellComponent} from './components/table-grid-cell/table-grid-cell.component';
import {TableGridDetailsComponent} from './components/table-grid-details/table-grid-details.component';
import {TableGridPaginationComponent} from './components/table-grid-pagination/table-grid-pagination.component';
import {FormsModule} from '@angular/forms';
import { TableGridStyleDirective } from './directives/table-grid-style.directive';
import { TableGridCustomCellExampleComponent } from './components/table-grid-custom-cell-example/table-grid-custom-cell-example.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        TableGridComponent,
        TableGridRowComponent,
        TableGridCellComponent,
        TableGridDetailsComponent,
        TableGridPaginationComponent,
        TableGridStyleDirective,
        TableGridCustomCellExampleComponent
    ],
    exports: [
        TableGridComponent,
        TableGridRowComponent,
        TableGridCellComponent
    ],
    entryComponents: [TableGridDetailsComponent, TableGridCustomCellExampleComponent]
})
export class AngularTableGridModule {
}
