import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'lib-table-grid-pagination',
  templateUrl: './table-grid-pagination.component.html',
  styleUrls: ['./table-grid-pagination.component.css']
})
export class TableGridPaginationComponent implements OnInit {
  @Input() perPage: number;
  @Input() page: number;
  @Input() maxPages = 5;
  @Output() pageChanged = new EventEmitter<number>();
  public _totalRows = 0;
  public pages = [];

  constructor() {
  }

  ngOnInit() {
    this.getPages();
  }

  @Input()
  set totalRows(totalRows: number) {
    this._totalRows = totalRows
    this.getPages();
  }

  private getPages() {
    const lastPage = Math.ceil(this._totalRows / this.perPage);
    const pages = [];
    const firstPage = Math.max(1, (this.page) - Math.floor(this.maxPages / 2));
    for (let i = firstPage; i <= lastPage && pages.length < this.maxPages; i++) {
      pages.push(i);
    }
    this.pages = pages;
  }

  private pageExists(pageNum: number) {
    if (pageNum < 1) {
      return false;
    }

    if (pageNum > Math.ceil(this.totalRows / this.perPage)) {
      return false;
    }

    return true;
  }

  public setPage(pageNum: number) {
    if (!this.pageExists(pageNum)) {
      pageNum = 1;
    }

    this.page = pageNum;
    this.getPages();
    this.pageChanged.emit(this.page);
  }

  public nextPage() {
    let pageNum = this.page + 1;
    if (!this.pageExists(pageNum)) {
      pageNum = Math.ceil(this.totalRows / this.perPage);
    }
    this.setPage(pageNum);
  }

  public prevPage() {
    let pageNum = this.page - 1;
    if (!this.pageExists(pageNum)) {
      pageNum = 1;
    }
    this.setPage(pageNum);
  }

  public isLastPage() {
    return (this.page === Math.ceil(this._totalRows / this.perPage));
  }

  public isFirstPage() {
    return (this.page === 1);
  }
}
