import { TestBed } from '@angular/core/testing';

import { ConsumerTokenService } from './consumer-token.service';

describe('ConsumerTokenService', () => {
  let service: ConsumerTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsumerTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
