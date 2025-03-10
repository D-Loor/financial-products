import { Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, CardComponent, IButton, ICard, InputComponent, ToastService } from 'ui-kit';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { FormProductComponent } from "../../components/form-product/form-product.component";
import { AddProductService } from '../../services/add-product.service';
import { IProduct } from '../../models/product.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'lib-add-product',
  standalone: true,
  imports: [CommonModule, CardComponent, FormProductComponent],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnDestroy {
  private toastService = inject(ToastService);
  private _addProductService = inject(AddProductService);
  private destroy$ = new Subject<void>();
  resetForm: boolean = false;

  cardData: ICard = {
    header: 'Formulario de Registro'
  };

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addProduct(product: IProduct): void {
    this.resetForm = false;
    this._addProductService.add(product).pipe(takeUntil(this.destroy$)).subscribe((response) => {
      if("Product added successfully" === response.message) {
        this.toastService.emitToast("Success", "Producto agregado con éxito!", "success", true);
        this.resetForm = true;
      }
    });
  }

}