import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IProcesso } from 'src/app/interfaces/IProcesso';

@Injectable({
  providedIn: 'root',
})
export class InfosGeraisService {
  private readonly baseUrl = `${environment.apiUrl}processo`;

  constructor(private readonly http: HttpClient) {}

  obterProcesso(id: number): Observable<IProcesso> {
    return this.http.get<IProcesso>(`${this.baseUrl}/${id}`);
  }
}
