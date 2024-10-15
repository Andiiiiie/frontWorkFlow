import { TestBed } from '@angular/core/testing';

import { ExceptionResultService } from './exception-result.service';

describe('ExceptionResultService', () => {
  let service: ExceptionResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExceptionResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
