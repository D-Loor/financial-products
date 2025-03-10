import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class VerificationProductService {
  private readonly http = inject(HttpClient);

  verification(id: string): Observable<boolean> {
    return this.http.get<boolean>(environment.apiUrl + '/products/verification/' + id);
  }

}