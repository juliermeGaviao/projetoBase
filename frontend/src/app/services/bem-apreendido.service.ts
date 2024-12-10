import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IBemApreendido } from 'src/app/interfaces/IBemApreendido';

@Injectable({
  providedIn: 'root',
})
export class BemApreendidoService {
  private readonly baseUrl = `${environment.apiUrl}bem_apreendido`;

  constructor(private readonly http: HttpClient) {}

  obterTodosBensApreendidos(pagina: number, tamanho: number): Observable<IBemApreendido[]> {
    const params = new HttpParams().set('p', pagina.toString()).set('s', tamanho.toString());
    return this.http.get<IBemApreendido[]>(this.baseUrl, { params });
  }

}
