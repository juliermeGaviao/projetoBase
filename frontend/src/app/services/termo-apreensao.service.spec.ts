import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TermoApreensaoService } from 'src/app/services/termo-apreensao.service';
import { ProcessoStateService } from 'src/app/services/processo-state.service';
import { TermoApreensaoComponent } from '../home/layout/menu/termo-apreensao/termo-apreensao.component';

describe('TermoApreensaoComponent', () => {
  let component: TermoApreensaoComponent;
  let fixture: ComponentFixture<TermoApreensaoComponent>;
  let termoApreensaoService: jest.Mocked<TermoApreensaoService>;
  let processoStateService: jest.Mocked<ProcessoStateService>;

  beforeEach(async () => {
    const mockTermoApreensaoService = {
      obterTermoApreensaoPorId: jest.fn(),
    };

    const mockProcessoStateService = {
      getProcessoId: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [TermoApreensaoComponent],
      providers: [
        { provide: TermoApreensaoService, useValue: mockTermoApreensaoService },
        { provide: ProcessoStateService, useValue: mockProcessoStateService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TermoApreensaoComponent);
    component = fixture.componentInstance;
    termoApreensaoService = TestBed.inject(TermoApreensaoService) as jest.Mocked<TermoApreensaoService>;
    processoStateService = TestBed.inject(ProcessoStateService) as jest.Mocked<ProcessoStateService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 

  it('should handle missing id gracefully', () => {
    processoStateService.getProcessoId.mockReturnValue(null);

    component.ngOnInit();

    expect(processoStateService.getProcessoId).toHaveBeenCalled();
    expect(termoApreensaoService.obterTermoApreensaoPorId).not.toHaveBeenCalled();
    expect(component.autoInfracao).toBeUndefined();
  });

  it('should process valid date and time correctly', () => {
    const input = '03/07/2018 17:35:00';
    component['processarDataHora'](input);

    expect(component.data).toBe('03/07/2018');
    expect(component.hora).toBe('17:35');
  });

  it('should handle invalid date format gracefully', () => {
    const input = 'invalid-date-string';
    component['processarDataHora'](input);

    expect(component.data).toBe('Dado inválido');
    expect(component.hora).toBe('Dado inválido');
  });
});
