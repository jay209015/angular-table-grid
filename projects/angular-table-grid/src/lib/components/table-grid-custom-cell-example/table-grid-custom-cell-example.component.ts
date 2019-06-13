import {Component, OnInit} from '@angular/core';
import {TableGridCustomCell} from '../../interfaces/table-grid-custom-cell';

@Component({
    selector: 'lib-table-grid-custom-cell-example',
    templateUrl: './table-grid-custom-cell-example.component.html',
    styleUrls: ['./table-grid-custom-cell-example.component.css']
})
export class TableGridCustomCellExampleComponent implements OnInit, TableGridCustomCell {
    gridCell: any;

    constructor() {
    }

    ngOnInit() {
    }

    detailsInit(gridCell) {
        this.gridCell = gridCell;
    }
}
