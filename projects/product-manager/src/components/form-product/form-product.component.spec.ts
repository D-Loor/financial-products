import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProductComponent } from './form-product.component';
import { ToastService } from 'ui-kit';
import { ActivatedRoute, Router } from '@angular/router';
import { VerificationProductService } from '../../services/verification-product.service';
import { of, Subject } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { IProduct } from '../../models/product.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FormProductComponent', () => {
  let component: FormProductComponent;
  let fixture: ComponentFixture<FormProductComponent>;
  let toastService: ToastService;
  let router: Router;
  let verificationProductService: VerificationProductService;
  let destroy$: Subject<void>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, FormProductComponent, HttpClientTestingModule],
      providers: [
        ToastService,
        Router,
        VerificationProductService,
        DatePipe,
        { provide: ActivatedRoute, useValue: { params: of({}) } }
      ]
    }).compileComponents();

    toastService = TestBed.inject(ToastService);
    router = TestBed.inject(Router);
    verificationProductService = TestBed.inject(VerificationProductService);
    destroy$ = new Subject<void>();

    fixture = TestBed.createComponent(FormProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    destroy$.next();
    destroy$.complete();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });


  it('should reset the form when resetForm input changes', () => {
    component.resetForm = true;
    component.ngOnChanges({
      resetForm: { 
        currentValue: true, 
        previousValue: false, 
        firstChange: false, 
        isFirstChange: () => false
      }
    });
    expect(component.form.pristine).toBeTrue();
  });

  it('should call toastService and emit error if form is invalid on submit', () => {
    spyOn(toastService, 'emitToast');
    component.form.setValue({ id: '', name: '', description: '', logo: '', date_release: '', date_revision: '' });
    component.onSubmit();
    expect(toastService.emitToast).toHaveBeenCalledWith('Error', 'Inconsistencia en los campos', 'error', true);
  });

  it('should call verificationProduct and show error if product already exists', () => {
    const productId = '123';
    spyOn(verificationProductService, 'verification').and.returnValue(of(true));
    spyOn(toastService, 'emitToast');
    component.verificationProduct(productId);
    expect(verificationProductService.verification).toHaveBeenCalledWith(productId);
    expect(toastService.emitToast).toHaveBeenCalledWith('Error', 'Este ID de Producto ya existe!', 'error', true);
    expect(component.form.get('id')?.hasError('invalid')).toBeTrue();
  });

  it('should navigate to the product list on cancel', () => {
    spyOn(router, 'navigate');
    component.onCancel();
    expect(router.navigate).toHaveBeenCalledWith(['/products/list']);
  });

  it('should load and format the date revision when a new release date is selected', () => {
    const newDate = '2023-01-01';
    const expectedDate = '2024-01-01';
    spyOn(component.datePipe, 'transform').and.returnValue(expectedDate);
    component.loadDateRevision(newDate);
    expect(component.form.get('date_revision')?.value).toBe(expectedDate);
  });

  it('should reset form on reset button click', () => {
    spyOn(component, 'onReset');
    component.onReset();
    expect(component.form.pristine).toBeTrue();
  });

  it('should reset form', () => {
    component.onReset();
    expect(component.form.pristine).toBeTrue();
  });

});