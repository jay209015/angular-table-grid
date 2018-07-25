import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableGridRowComponent } from './table-grid-row.component';

describe('TableGridRowComponent', () => {
  let component: TableGridRowComponent;
  let fixture: ComponentFixture<TableGridRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableGridRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableGridRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
