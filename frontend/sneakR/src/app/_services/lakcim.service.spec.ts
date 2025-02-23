import { TestBed } from '@angular/core/testing';

import { LakcimService } from './lakcim.service';

describe('LakcimService', () => {
  let service: LakcimService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LakcimService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
