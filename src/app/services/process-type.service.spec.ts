import { TestBed } from '@angular/core/testing';

import { ProcessTypeService } from './process-type.service';

describe('ProcessTypeService', () => {
  let service: ProcessTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
