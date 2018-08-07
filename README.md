# Angular Table Grid

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Usage:

`npm install angular-table-grid`

``` typescript
import {AngularTableGridModule} from 'angular-table-grid';

@NgModule({
  declarations: [...],
  imports: [
    ...
    AngularTableGridModule,
    ...
  ],
  providers: [],
  entryComponents: [...],
  bootstrap: [...]
})
export class AppModule { }

```

`<lib-table-grid [gridOptions]="gridOptions"></lib-table-grid>`

## Example

``` Javascript
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
```

`<lib-table-grid [gridOptions]="gridOptions"></lib-table-grid>`

## Grid Options

*columns*: TableGridColumn[];
```text
This is used to define your tables columns and where to get the field values
```

*getRowData*: (rowDataRequest: TableGridRowDataRequest) => Observable<any>;
```text
This is used to tell the module where to get rowData from
```
*enableDetails* (optional): boolean;
```text
This is used to enable the details row.
(an expandable row that shows more details about the selected row)
```

*getDetails* (optional): (node: object) => any ;
```text
This is used to tell the module where to get the row details from
```

*detailComponent* (optional): Type<TableGridDetails>;
```text
This is used to define your own custom component to control the details row rendering
```

*totalRows* (optional): number;
```text
Deprecated and soon to be removed
```

*perPage* (optional): number;
```text
This is used to define how many rows to show per page. 
This will also enable pagination
```

*page* (optoinal): number;
```text
This is used to define the initial page to start on
```


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
