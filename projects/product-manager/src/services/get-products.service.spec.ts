import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GetProductsService } from './get-products.service';
import { IProductGetResponse } from '../models/product-get-response.model';
import { environment } from '../enviroments/environment';

describe('GetProductsService', () => {
  let service: GetProductsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GetProductsService],
    });

    service = TestBed.inject(GetProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a GET request to get products', () => {
    const mockResponse: IProductGetResponse = { 
      data: [{ 
        id: 'uno', 
        name: 'Tarjeta', 
        description: 'Descripción Producto',
        logo: 'logo.jpeg',
        date_release: '2021-01-01',
        date_revision: '2021-02-01'
      }] 
    };

    service.get().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(environment.apiUrl + '/products');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

});
