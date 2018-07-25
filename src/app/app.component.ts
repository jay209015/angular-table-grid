import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TableGridOptions} from 'angular-table-grid';
import {TableGridRowDataResponse} from 'angular-table-grid';
import {TableGridRowDataRequest} from 'angular-table-grid';
import {map} from 'rxjs/internal/operators';

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
      perPage: 5
    };
  }
}
