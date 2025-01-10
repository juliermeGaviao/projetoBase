import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment'
import { Sector } from '../model/sector'
import { CrudService } from '../interfaces/crud-service.interface'

@Injectable({
  providedIn: 'root'
})
export class SectorService implements CrudService<Sector> {

  private readonly apiUrl = environment.apiUrl + 'sector'

  constructor(private readonly httpClient: HttpClient) { }

  getByParams(params: any): Observable<any> {
    return this.httpClient.get<Sector[]>(this.apiUrl + '/page', { params })
  }

  deleteById(id: number): Observable<any> {
    return this.httpClient.delete<Sector>(this.apiUrl + '/' + id)
  }

  save(dto: Sector): Observable<any> {
    return this.httpClient.post<Sector>(`${this.apiUrl}`, dto)
  }

  edit(dto: Sector): Observable<any> {
    return this.httpClient.put<Sector>(`${this.apiUrl}`, dto)
  }

  getById(id: number): Observable<any> {
    return this.httpClient.get<Sector>(this.apiUrl + '/' + id)
  }

}
