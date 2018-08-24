import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TableGridOptions} from '../../projects/angular-table-grid/src/lib/interfaces/table-grid-options';
import {TableGridRowDataResponse} from '../../projects/angular-table-grid/src/lib/interfaces/table-grid-row-data-response';
import {TableGridRowDataRequest} from '../../projects/angular-table-grid/src/lib/interfaces/table-grid-row-data-request';
import {map} from 'rxjs/internal/operators';
import {TableGridComponent} from 'angular-table-grid';
import {TableGridFilters} from '../../projects/angular-table-grid/src/public_api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    gridOptions: TableGridOptions;
    gridApi: TableGridComponent;
    query: string;

    constructor(http: HttpClient) {
        this.gridOptions = {
            enableDetails: true,
            getDetails: (node: any) => {
                return (typeof node.body !== 'undefined') ? node.body : false;
            },
            columns: [
                {
                    headerTitle: 'ID',
                    fieldName: 'id',
                    sortable: true
                },
                {
                    headerTitle: 'User ID',
                    fieldName: 'userId'
                },
                {
                    headerTitle: 'Title',
                    fieldName: 'title'
                }
            ],
            getRowData: (rowDataRequest: TableGridRowDataRequest) => {
                return http.get<any>('https://jsonplaceholder.typicode.com/posts', {
                    params: rowDataRequest.params
                }).pipe(
                    map((response) => {
                        return <TableGridRowDataResponse>{
                            rows: response,
                            totalRows: 100
                        };
                    })
                );
            },
            getCellStyles: (value, columnDef) => {
                if (columnDef.fieldName === 'id') {
                    const color = (value % 2 === 0) ? 'blue' : 'green';
                    return {'border-left': '5px solid ' + color};
                } else {
                    return {};
                }
            },
            perPage: 5
        };
    }

    gridReady(gridApi: TableGridComponent) {
        this.gridApi = gridApi;
    }

    refresh() {
        this.gridApi.refresh();
    }

    getSelectedRows() {
        console.log(this.gridApi.getSelectedRows());
    }

    search() {
        this.gridApi.rowDataRequest.filters[0] = <TableGridFilters> {
            q: this.query
        };
        this.gridApi.refresh();
    }
}
