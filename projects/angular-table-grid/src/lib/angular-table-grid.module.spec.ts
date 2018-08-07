import { AngularTableGridModule } from './angular-table-grid.module';

describe('AngularTableGridModule', () => {
  let angularTableGridModule: AngularTableGridModule;

  beforeEach(() => {
    angularTableGridModule = new AngularTableGridModule();
  });

  it('should create an instance', () => {
    expect(angularTableGridModule).toBeTruthy();
  });
});
