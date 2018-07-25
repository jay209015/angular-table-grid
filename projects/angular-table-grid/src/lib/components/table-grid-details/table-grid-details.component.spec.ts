import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableGridDetailsComponent } from './table-grid-details.component';

describe('TableGridDetailsComponent', () => {
  let component: TableGridDetailsComponent;
  let fixture: ComponentFixture<TableGridDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableGridDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableGridDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
