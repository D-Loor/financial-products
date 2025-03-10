import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditProductComponent } from './edit-product.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ToastService } from 'ui-kit';
import { ProductDataService } from '../../services/utils/product-data.service';
import { EditProductService } from '../../services/edit-product.service';
import { IProduct } from '../../models/product.model';
import { IProductEditResponse } from '../../models/product-edit-response.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EditProductComponent', () => {
  let component: EditProductComponent;
  let fixture: ComponentFixture<EditProductComponent>;
  let mockToastService: jasmine.SpyObj<ToastService>;
  let mockProductDataService: jasmine.SpyObj<ProductDataService>;
  let mockEditProductService: jasmine.SpyObj<EditProductService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockToastService = jasmine.createSpyObj('ToastService', ['emitToast']);
    mockProductDataService = jasmine.createSpyObj('ProductDataService', ['getData']);
    mockEditProductService = jasmine.createSpyObj('EditProductService', ['edit']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [EditProductComponent, HttpClientTestingModule],
      providers: [
        { provide: ToastService, useValue: mockToastService },
        { provide: ProductDataService, useValue: mockProductDataService },
        { provide: EditProductService, useValue: mockEditProductService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: { params: of({}) } }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditProductComponent);
    component = fixture.componentInstance;
  });

  it('should emit error toast and navigate if no product data is available', () => {
    mockProductDataService.getData.and.returnValue(null);

    fixture.detectChanges();

    expect(mockToastService.emitToast).toHaveBeenCalledWith(
      'Error',
      'No hay un producto por editar!',
      'error',
      true
    );
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/products/list']);
  });

  it('should call editProduct and update the product when the response is successful', () => {
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
      message: 'Product updated successfully' 
    };
    mockEditProductService.edit.and.returnValue(of(mockResponse));
    mockProductDataService.getData.and.returnValue(mockProduct);

    fixture.detectChanges();

    component.editProduct(mockProduct);

    expect(mockEditProductService.edit).toHaveBeenCalledWith(mockProduct);

    expect(mockToastService.emitToast).toHaveBeenCalledWith(
      'Success',
      'Producto actualizado con éxito!',
      'success',
      true
    );

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/products/list']);
  });
});
