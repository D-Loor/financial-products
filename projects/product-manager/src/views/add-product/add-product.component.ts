import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CardComponent, ICard, ToastService } from 'ui-kit';
import { FormProductComponent } from "../../components/form-product/form-product.component";
import { IProduct } from '../../models/product.model';
import { AddProductService } from '../../services/add-product.service';

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