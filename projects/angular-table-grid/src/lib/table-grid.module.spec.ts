import { AngularTableGridModule } from './angular-table-grid.module';

describe('TableGridModule', () => {
  let tableGridModule: AngularTableGridModule;

  beforeEach(() => {
    tableGridModule = new AngularTableGridModule();
  });

  it('should create an instance', () => {
    expect(tableGridModule).toBeTruthy();
  });
});
