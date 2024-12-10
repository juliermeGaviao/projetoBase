import { Component, OnInit } from '@angular/core';
import { TermoApreensaoService } from 'src/app/services/termo-apreensao.service';
import { ProcessoStateService } from 'src/app/services/processo-state.service';
import { IAutoInfracao } from 'src/app/interfaces/IAutoInfracao'; // Atualizar conforme o modelo correto.

@Component({
  selector: 'app-termo-apreensao',
  templateUrl: './termo-apreensao.component.html',
})
export class TermoApreensaoComponent implements OnInit {
  public autoInfracao?: IAutoInfracao;
  public data: string = '';
  public hora: string = '';

  constructor(
    private readonly termoApreensaoService: TermoApreensaoService,
    private readonly processoStateService: ProcessoStateService
  ) {}

  ngOnInit(): void {
    const id = this.processoStateService.getProcessoId();
    if (id) {
      this.termoApreensaoService.obterTermoApreensaoPorId(id).subscribe({
        next: (data) => {
          this.autoInfracao = data;
          if (data.dhTermoApreensao) {
            const ajustado = this.ajustarFormatoData(data.dhTermoApreensao);
            this.processarDataHora(ajustado);
          }
        },
        error: (err) => console.error('Erro ao carregar os dados:', err),
      });
    } else {
      console.error('ID do processo não encontrado.');
    }
  }

  private ajustarFormatoData(dataHoraString: string): string {
    const [data, hora] = dataHoraString.split(' ');
    const [dia, mes, ano] = data.split('-');
    return `${ano}-${mes}-${dia}T${hora}`;
  }

  private processarDataHora(dataHoraString: string): void {
    const [data, hora] = dataHoraString.split(' ');
    if (data && hora) {
      this.data = data; 
      this.hora = hora.split(':').slice(0, 2).join(':'); 
    } else {
      this.data = 'Dado inválido';
      this.hora = 'Dado inválido';
    }
  }
  
}
