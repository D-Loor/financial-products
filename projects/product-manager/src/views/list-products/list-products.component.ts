import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, CardComponent, IButton, ICard, IInput, InputComponent, ITableHeader, TableComponent } from 'ui-kit';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-list-products',
  standalone: true,
  imports: [CommonModule, TableComponent, InputComponent, ButtonComponent, CardComponent],
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent {
  cardData: ICard = {};
  searchFormGroup = new FormGroup({'search': new FormControl()});

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
    class: "primary",
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

  tableBody = [
    {
      id: "dos",
      name: "Nombre producto",
      description: "Descripción producto",
      logo: "assets-1.png",
      date_release: "2025-01-01",
      date_revision: "2025-01-01"
    },
    {
      id: "tres",
      name: "Nombre producto2",
      description: "Descripción producto2",
      logo: "assets-2.png",
      date_release: "2025-01-01",
      date_revision: "2025-01-01"
    }
  ];

  constructor(private router: Router) {
  }

  onButtonClick(): void {
    this.router.navigate(['/products/add']);
  }

  editItem(event: any): void {
    console.log(event);
  }

}