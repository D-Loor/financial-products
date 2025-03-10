import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListProductsComponent } from './list-products.component';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { DialogComponent, DialogService, IDialog, ToastService } from 'ui-kit';
import { ProductDataService } from '../../services/utils/product-data.service';
import { GetProductsService } from '../../services/get-products.service';
import { DeleteProductService } from '../../services/delete-product.service';
import { IProductGetResponse } from '../../models/product-get-response.model';
import { IProduct } from '../../models/product.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ListProductsComponent', () => {
  let component: ListProductsComponent;
  let fixture: ComponentFixture<ListProductsComponent>;
  let mockToastService: jasmine.SpyObj<ToastService>;
  let mockProductDataService: jasmine.SpyObj<ProductDataService>;
  let mockGetProductsService: jasmine.SpyObj<GetProductsService>;
  let mockDeleteProductService: jasmine.SpyObj<DeleteProductService>;
  let mockDialogService: jasmine.SpyObj<DialogService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockToastService = jasmine.createSpyObj('ToastService', ['emitToast']);
    mockProductDataService = jasmine.createSpyObj('ProductDataService', ['sendData']);
    mockGetProductsService = jasmine.createSpyObj('GetProductsService', ['get']);
    mockDeleteProductService = jasmine.createSpyObj('DeleteProductService', ['delete']);
    mockDialogService = jasmine.createSpyObj('DialogService', ['emitDialog'], {
      $dialogData: new BehaviorSubject<IDialog>(null) 
    });
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [ListProductsComponent, HttpClientTestingModule],
      providers: [
        { provide: ToastService, useValue: mockToastService },
        { provide: ProductDataService, useValue: mockProductDataService },
        { provide: GetProductsService, useValue: mockGetProductsService },
        { provide: DeleteProductService, useValue: mockDeleteProductService },
        { provide: DialogService, useValue: mockDialogService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: { params: of({}) } }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListProductsComponent);
    component = fixture.componentInstance;
  });

  it('should get products on ngOnInit', () => {
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
    mockGetProductsService.get.and.returnValue(of(mockResponse));

    fixture.detectChanges();

    expect(mockGetProductsService.get).toHaveBeenCalled();
    expect(component.tableBody).toEqual(mockResponse.data);
  });

  it('should show a success toast and update the list when product is deleted', () => {
    const mockProduct: IProduct = { 
      id: 'uno', 
      name: 'Tarjeta', 
      description: 'Descripción Producto',
      logo: 'logo.jpeg',
      date_release: '2021-01-01',
      date_revision: '2021-02-01'
    };
    const mockDeleteResponse = { message: 'Product removed successfully' };
    mockDeleteProductService.delete.and.returnValue(of(mockDeleteResponse));
    mockToastService.emitToast.and.stub();
    mockGetProductsService.get.and.returnValue(of({ data: [] }));

    component.productSelected = mockProduct;
    component.onClickConfirmDialog();

    expect(mockDeleteProductService.delete).toHaveBeenCalledWith(mockProduct.id);
    expect(mockToastService.emitToast).toHaveBeenCalledWith('Success', 'Producto eliminado con éxito!', 'success', true);
    expect(mockGetProductsService.get).toHaveBeenCalled();
  });

  it('should navigate to add product page when "Agregar" button is clicked', () => {
    component.addButtonClick();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/products/add']);
  });

  it('should navigate to edit product page and send product data when "edit" option is clicked', () => {
    const mockProduct: IProduct = { 
      id: 'uno', 
      name: 'Tarjeta', 
      description: 'Descripción Producto',
      logo: 'logo.jpeg',
      date_release: '2021-01-01',
      date_revision: '2021-02-01'
    };
    const event = { option: 'edit', item: mockProduct };

    component.optionClicked(event);

    expect(mockProductDataService.sendData).toHaveBeenCalledWith(mockProduct);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/products/edit']);
  });

  it('should show a dialog when "delete" option is clicked', () => {
    const mockProduct: IProduct = { 
      id: 'uno', 
      name: 'Tarjeta', 
      description: 'Descripción Producto',
      logo: 'logo.jpeg',
      date_release: '2021-01-01',
      date_revision: '2021-02-01'
    };    
    const event = { option: 'delete', item: mockProduct };

    component.optionClicked(event);

    expect(component.presentDialog).toBeTrue();
    expect(mockDialogService.emitDialog).toHaveBeenCalledWith({
      description: '¿Estás seguro de eliminar el producto Tarjeta?',
      labelButtonLeft: 'Cancelar',
      labelButtonRight: 'Confirmar'
    });
  });

  it('should hide the dialog when onClickCancelDialog is called', () => {
    component.presentDialog = true;
    
    component.onClickCancelDialog();

    expect(component.presentDialog).toBe(false);
  });

});