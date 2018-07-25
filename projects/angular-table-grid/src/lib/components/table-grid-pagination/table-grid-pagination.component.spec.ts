import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableGridPaginationComponent } from './table-grid-pagination.component';

describe('TableGridPaginationComponent', () => {
  let component: TableGridPaginationComponent;
  let fixture: ComponentFixture<TableGridPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableGridPaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableGridPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
