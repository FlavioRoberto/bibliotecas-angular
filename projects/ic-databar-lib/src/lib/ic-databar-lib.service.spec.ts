import { TestBed } from '@angular/core/testing';

import { IcDatabarLibService } from './ic-databar-lib.service';

describe('IcDatabarLibService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IcDatabarLibService = TestBed.get(IcDatabarLibService);
    expect(service).toBeTruthy();
  });
});
