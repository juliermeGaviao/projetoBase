import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { IProcesso } from 'src/app/interfaces/IProcesso';
import { environment } from 'src/environments/environment';
import { shareReplay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProcessoService {
  private readonly baseUrl = `${environment.apiUrl}processo`;
  private readonly processoSubject = new BehaviorSubject<IProcesso | null>(this.getLocalProcesso());
  processo$ = this.processoSubject.asObservable().pipe(shareReplay(1));

  constructor(private readonly http: HttpClient) {}

  obterProcessoPorId(id: number): Observable<IProcesso> {
    return this.http.get<IProcesso>(`${this.baseUrl}/${id}`).pipe(
      tap((processo) => {
        this.setProcesso(processo);
      })
    );
  }
  


  setProcesso(processo: IProcesso): void {
    this.processoSubject.next(processo);
    localStorage.setItem('processo', JSON.stringify(processo)); 
  }

  clearProcesso(): void {
    this.processoSubject.next(null);
    localStorage.removeItem('processo'); 
  }

  private getLocalProcesso(): IProcesso | null {
    const processoJson = localStorage.getItem('processo');
    return processoJson ? JSON.parse(processoJson) : null; 
  }
}
