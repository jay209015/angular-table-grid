import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableGridCustomCellExampleComponent } from './table-grid-custom-cell-example.component';

describe('TableGridCustomCellExampleComponent', () => {
  let component: TableGridCustomCellExampleComponent;
  let fixture: ComponentFixture<TableGridCustomCellExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableGridCustomCellExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableGridCustomCellExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
