import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DeleteProductService } from './delete-product.service';
import { IProductDeleteResponse } from '../models/product-delete-response.model';
import { environment } from '../enviroments/environment';

describe('DeleteProductService', () => {
  let service: DeleteProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DeleteProductService],
    });

    service = TestBed.inject(DeleteProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a DELETE request to delete a product', () => {
    const productId = '123';
    const mockResponse: IProductDeleteResponse = { 
       message: 'Product deleted' 
      };

    service.delete(productId).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(environment.apiUrl + '/products/' + productId);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });

});
