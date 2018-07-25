import { TableGridModule } from './table-grid.module';

describe('TableGridModule', () => {
  let tableGridModule: TableGridModule;

  beforeEach(() => {
    tableGridModule = new TableGridModule();
  });

  it('should create an instance', () => {
    expect(tableGridModule).toBeTruthy();
  });
});
