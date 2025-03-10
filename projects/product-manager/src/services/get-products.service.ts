import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProductGetResponse } from '../models/product-get-response.model';
import { environment } from '../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetProductsService {
  private readonly http = inject(HttpClient);

  get(): Observable<IProductGetResponse> {
    return this.http.get<IProductGetResponse>(environment.apiUrl + '/products');
  }

}