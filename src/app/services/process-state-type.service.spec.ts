import { TestBed } from '@angular/core/testing';

import { ProcessStateTypeService } from './process-state-type.service';

describe('ProcessStateTypeService', () => {
  let service: ProcessStateTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessStateTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
