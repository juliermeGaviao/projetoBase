import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProcessoStateService {
  private readonly processoIdKey = 'processoId';
  private readonly processoIdSubject = new BehaviorSubject<number | null>(this.getLocalProcessoId());

  processoId$ = this.processoIdSubject.asObservable();

  setProcessoId(id: number): void {
    this.processoIdSubject.next(id);
    localStorage.setItem(this.processoIdKey, id.toString());
  }

  getProcessoId(): number | null {
    return this.processoIdSubject.getValue();
  }

  private getLocalProcessoId(): number | null {
    const id = localStorage.getItem(this.processoIdKey);
    return id ? parseInt(id, 10) : null;
  }

  clearProcessoId(): void {
    this.processoIdSubject.next(null);
    localStorage.removeItem(this.processoIdKey);
  }
}
