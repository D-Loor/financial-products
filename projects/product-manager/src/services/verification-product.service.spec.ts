import { TestBed } from '@angular/core/testing';

import { VerificationProductService } from './verification-product.service';

describe('VerificationProductService', () => {
  let service: VerificationProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerificationProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
