import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { IAutoInfracao } from 'src/app/interfaces/IAutoInfracao';

@Injectable({
  providedIn: 'root',
})
export class AutoInfracaoService {
  private readonly baseUrl = `${environment.apiUrl}auto_infracao`;

  constructor(private readonly http: HttpClient) {}

  obterAutoInfracaoPorId(id: number): Observable<IAutoInfracao> {
    return this.http.get<IAutoInfracao>(`${this.baseUrl}/${id}`).pipe(
      map((data) => ({
        ...data,
      }))
    );
  }

  obterTodosAutosDeInfracao(pagina: number, tamanho: number): Observable<IAutoInfracao[]> {
    const params = new HttpParams().set('p', pagina.toString()).set('s', tamanho.toString());
    return this.http.get<IAutoInfracao[]>(this.baseUrl, { params }).pipe(
      map((items) =>
        items.map((item) => ({
          ...item,
    
        }))
      )
    );
  }
}
