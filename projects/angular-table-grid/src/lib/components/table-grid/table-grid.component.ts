import {Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {TableGridOptions} from '../../interfaces/table-grid-options';
import {TableGridRowDataRequest} from '../../interfaces/table-grid-row-data-request';
import {HttpParams} from '@angular/common/http';
import {PageChangedEvent, TableGridPaginationComponent} from '../table-grid-pagination/table-grid-pagination.component';
import {Subscription} from 'rxjs';
import {TableGridColumn} from '../../interfaces/table-grid-column';


@Component({
    selector: 'lib-table-grid',
    templateUrl: './table-grid.component.html',
    styleUrls: ['./table-grid.component.scss']
})
export class TableGridComponent implements OnInit {
    @ViewChild(TableGridPaginationComponent) pagination;
    @Input() gridOptions: TableGridOptions;
    @Output() gridReady = new EventEmitter<TableGridComponent>();
    @Output() select = new EventEmitter<any>();
    @Output() deselect = new EventEmitter<any>();
    public rowData: any[] = [];
    public rowDataRequest: TableGridRowDataRequest;
    public selectedRows: any[] = [];
    private multiSelect = false;
    private multiSelectOverride = false;
    showSettings = false;

    constructor() {
    }

    ngOnInit() {
        this.rowDataRequest = <TableGridRowDataRequest>{
            pagination: {
                page: 1,
                perPage: 0,
                totalRows: 0
            },
            filters: [],
            sorting: [],
            params: new HttpParams()
        };

        for (let i = 0; i < this.gridOptions.columns.length; i++) {
            if (typeof this.gridOptions.columns[i].visible === 'undefined') {
                this.gridOptions.columns[i].visible = true;
            }
        }

        if (typeof this.gridOptions.perPage !== 'undefined') {
            this.rowDataRequest.pagination.perPage = this.gridOptions.perPage;
            this.rowDataRequest.params = this.rowDataRequest.params.set('_page', this.rowDataRequest.pagination.page.toString());
            this.rowDataRequest.params = this.rowDataRequest.params.set('_limit', this.rowDataRequest.pagination.perPage.toString());
        }

        if (typeof this.gridOptions.multiSelectOn !== 'undefined') {
            this.multiSelectOverride = (this.gridOptions.multiSelectOn === true);
            this.multiSelect = this.multiSelectOverride;
        }

        this.getRowData();
        this.gridReady.emit(this);
    }

    private getRowData() {
        this.gridOptions.getRowData(this.rowDataRequest).subscribe((rowData) => {
            if (this.rowDataRequest.pagination.perPage && rowData.rows.length > this.rowDataRequest.pagination.perPage) {
                const page = this.rowDataRequest.pagination.page;
                const perPage = this.rowDataRequest.pagination.perPage;
                const start = (page - 1) * perPage;
                const end = page * perPage;
                rowData.rows = rowData.rows.slice(start, end);
            }
            this.rowData = rowData.rows;
            this.rowDataRequest.pagination.totalRows = rowData.totalRows;
        });
    }

    public firstPage() {
        this.pagination.setPage(1);
    }

    public setPage(pageChangedEvent: PageChangedEvent) {
        this.rowDataRequest.pagination.page = pageChangedEvent.page;
        this.rowDataRequest.pagination.perPage = pageChangedEvent.perPage;
        this.rowDataRequest.params = this.rowDataRequest.params.set('_page', this.rowDataRequest.pagination.page.toString());
        this.rowDataRequest.params = this.rowDataRequest.params.set('_limit', this.rowDataRequest.pagination.perPage.toString());
        this.getRowData();
    }

    public applyFilters() {
        if (this.rowDataRequest.filters) {
            if (typeof this.rowDataRequest.filters[0] !== 'undefined') {
                this.rowDataRequest.params = this.rowDataRequest.params.set('q', this.rowDataRequest.filters[0].q.toString());
            }
        }
    }

    public applySorting() {
        const sortArr = [];
        const orderArr = [];
        for (const field in this.rowDataRequest.sorting) {
            if (this.rowDataRequest.sorting.hasOwnProperty(field)) {
                if (this.rowDataRequest.sorting[field]) {
                    sortArr.push(field);
                    orderArr.push(this.rowDataRequest.sorting[field]);
                }
            }
        }
        const sortStr = sortArr.join(',');
        const orderStr = orderArr.join(',');

        if (sortStr && orderStr) {
            this.rowDataRequest.params = this.rowDataRequest.params.set('_sort', sortStr);
            this.rowDataRequest.params = this.rowDataRequest.params.set('_order', orderStr);
        }
    }

    @HostListener('window:keyup', ['$event'])
    keyUpEvent(event: KeyboardEvent) {
        if (event.key === 'Control' && !this.multiSelectOverride) {
            this.multiSelect = false;
        }
    }

    @HostListener('window:keydown', ['$event'])
    keyDownEvent(event: KeyboardEvent) {
        if (event.key === 'Control') {
            this.multiSelect = true;
        }
    }

    public selectRow(gridRow) {
        if (this.selectedRows.indexOf(gridRow) !== -1) {
            const rowIndex = this.selectedRows.indexOf(gridRow);
            this.selectedRows.splice(rowIndex, 1);
            this.deselect.emit(gridRow);
        } else {
            if (!this.multiSelect) {
                this.selectedRows = [];
            }
            this.selectedRows.push(gridRow);
            this.select.emit(gridRow);
        }
    }

    public isSelected(gridRow) {
        return (this.selectedRows.indexOf(gridRow) !== -1);
    }

    public getSelectedRows() {
        return this.selectedRows;
    }

    public refresh() {
        this.selectedRows = [];
        this.applyFilters();
        this.applySorting();
        this.getRowData();
    }

    public getField(gridRow, fieldName: string, fieldFn: any) {
        let value = '';
        if (typeof fieldFn !== 'undefined' && typeof fieldFn === 'function') {
            value = fieldFn(gridRow);
        } else {
            const fieldParts = fieldName.split('.');
            value = gridRow;
            for (let i = 0; i < fieldParts.length; i++) {
                if (typeof value[fieldParts[i]] !== 'undefined' && value[fieldParts[i]] !== null) {
                    value = value[fieldParts[i]];
                } else {
                    value = '';
                }
            }
        }

        return value;
    }

    public getRowStyle(gridRow) {
        if (typeof this.gridOptions.getRowStyles !== 'undefined') {
            return this.gridOptions.getRowStyles(gridRow);
        } else {
            return {};
        }
    }

    public getCellStyle(columnValue, columnDef) {
        if (typeof this.gridOptions.getCellStyles !== 'undefined') {
            return this.gridOptions.getCellStyles(columnValue, columnDef);
        } else {
            return {};
        }
    }

    public sort(event, columnDef: TableGridColumn) {
        event.preventDefault();
        if (this.rowDataRequest.sorting[columnDef.fieldName] === '') {
            this.rowDataRequest.sorting[columnDef.fieldName] = 'DESC';
        } else if (this.rowDataRequest.sorting[columnDef.fieldName] === 'ASC') {
            this.rowDataRequest.sorting[columnDef.fieldName] = '';
        } else {
            this.rowDataRequest.sorting[columnDef.fieldName] = 'ASC';
        }
        this.refresh();
        console.log(this.rowDataRequest.sorting);
    }

    public getColumnSorting(columnDef: TableGridColumn) {
        if (typeof this.rowDataRequest.sorting[columnDef.fieldName] === 'undefined') {
            this.rowDataRequest.sorting[columnDef.fieldName] = '';
        }

        return this.rowDataRequest.sorting[columnDef.fieldName];
    }

    public getColumnSortingIcon(columnDef: TableGridColumn) {
        const direction = this.getColumnSorting(columnDef);
        if (direction) {
            return (direction === 'DESC') ? '&#9660;' : '&#9650;';
        }
        return '&#x21D5;';
    }

    public toggleSettings() {
        this.showSettings = !this.showSettings;
    }

    trackByFn(index, item) {
        return index;
    }
}
