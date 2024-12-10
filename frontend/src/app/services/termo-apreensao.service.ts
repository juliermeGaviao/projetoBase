import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IAutoInfracao } from '../interfaces/IAutoInfracao'; 

@Injectable({
  providedIn: 'root',
})
export class TermoApreensaoService {
  private readonly baseUrl = `${environment.apiUrl}termo_apreensao`;

  constructor(private readonly http: HttpClient) {}

  obterTermoApreensaoPorId(id: number): Observable<IAutoInfracao> { 
    return this.http.get<IAutoInfracao>(`${this.baseUrl}/${id}`);
  }
}
