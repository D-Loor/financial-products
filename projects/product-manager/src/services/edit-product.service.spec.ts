import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EditProductService } from './edit-product.service';
import { environment } from '../enviroments/environment';
import { IProduct } from '../models/product.model';
import { IProductEditResponse } from '../models/product-edit-response.model';

describe('EditProductService', () => {
  let service: EditProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EditProductService],
    });
    service = TestBed.inject(EditProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a PUT request to edit a product', () => {
    const mockProduct: IProduct = { 
      id: 'uno', 
      name: 'Tarjeta', 
      description: 'Descripción Producto',
      logo: 'logo.jpeg',
      date_release: '2021-01-01',
      date_revision: '2021-02-01'
    };
    const mockResponse: IProductEditResponse = { 
      data: [mockProduct], 
      message: 'Product updated' 
    };

    service.edit(mockProduct).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(environment.apiUrl + '/products/' + mockProduct.id);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockProduct);
    req.flush(mockResponse);
  });

});
