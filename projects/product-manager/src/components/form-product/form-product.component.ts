import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { ButtonComponent, IButton, InputComponent, ToastService } from 'ui-kit';
import { IProduct } from '../../models/product.model';
import { VerificationProductService } from '../../services/verification-product.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-product',
  standalone: true,
  imports: [CommonModule, InputComponent, ButtonComponent, FormsModule, ReactiveFormsModule],
  providers: [DatePipe],
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit, OnChanges, OnDestroy {
  @Input() resetForm: boolean = false;
  @Input() productEdit: IProduct;
  @Output() submitForm: EventEmitter<IProduct> = new EventEmitter<IProduct>();
  private toastService = inject(ToastService);
  private router = inject(Router);
  private datePipe = inject(DatePipe);
  private _verificationProductService = inject(VerificationProductService);
  private destroy$ = new Subject<void>();


  leftButtonForm: IButton = {
    class: 'secondary',
    label: 'Reiniciar',
    disabled: false
  };

  rigthButtonForm: IButton = {
    class: 'primary',
    label: 'Enviar',
    disabled: false
  };

  ngOnInit(): void {
    if(this.productEdit) {
      this.form.patchValue(this.productEdit);
      this.form.get('id')?.disable();
      this.leftButtonForm.label = "Cancelar";
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['resetForm']) {
      this.form.reset();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  dateValidator: ValidatorFn = (control: FormControl) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    const inputDate = new Date(control.value);
    inputDate.setHours(0, 0, 0, 0);
    inputDate.setDate(inputDate.getDate() + 1);

    return inputDate >= today ? null : { invalidDate: true };
  };

  form: FormGroup = new FormGroup({
    id: new FormControl('', [Validators.minLength(3), Validators.maxLength(10), Validators.required]),
    name: new FormControl('', [Validators.minLength(5), Validators.maxLength(100), Validators.required]),
    description: new FormControl('', [Validators.minLength(10), Validators.maxLength(200), Validators.required]),
    logo: new FormControl('', [Validators.required]),
    date_release: new FormControl('', [Validators.required, this.dateValidator]),
    date_revision: new FormControl({ value: '', disabled: true }, [Validators.required]),
  });
  
  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      let data: IProduct = this.form.getRawValue();
      this.submitForm.emit(data);
    } else {
      this.toastService.emitToast("Error", "Inconsistencia en los campos", "error", true);
    }
  }

  onReset(): void {
    this.form.reset();
  }

  onCancel(): void {
    this.router.navigate(['/products/list']);
  }

  loadDateRevision($event): void {
    if ($event) {
      const newDate = new Date($event);
      newDate.setFullYear(newDate.getFullYear() + 1);
      const formattedDate = this.datePipe.transform(newDate, 'yyyy-MM-dd');
      this.form.get('date_revision')?.setValue(formattedDate);
    }
  }

  verificationProduct($event: string): void {
    this._verificationProductService.verification($event).pipe(takeUntil(this.destroy$)).subscribe((response) => {
      if(response) {
        this.toastService.emitToast("Error", "Este ID de Producto ya existe!", "error", true);
        this.form.get('id')?.setErrors({ invalid: true });
      }
    });
  }
}