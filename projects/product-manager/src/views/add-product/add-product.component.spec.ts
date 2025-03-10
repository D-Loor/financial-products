import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddProductComponent } from './add-product.component';;
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CardComponent, ToastService } from 'ui-kit';
import { AddProductService } from '../../services/add-product.service';
import { FormProductComponent } from '../../components/form-product/form-product.component';
import { IProduct } from '../../models/product.model';
import { IProductAddResponse } from '../../models/product-add-response.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';

describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;
  let mockToastService: jasmine.SpyObj<ToastService>;
  let mockAddProductService: jasmine.SpyObj<AddProductService>;

  beforeEach(async () => {
    mockToastService = jasmine.createSpyObj('ToastService', ['emitToast']);
    mockAddProductService = jasmine.createSpyObj('AddProductService', ['add']);

    await TestBed.configureTestingModule({
      imports: [CommonModule, CardComponent, FormProductComponent, AddProductComponent, HttpClientTestingModule],
      providers: [
        { provide: ToastService, useValue: mockToastService },
        { provide: AddProductService, useValue: mockAddProductService },
        { provide: ActivatedRoute, useValue: { params: of({}) } }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call addProduct and emit success toast when product is added successfully', () => {
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
      message: 'Product added successfully' 
    };

    mockAddProductService.add.and.returnValue(of(mockResponse));

    component.addProduct(mockProduct);

    expect(mockAddProductService.add).toHaveBeenCalledWith(mockProduct);
    expect(mockToastService.emitToast).toHaveBeenCalledWith(
      'Success',
      'Producto agregado con éxito!',
      'success',
      true
    );
    expect(component.resetForm).toBeTrue();
  });

  it('should not emit success toast if response message is not "Product added successfully"', () => {
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

    mockAddProductService.add.and.returnValue(of(mockResponse));

    component.addProduct(mockProduct);

    expect(mockAddProductService.add).toHaveBeenCalledWith(mockProduct);
    expect(mockToastService.emitToast).not.toHaveBeenCalled();
    expect(component.resetForm).toBeFalse();
  });
  
  it('should call ngOnDestroy and complete destroy$ when component is destroyed', () => {
    spyOn(component['destroy$'], 'next');
    spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(component['destroy$'].next).toHaveBeenCalled();
    expect(component['destroy$'].complete).toHaveBeenCalled();
  });

});