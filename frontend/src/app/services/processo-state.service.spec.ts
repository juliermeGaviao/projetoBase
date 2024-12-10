import { ProcessoStateService } from './processo-state.service';

describe('ProcessoStateService', () => {
  let service: ProcessoStateService;

  beforeEach(() => {
    localStorage.clear();
    service = new ProcessoStateService();
  });

  it('deve inicializar o BehaviorSubject com o valor correto do localStorage', () => {
    localStorage.setItem('processoId', '123');
    service = new ProcessoStateService();
    expect(service.getProcessoId()).toBe(123);
  });

  it('deve definir o ID do processo corretamente e salvá-lo no localStorage', () => {
    service.setProcessoId(456);
    expect(service.getProcessoId()).toBe(456);
    expect(localStorage.getItem('processoId')).toBe('456');
  });

  it('deve obter o ID do processo a partir do BehaviorSubject', () => {
    service.setProcessoId(789);
    expect(service.getProcessoId()).toBe(789);
  });

  it('deve obter o ID do processo a partir do localStorage se estiver presente', () => {
    localStorage.setItem('processoId', '321');
    service = new ProcessoStateService();
    expect(service.getProcessoId()).toBe(321);
  });

  it('deve retornar null se não houver ID no localStorage', () => {
    localStorage.removeItem('processoId');
    service = new ProcessoStateService();
    expect(service.getProcessoId()).toBeNull();
  });

  it('deve limpar o ID do processo e removê-lo do localStorage', () => {
    service.setProcessoId(999);
    service.clearProcessoId();
    expect(service.getProcessoId()).toBeNull();
    expect(localStorage.getItem('processoId')).toBeNull();
  });

  it('deve inicializar o processoId$ com o valor correto', (done) => {
    localStorage.setItem('processoId', '555');
    service = new ProcessoStateService();
    service.processoId$.subscribe((value) => {
      expect(value).toBe(555);
      done();
    });
  });

  it('deve atualizar o processoId$ quando o ID for definido', (done) => {
    service.processoId$.subscribe((value) => {
      if (value === 777) {
        expect(value).toBe(777);
        done();
      }
    });
    service.setProcessoId(777);
  });

  it('deve atualizar o processoId$ para null quando o ID for limpo', (done) => {
    service.setProcessoId(888);
    service.processoId$.subscribe((value) => {
      if (value === null) {
        expect(value).toBeNull();
        done();
      }
    });
    service.clearProcessoId();
  });
});
