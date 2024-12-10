import { Component, OnInit } from '@angular/core';
import { IBemApreendido } from 'src/app/interfaces/IBemApreendido';
import { Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { BemApreendidoService } from '../../services/bem-apreendido.service';
import { ProcessoStateService } from 'src/app/services/processo-state.service';

@Component({
  selector: 'app-dashboard-bens',
  templateUrl: './dashboard-bens.component.html',
  styleUrls: ['./dashboard-bens.component.css']
})
export class DashboardBensComponent implements OnInit {
  bensApreendidos: IBemApreendido[] = [];
  bensFiltrados: IBemApreendido[] = [];
  criteriosBusca: string = '';
  pagina: number = 0;
  tamanho: number = 10;
  totalRegistros: number = 0;
  searchSubject: Subject<string> = new Subject();

  constructor(
    private readonly bemApreendidoService: BemApreendidoService,
    private readonly router: Router,
    private readonly processoStateService: ProcessoStateService

  ) {}

  ngOnInit(): void {
    this.obterTodosBensApreendidos();
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((searchTerm) => {
        this.criteriosBusca = searchTerm.trim();
        this.aplicarFiltroLocal();
      });
  }

  obterTodosBensApreendidos(): void {
    this.bemApreendidoService
      .obterTodosBensApreendidos(this.pagina, this.tamanho)
      .pipe(
        tap((dados: IBemApreendido[]) => {
          this.bensApreendidos = dados;
          this.bensFiltrados = [...dados];
          this.totalRegistros = dados.length;
        }),
        catchError((erro) => {
          console.error('Erro ao obter os bens apreendidos', erro);
          return of([]); 
        })
      )
      .subscribe();
  }
  

  aplicarFiltroLocal(): void {
    if (!this.criteriosBusca) {
      this.bensFiltrados = [...this.bensApreendidos];
      return;
    }

    const criterios = this.criteriosBusca.toLowerCase();

    this.bensFiltrados = this.bensApreendidos.filter((bem) => {
      return (
        bem.processo?.numeroProcesso?.toString().includes(criterios) ||
        bem.processoDestinacao?.cpfFielDepositario?.toLowerCase().includes(criterios) ||
        bem.processoDestinacao?.cnpjFielDepositario?.toLowerCase().includes(criterios) ||
        bem.processo?.processado?.nome?.toLowerCase().includes(criterios) ||
        bem.processo?.processado?.cpf?.includes(criterios) ||
        bem.processo?.processado?.cnpj?.includes(criterios)
      );
    });

    this.totalRegistros = this.bensFiltrados.length;
  }

  onSearchInputChange(searchTerm: string): void {
    this.searchSubject.next(searchTerm);
  }

  visualizarDetalhes(bem: IBemApreendido): void {
    const processo = bem.processo;
    if (processo) {
      this.processoStateService.setProcessoId(processo.id); 
      this.router.navigate(['/home/infos-gerais']);
    }
  }
  

  proximaPagina(): void {
    this.pagina++;
    this.obterTodosBensApreendidos();
  }

  paginaAnterior(): void {
    if (this.pagina > 0) {
      this.pagina--;
      this.obterTodosBensApreendidos();
    }
  }

  mudarTamanhoPagina(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.tamanho = parseInt(target.value, 10) || this.tamanho;
    this.pagina = 0;
    this.obterTodosBensApreendidos();
  }
}
