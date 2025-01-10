import { Observable } from "rxjs"

export interface CrudService<T> {

  getByParams(params: any): Observable<any>

  deleteById(id: number): Observable<any>

  save(dto: T): Observable<any>

  edit(dto: T): Observable<any>

  getById(id: number): Observable<any>

}