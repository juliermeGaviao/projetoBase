import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { InfosGeraisService } from './infos-gerais.service';
import { environment } from 'src/environments/environment';
import { IProcesso } from 'src/app/interfaces/IProcesso';

describe('InfosGeraisService', () => {
  let service: InfosGeraisService;
  let httpMock: HttpTestingController;

  const apiUrl = `${environment.apiUrl}processo`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InfosGeraisService],
    });

    service = TestBed.inject(InfosGeraisService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch processo by ID', () => {
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
      },
    };

    service.obterProcesso(1).subscribe((processo) => {
      expect(processo).toEqual(mockProcesso);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProcesso);
  });

  it('should handle HTTP errors gracefully', () => {
    service.obterProcesso(1).subscribe(
      () => fail('Expected an error, but got a response'),
      (error) => {
        expect(error.status).toBe(404);
      }
    );

    const req = httpMock.expectOne(`${apiUrl}/1`);
    req.flush('Process not found', { status: 404, statusText: 'Not Found' });
  });
});
