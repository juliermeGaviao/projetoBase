import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BemApreendidoService } from './bem-apreendido.service';
import { IBemApreendido } from 'src/app/interfaces/IBemApreendido';
import { environment } from '../../environments/environment';

describe('BemApreendidoService', () => {
  let service: BemApreendidoService;
  let httpMock: HttpTestingController;

  const apiUrl = `${environment.apiUrl}bem_apreendido`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BemApreendidoService],
    });

    service = TestBed.inject(BemApreendidoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all bens apreendidos with pagination', () => {
    const mockResponse: IBemApreendido[] = [
      { id: 1, situacaoBem: 'Ativo', quantidade: 1, tipoBem: { descricao: 'Carro' } } as IBemApreendido,
    ];

    service.obterTodosBensApreendidos(1, 10).subscribe((bens) => {
      expect(bens).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}?p=1&s=10`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should use the correct URL and query parameters', () => {
    service.obterTodosBensApreendidos(2, 5).subscribe();

    const req = httpMock.expectOne(`${apiUrl}?p=2&s=5`);
    expect(req.request.url).toBe(apiUrl);
    expect(req.request.params.get('p')).toBe('2');
    expect(req.request.params.get('s')).toBe('5');
  });

  it('should handle HTTP errors gracefully', () => {
    service.obterTodosBensApreendidos(1, 10).subscribe(
      () => fail('Expected an error, but got a response'),
      (error) => {
        expect(error.status).toBe(500);
      }
    );

    const req = httpMock.expectOne(`${apiUrl}?p=1&s=10`);
    req.flush('Error fetching data', { status: 500, statusText: 'Internal Server Error' });
  });
});
