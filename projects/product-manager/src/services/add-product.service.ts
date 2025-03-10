import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../models/product.model';
import { IProductAddResponse } from '../models/product-add-response.model';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddProductService {
  private readonly http = inject(HttpClient);

  add(request: IProduct): Observable<IProductAddResponse> {
    return this.http.post<IProductAddResponse>(environment.apiUrl + '/products', request);
  }

}