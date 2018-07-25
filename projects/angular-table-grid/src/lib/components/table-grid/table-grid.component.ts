import {Component, ComponentFactoryResolver, Input, OnInit, ViewContainerRef} from '@angular/core';
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
  public rowData: any[] = [];
  public rowDataRequest: TableGridRowDataRequest;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private viewContainerRef: ViewContainerRef) {
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
  }

  private getRowData() {
    this.gridOptions.getRowData(this.rowDataRequest).subscribe((rowData) => {
      if (rowDataRequest.pagination.perPage && rowData.rows.length > rowDataRequest.pagination.perPage) {
        const page = rowDataRequest.pagination.page;
        const perPage = rowDataRequest.pagination.perPage;
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
}
