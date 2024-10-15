import { TestBed } from '@angular/core/testing';

import { ProcessTypeVersionService } from './process-type-version.service';

describe('ProcessTypeVersionService', () => {
  let service: ProcessTypeVersionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessTypeVersionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
