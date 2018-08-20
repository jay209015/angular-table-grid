import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {TableGridOptions} from '../../interfaces/table-grid-options';
import {TableGridRowDataRequest} from '../../interfaces/table-grid-row-data-request';
import {HttpParams} from '@angular/common/http';
import {PageChangedEvent} from '../table-grid-pagination/table-grid-pagination.component';
import {Subscription} from 'rxjs';


@Component({
    selector: 'lib-table-grid',
    templateUrl: './table-grid.component.html',
    styleUrls: ['./table-grid.component.scss']
})
export class TableGridComponent implements OnInit {
    @Input() gridOptions: TableGridOptions;
    @Output() gridReady = new EventEmitter<TableGridComponent>();
    public rowData: any[] = [];
    public rowDataRequest: TableGridRowDataRequest;
    public selectedRows: any[] = [];
    private multiSelect = false;

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

        if (typeof this.gridOptions.perPage !== 'undefined') {
            this.rowDataRequest.pagination.perPage = this.gridOptions.perPage;
            this.rowDataRequest.params = this.rowDataRequest.params.set('_page', this.rowDataRequest.pagination.page.toString());
            this.rowDataRequest.params = this.rowDataRequest.params.set('_limit', this.rowDataRequest.pagination.perPage.toString());
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

    public setPage(pageChangedEvent: PageChangedEvent) {
        this.rowDataRequest.pagination.page = pageChangedEvent.page;
        this.rowDataRequest.pagination.perPage = pageChangedEvent.perPage;
        this.rowDataRequest.params = this.rowDataRequest.params.set('_page', this.rowDataRequest.pagination.page.toString());
        this.rowDataRequest.params = this.rowDataRequest.params.set('_limit', this.rowDataRequest.pagination.perPage.toString());
        this.getRowData();
    }

    public applyFilters() {
        if (this.rowDataRequest.filters) {
            console.log(this.rowDataRequest);
            this.rowDataRequest.params = this.rowDataRequest.params.set('q', this.rowDataRequest.filters[0].q.toString());
        }
    }

    @HostListener('window:keyup', ['$event'])
    keyUpEvent(event: KeyboardEvent) {
        if (event.key === 'Control') {
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
        } else {
            if (!this.multiSelect) {
                this.selectedRows = [];
            }
            this.selectedRows.push(gridRow);
        }
    }

    public isSelected(gridRow) {
        return (this.selectedRows.indexOf(gridRow) !== -1);
    }

    public getSelectedRows() {
        return this.selectedRows;
    }

    public refresh() {
        this.applyFilters();
        this.getRowData();
    }

    public getField(gridRow, fieldName: string) {
        const fieldParts = fieldName.split('.');
        let value = gridRow;
        for (let i = 0; i < fieldParts.length; i++) {
            if (typeof value[fieldParts[i]] !== 'undefined') {
                value = value[fieldParts[i]];
            } else {
                value = '';
            }
        }
        return value;
    }
}
