import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProcessoService } from './processo.service';
import { IProcesso } from 'src/app/interfaces/IProcesso';

describe('ProcessoService', () => {
  let service: ProcessoService;
  let httpMock: HttpTestingController;
  const mockProcesso: IProcesso = {
    id: 1,
    numeroProcesso: 123456,
    descricao: 'Processo Teste',
    processado: {
      id: 1,
      nome: 'João',
      cpf: '12345678900',
      cnpj: '',
      rg: 'MG123456',
      email: 'joao@example.com',
      telefone: '31999999999',
      ddd: '31',
      logradouro: 'Rua Teste',
      bairro: 'Centro',
      cidade: 'Belo Horizonte',
      uf: 'MG',
      cep: '30123456',
      nomePai: 'Pai Teste',
      nomeMae: 'Mãe Teste',
      estadoCivil: 'Solteiro',
      endereco: 'Rua Teste, 123',
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcessoService],
    });

    service = TestBed.inject(ProcessoService);
    httpMock = TestBed.inject(HttpTestingController);

    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should clear the processo and remove from localStorage', () => {
    service.setProcesso(mockProcesso);
    service.clearProcesso();

    const storedProcesso = localStorage.getItem('processo');
    expect(storedProcesso).toBeNull();
  });


});
