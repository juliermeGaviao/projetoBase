import { TestBed } from '@angular/core/testing';
import { InfosGeraisComponent } from './infos-gerais.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProcessoService } from '../../../../services/processo.service';
import { of, Subject, } from 'rxjs';
import { IProcesso } from 'src/app/interfaces/IProcesso';

describe('InfosGeraisComponent - Functions', () => {
  let component: InfosGeraisComponent;
  let mockProcessoService: any;
  let mockActivatedRoute: any;
  let processoSubject$: Subject<IProcesso | null>;

  beforeEach(() => {
    processoSubject$ = new Subject<IProcesso | null>();

    mockProcessoService = {
      processo$: processoSubject$.asObservable(),
      obterProcessoPorId: jest.fn(),
      setProcesso: jest.fn(),
    };

    mockActivatedRoute = {
      params: of({ id: 1 }),
    };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: ProcessoService, useValue: mockProcessoService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
      declarations: [InfosGeraisComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(InfosGeraisComponent);
    component = fixture.componentInstance;

    component.ngOnInit();
  });



  describe('preencherFormulario', () => {
    it('should patch form values with processo data', () => {
      const mockProcesso: IProcesso = {
        id: 1,
        processado: {
          nome: 'Jane Doe',
          cpf: '123456789',
          nomePai: 'Pai Exemplo',
          nomeMae: 'Mãe Exemplo',
          estadoCivil: 'Solteiro',
          logradouro: 'Rua Exemplo',
          cep: '12345-678',
          uf: 'SP',
          bairro: 'Bairro Exemplo',
          cidade: 'Cidade Exemplo',
          email: 'email@example.com',
          telefone: '123456789',
        },
      } as any;

      component.preencherFormulario(mockProcesso);

      expect(component.userForm.value).toEqual({
        name: 'Jane Doe',
        cpf: '123456789',
        rg: '',
        pai: 'Pai Exemplo',
        mae: 'Mãe Exemplo',
        estadoCivil: 'Solteiro',
        address: 'Rua Exemplo',
        cep: '12345-678',
        uf: 'SP',
        bairro: 'Bairro Exemplo',
        cidade: 'Cidade Exemplo',
        email: 'email@example.com',
        mobile: '123456789',
      });
    });

    it('should handle missing processado fields gracefully', () => {
      const mockProcesso: IProcesso = {
        id: 1,
        processado: {},
      } as any;

      component.preencherFormulario(mockProcesso);

      expect(component.userForm.value).toEqual({
        name: '',
        cpf: '',
        rg: '',
        pai: '',
        mae: '',
        estadoCivil: '',
        address: '',
        cep: '',
        uf: '',
        bairro: '',
        cidade: '',
        email: '',
        mobile: '',
      });
    });
  });
});
