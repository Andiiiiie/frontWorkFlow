import { TestBed } from '@angular/core/testing';

import { ResultTypeService } from './result-type.service';

describe('ResultTypeService', () => {
  let service: ResultTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResultTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
