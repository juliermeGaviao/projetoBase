import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, take } from 'rxjs'
import { environment } from 'src/environments/environment'
import { Sector } from '../model/sector'

@Injectable({
  providedIn: 'root',
})
export class SectorService {

  private readonly apiUrl = environment.apiUrl + 'sector'

  constructor(private readonly httpClient: HttpClient) { }

  getByParams(params: any) {
    return this.httpClient.get<Sector[]>(this.apiUrl + '/page', { params }).pipe(take(1))
  }

  deleteById(id: number) {
    return this.httpClient.delete(this.apiUrl + 'sector/' + id)
  }

  public save(sector: Sector) {
    return this.httpClient.post<Sector>(`${this.apiUrl}`, sector)
  }

  public edit(sector: Sector) {
    return this.httpClient.put<Sector>(`${this.apiUrl}`, sector).pipe(take(1))
  }

  getById(id: number): Observable<Sector> {
    return this.httpClient.get<Sector>(this.apiUrl + '/' + id).pipe(take(1))
  }

}
