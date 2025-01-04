import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment'
import { Product } from '../model/product'

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private readonly apiUrl = environment.apiUrl + 'product'

  constructor(private readonly httpClient: HttpClient) { }

  getByParams(params: any) {
    return this.httpClient.get<Product[]>(this.apiUrl + '/page', { params })
  }

  deleteById(id: number) {
    return this.httpClient.delete(this.apiUrl + '/' + id)
  }

  public save(product: any) {
    return this.httpClient.post<any>(`${this.apiUrl}`, product)
  }

  public edit(product: Product) {
    return this.httpClient.put<Product>(`${this.apiUrl}`, product)
  }

  getById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(this.apiUrl + '/' + id)
  }

}
