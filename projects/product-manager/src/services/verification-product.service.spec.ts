import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { VerificationProductService } from './verification-product.service';
import { environment } from '../enviroments/environment';

describe('VerificationProductService', () => {
  let service: VerificationProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VerificationProductService],
    });

    service = TestBed.inject(VerificationProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a GET request to verify a product', () => {
    const productId = '123';
    const mockResponse = true;

    service.verification(productId).subscribe((response) => {
      expect(response).toBe(mockResponse);
    });

    const req = httpMock.expectOne(environment.apiUrl + '/products/verification/' + productId);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

});
