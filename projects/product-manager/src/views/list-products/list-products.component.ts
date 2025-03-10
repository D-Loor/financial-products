import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, CardComponent, DialogComponent, DialogService, IButton, ICard, IDialog, IInput, InputComponent, ITableHeader, TableComponent, ToastService } from 'ui-kit';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GetProductsService } from '../../services/get-products.service';
import { IProductGetResponse } from '../../models/product-get-response.model';
import { IProduct } from '../../models/product.model';
import { DeleteProductService } from '../../services/delete-product.service';
import { Subject, takeUntil } from 'rxjs';
import { ProductDataService } from '../../services/utils/product-data.service';

@Component({
  selector: 'lib-list-products',
  standalone: true,
  imports: [CommonModule, TableComponent, InputComponent, ButtonComponent, CardComponent, DialogComponent],
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit, OnDestroy {
  cardData: ICard = {};
  searchFormGroup = new FormGroup({'search': new FormControl()});
  presentDialog: boolean = false;
  private router = inject(Router);
  private toastService = inject(ToastService);
  private dialogService = inject(DialogService);
  private productDataService = inject(ProductDataService);
  private _getProductService = inject(GetProductsService);
  private _deleteProductService = inject(DeleteProductService);
  private destroy$ = new Subject<void>();
  productSelected: IProduct;

  inputData: IInput = {
    id: "search",
    value: "",
    placeholder: "Search...",
    type: "text",
    formControlName: "search",
    required: false,
    disabled: false
  };

  buttonData: IButton = {
    customClass: "primary",
    label: "Agregar",
    disabled: false
  };
  
  tableHeader: ITableHeader[] = [
    {
      name: 'Logo',
      key: 'logo',
      type: 'image',
      class: 'text-center'
    },
    {
      name: 'Nombre del producto',
      key: 'name',
      type: 'text',
    },
    {
      name: 'Descripción',
      key: 'description',
      type: 'text',
      tooltip: 'Descripción del producto'
    },
    {
      name: 'Fecha de liberación',
      key: 'date_release',
      type: 'date',
      tooltip: 'Fecha de liberación del producto'
    },
    {
      name: 'Fecha de reestructuración',
      key: 'date_revision',
      type: 'date',
      tooltip: 'Fecha de reestructuración del producto'
    }
  ]

  tableBody: IProduct[] = [];

  ngOnInit(): void {
    this.getProducts();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getProducts():void {
    this._getProductService.get().pipe(takeUntil(this.destroy$)).subscribe((response: IProductGetResponse) => {
      this.tableBody = response.data;
    });
  }

  deleteProduct(productId: string): void {
    this._deleteProductService.delete(productId).pipe(takeUntil(this.destroy$)).subscribe((response) => {
      if("Product removed successfully" === response.message) {
        this.presentDialog = false;
        this.toastService.emitToast("Success", "Producto eliminado con éxito!", "success", true);
        this.getProducts();
      }
    });
  }

  addButtonClick(): void {
    this.router.navigate(['/products/add']);
  }

  optionClicked(event: any): void {
    this.productSelected = event.item as IProduct;

    switch(event.option) {
      case "edit":
        this.productDataService.sendData(this.productSelected);
        this.router.navigate(['/products/edit']);
        break;
      case "delete":
        this.showDialog(event.item);
        break;
    }
  }

  showDialog(data: any): void {
    this.presentDialog = true;
    let dialogData: IDialog = {
      description: "¿Estás seguro de eliminar el producto " + data.name + "?",
      labelButtonLeft: "Cancelar",
      labelButtonRight: "Confirmar"
    };
    this.dialogService.emitDialog(dialogData);
  }

  onClickCancelDialog(): void {
    this.presentDialog = false;
  }

  onClickConfirmDialog(): void {
    this.deleteProduct(this.productSelected.id);
  }

}