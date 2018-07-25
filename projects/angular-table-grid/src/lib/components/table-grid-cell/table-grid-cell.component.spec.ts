import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableGridCellComponent } from './table-grid-cell.component';

describe('TableGridCellComponent', () => {
  let component: TableGridCellComponent;
  let fixture: ComponentFixture<TableGridCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableGridCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableGridCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
