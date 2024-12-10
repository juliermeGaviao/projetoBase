import { Component, OnInit } from '@angular/core';
import { AutoInfracaoService } from 'src/app/services/auto-infracao.service';
import { ProcessoStateService } from 'src/app/services/processo-state.service';
import { IAutoInfracao } from 'src/app/interfaces/IAutoInfracao';

@Component({
  selector: 'app-auto-infracao',
  templateUrl: './auto-infracao.component.html',
})
export class AutoInfracaoComponent implements OnInit {
  autoInfracao: IAutoInfracao | null = null;

  constructor(
    private readonly autoInfracaoService: AutoInfracaoService,
    private readonly processoStateService: ProcessoStateService
  ) {}

  ngOnInit(): void {
    const id = this.processoStateService.getProcessoId();
    if (id) {
      this.autoInfracaoService.obterAutoInfracaoPorId(id).subscribe((data) => {
        this.autoInfracao = data;
      });
    } else {
      console.error('ID do processo não encontrado.');
    }
  }

  getData(dataString: string): string {
    if (!dataString) return null;
    const [data] = dataString.split(' '); 
    return data;
  }

  getHora(dataString: string): string {
    if (!dataString) return null;
    const [, hora] = dataString.split(' '); 
    return hora; 
  }
}
