import { TestBed } from '@angular/core/testing';

import { FishnamelistService } from './fishnamelist.service';

describe('FishnamelistService', () => {
  let service: FishnamelistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FishnamelistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
