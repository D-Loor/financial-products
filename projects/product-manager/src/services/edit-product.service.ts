import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IProduct } from '../models/product.model';
import { Observable } from 'rxjs';
import { IProductEditResponse } from '../models/product-edit-response.model';
import { environment } from '../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class EditProductService {
  private readonly http = inject(HttpClient);

  edit(request: IProduct): Observable<IProductEditResponse> {
    return this.http.put<IProductEditResponse>(environment.apiUrl + '/products/' + request.id, request);
  }

}