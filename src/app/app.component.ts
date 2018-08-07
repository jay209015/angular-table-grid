import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TableGridOptions} from '../../projects/angular-table-grid/src/lib/interfaces/table-grid-options';
import {TableGridRowDataResponse} from '../../projects/angular-table-grid/src/lib/interfaces/table-grid-row-data-response';
import {TableGridRowDataRequest} from '../../projects/angular-table-grid/src/lib/interfaces/table-grid-row-data-request';
import {map} from 'rxjs/internal/operators';
import {createElementCssSelector} from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  gridOptions: TableGridOptions;

  constructor(http: HttpClient) {
    this.gridOptions = {
      enableDetails: true,
      getDetails: (node: any) => {
        return (typeof node.body !== 'undefined') ? node.body : false;
      },
      columns: [
        {
          headerTitle: 'ID',
          fieldName: 'id'
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
      getRowStyles: (node) => {
        return {'border-left': '2px solid red'};
      },
      perPage: 5
    };
  }
}
