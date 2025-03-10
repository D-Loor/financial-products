import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AddProductService } from './add-product.service';
import { IProduct } from '../models/product.model';
import { IProductAddResponse } from '../models/product-add-response.model';
import { environment } from '../enviroments/environment';

describe('AddProductService', () => {
  let service: AddProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AddProductService],
    });
    service = TestBed.inject(AddProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to add a product', () => {
    const mockProduct: IProduct = { 
      id: 'uno', 
      name: 'Tarjeta', 
      description: 'Descripción Producto',
      logo: 'logo.jpeg',
      date_release: '2021-01-01',
      date_revision: '2021-02-01'
    };
    const mockResponse: IProductAddResponse = { 
      data: [mockProduct], 
      message: 'Product added' 
    };

    service.add(mockProduct).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(environment.apiUrl + '/products');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockProduct);
    req.flush(mockResponse);
  });

});
