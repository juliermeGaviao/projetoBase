import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment'
import { Product } from '../model/product'
import { CrudService } from '../interfaces/crud-service.interface'

@Injectable({
  providedIn: 'root'
})
export class ProductService implements CrudService<Product> {

  private readonly apiUrl = environment.apiUrl + 'product'

  constructor(private readonly httpClient: HttpClient) { }

  getByParams(params: any): Observable<any> {
    return this.httpClient.get<Product[]>(this.apiUrl + '/page', { params })
  }

  deleteById(id: number): Observable<any> {
    return this.httpClient.delete<Product>(this.apiUrl + '/' + id)
  }

  save(dto: any): Observable<any> {
    return this.httpClient.post<Product>(`${this.apiUrl}`, dto)
  }

  edit(dto: Product): Observable<any> {
    return this.httpClient.put<Product>(`${this.apiUrl}`, dto)
  }

  getById(id: number): Observable<any> {
    return this.httpClient.get<Product>(this.apiUrl + '/' + id)
  }

}
