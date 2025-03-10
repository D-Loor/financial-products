import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICard, ToastService, CardComponent } from 'ui-kit';
import { FormProductComponent } from "../../components/form-product/form-product.component";
import { Subject, takeUntil } from 'rxjs';
import { EditProductService } from '../../services/edit-product.service';
import { IProduct } from '../../models/product.model';
import { ProductDataService } from '../../services/utils/product-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-edit-product',
  standalone: true,
  imports: [CommonModule, CardComponent, FormProductComponent],
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnDestroy, OnInit {
  private toastService = inject(ToastService);
  private router = inject(Router);
  private productDataService = inject(ProductDataService);
  private _editProductService = inject(EditProductService);
  private destroy$ = new Subject<void>();
  productEdit: IProduct;
  resetForm: boolean = false;

  cardData: ICard = {
    header: 'Formulario de Actualización'
  };

  ngOnInit(): void {
    this.productEdit = this.productDataService.getData();
    if(!this.productEdit) {
      this.toastService.emitToast("Error", "No hay un producto por editar!", "error", true);
      this.router.navigate(['/products/list']);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  editProduct(product: IProduct): void {
    this._editProductService.edit(product).pipe(takeUntil(this.destroy$)).subscribe((response) => {
      if("Product updated successfully" === response.message) {
        this.toastService.emitToast("Success", "Producto actualizado con éxito!", "success", true);
        this.router.navigate(['/products/list']);
      }
    });
  }

}
