import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SectorService {

  private readonly apiUrl = environment.apiUrl + 'sector';

  constructor(private readonly httpClient: HttpClient) { }

  getByParams(params: any) {
    return this.httpClient.get<any>(this.apiUrl + '/page', { params }).pipe(take(1));
  }

  deleteById(id: number) {
    return this.httpClient.delete(this.apiUrl + 'sector/' + id);
  }

  public save(indicator: any) {
    return this.httpClient
      .post(`${this.apiUrl}`, indicator)
      .pipe(take(1));
  }

  public edit(indicator: any) {
    return this.httpClient
      .put(`${this.apiUrl}`, indicator)
      .pipe(take(1));
  }

  getById(id: number) {
    return this.httpClient.get(this.apiUrl + '/' + id).pipe(take(1));
  }

}
