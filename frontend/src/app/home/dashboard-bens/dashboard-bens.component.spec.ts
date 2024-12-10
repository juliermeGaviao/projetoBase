import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardBensComponent } from './dashboard-bens.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BemApreendidoService } from '../../services/bem-apreendido.service';
import { ProcessoStateService } from 'src/app/services/processo-state.service';
import { IBemApreendido } from 'src/app/interfaces/IBemApreendido';

describe('DashboardBensComponent', () => {
  let component: DashboardBensComponent;
  let fixture: ComponentFixture<DashboardBensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardBensComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [BemApreendidoService, ProcessoStateService],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardBensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  
  it('should filter bens apreendidos correctly when search term is provided', () => {
    component.bensApreendidos = [
      {
        processo: {
          numeroProcesso: 123,
          id: 0,
          descricao: '',
          processado: undefined
        }, processoDestinacao: {
          cpfFielDepositario: '12345678900',
          id: 0,
          quantidade: 0,
          descricao: '',
          bemApreendido: undefined
        },
        id: 0,
        quantidade: 0,
        situacaoBem: '',
        tipoBem: undefined
      },
      {
        processo: {
          numeroProcesso: 456,
          id: 0,
          descricao: '',
          processado: undefined
        }, processoDestinacao: {
          cpfFielDepositario: '98765432100',
          id: 0,
          quantidade: 0,
          descricao: '',
          bemApreendido: undefined
        },
        id: 0,
        quantidade: 0,
        situacaoBem: '',
        tipoBem: undefined
      },
    ];

    component.criteriosBusca = '123';
    component.aplicarFiltroLocal();

    expect(component.bensFiltrados.length).toBe(1);
    expect(component.bensFiltrados[0].processo.numeroProcesso).toBe(123);
  });

  it('should reset filtered bens when search term is empty', () => {
    component.bensApreendidos = [
      {
        processo: {
          numeroProcesso: 123,
          id: 0,
          descricao: '',
          processado: undefined
        }, processoDestinacao: {
          cpfFielDepositario: '12345678900',
          id: 0,
          quantidade: 0,
          descricao: '',
          bemApreendido: undefined
        },
        id: 0,
        quantidade: 0,
        situacaoBem: '',
        tipoBem: undefined
      },
      {
        processo: {
          numeroProcesso: 456,
          id: 0,
          descricao: '',
          processado: undefined
        }, processoDestinacao: {
          cpfFielDepositario: '98765432100',
          id: 0,
          quantidade: 0,
          descricao: '',
          bemApreendido: undefined
        },
        id: 0,
        quantidade: 0,
        situacaoBem: '',
        tipoBem: undefined
      },
    ];

    component.criteriosBusca = '';
    component.aplicarFiltroLocal();

    expect(component.bensFiltrados.length).toBe(2);
  });

  it('should navigate to detalhes page when visualizarDetalhes is called', () => {
    const mockBem: IBemApreendido = {
      processo: {
        id: 1,
        descricao: '',
        numeroProcesso: 0,
        processado: undefined
      },
      id: 0,
      quantidade: 0,
      situacaoBem: '',
      tipoBem: undefined
    };
    jest.spyOn(component['router'], 'navigate');

    component.visualizarDetalhes(mockBem);

    expect(component['router'].navigate).toHaveBeenCalledWith(['/home/infos-gerais']);
  });

  it('should fetch next page of bens apreendidos', () => {
    component.pagina = 0;
    component.proximaPagina();

    expect(component.pagina).toBe(1);
  });

  it('should fetch previous page of bens apreendidos', () => {
    component.pagina = 2;
    component.paginaAnterior();

    expect(component.pagina).toBe(1);
  });

  it('should not fetch previous page if already on first page', () => {
    component.pagina = 0;
    component.paginaAnterior();

    expect(component.pagina).toBe(0);
  });

  it('should change page size and reset to the first page', () => {
    const mockEvent = { target: { value: '20' } } as unknown as Event;

    component.mudarTamanhoPagina(mockEvent);

    expect(component.tamanho).toBe(20);
    expect(component.pagina).toBe(0);
  });

  it('should handle invalid page size gracefully', () => {
    const mockEvent = { target: { value: 'invalid' } } as unknown as Event;

    component.mudarTamanhoPagina(mockEvent);

    expect(component.tamanho).toBe(10); 
    expect(component.pagina).toBe(0);
  });
});
