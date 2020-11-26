import { TestBed } from '@angular/core/testing';

import { DivDistUpaListService } from './div-dist-upa-list.service';

describe('DivDistUpaListService', () => {
  let service: DivDistUpaListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DivDistUpaListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
