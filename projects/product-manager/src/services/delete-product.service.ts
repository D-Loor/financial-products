import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProductDeleteResponse } from '../models/product-delete-response.model';
import { environment } from '../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeleteProductService {
  private readonly http = inject(HttpClient);

  delete(id: string): Observable<IProductDeleteResponse> {
    return this.http.delete<IProductDeleteResponse>(environment.apiUrl + '/products/' + id);
  }

}