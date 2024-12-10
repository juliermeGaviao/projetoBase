import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AutoInfracaoService } from './auto-infracao.service';

describe('AutoInfracaoService', () => {
  let service: AutoInfracaoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AutoInfracaoService],
    });

    service = TestBed.inject(AutoInfracaoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  describe('obterAutoInfracaoPorId', () => {
    it('deve fazer uma requisição GET para o endpoint correto', () => {
      const id = 1;

      service.obterAutoInfracaoPorId(id).subscribe();

      const req = httpMock.expectOne(`${service['baseUrl']}/${id}`);
      expect(req.request.method).toBe('GET'); 
    });

    it('deve enviar a URL correta com o ID fornecido', () => {
      const id = 42;

      service.obterAutoInfracaoPorId(id).subscribe();

      const req = httpMock.expectOne(`${service['baseUrl']}/${id}`);
      expect(req.request.url).toBe(`${service['baseUrl']}/${id}`); 
    });
  });

  describe('obterTodosAutosDeInfracao', () => {
    it('deve fazer uma requisição GET com os parâmetros corretos', () => {
      const pagina = 1;
      const tamanho = 10;

      service.obterTodosAutosDeInfracao(pagina, tamanho).subscribe();

      const req = httpMock.expectOne((request) =>
        request.url === service['baseUrl'] &&
        request.params.get('p') === pagina.toString() &&
        request.params.get('s') === tamanho.toString()
      );

      expect(req).toBeTruthy();
      expect(req.request.method).toBe('GET');
    });

    it('deve construir a URL corretamente com os parâmetros fornecidos', () => {
      const pagina = 2;
      const tamanho = 5;

      service.obterTodosAutosDeInfracao(pagina, tamanho).subscribe();

      const req = httpMock.expectOne(`${service['baseUrl']}?p=${pagina}&s=${tamanho}`);
      expect(req.request.urlWithParams).toBe(`${service['baseUrl']}?p=${pagina}&s=${tamanho}`);
    });
  });
});
