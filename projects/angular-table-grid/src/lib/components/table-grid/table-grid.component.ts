import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TableGridOptions} from '../../interfaces/table-grid-options';
import {TableGridRowDataRequest} from '../../interfaces/table-grid-row-data-request';
import {HttpParams} from '@angular/common/http';

@Component({
    selector: 'lib-table-grid',
    templateUrl: './table-grid.component.html',
    styleUrls: ['./table-grid.component.css']
})
export class TableGridComponent implements OnInit {
    @Input() gridOptions: TableGridOptions;
    @Output() gridReady = new EventEmitter<TableGridComponent>();
    public rowData: any[] = [];
    public rowDataRequest: TableGridRowDataRequest;

  constructor() {}

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

    public setPage(pageNum) {
        this.rowDataRequest.pagination.page = pageNum;
        this.rowDataRequest.params = this.rowDataRequest.params.set('_page', this.rowDataRequest.pagination.page.toString());
        this.getRowData();
    }

    public applyFilters() {
        if (this.rowDataRequest.filters) {
            console.log(this.rowDataRequest);
            this.rowDataRequest.params = this.rowDataRequest.params.set('q', this.rowDataRequest.filters[0].q.toString());
        }
    }

    public refresh() {
        this.applyFilters();
        this.getRowData();
    }
}
