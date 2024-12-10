import { TermoApreensaoComponent } from './termo-apreensao.component';

describe('TermoApreensaoComponent - Functions', () => {
  let component: TermoApreensaoComponent;

  beforeEach(() => {
    component = new TermoApreensaoComponent(null as any, null as any);
  });

  it('should correctly adjust the date format', () => {
    const input = '30-09-2018 18:00:00';
    const expectedOutput = '2018-09-30T18:00:00';
    const result = component['ajustarFormatoData'](input);
    expect(result).toBe(expectedOutput);
  });

  
  it('should process the date and time correctly', () => {
    const entrada = '2024-12-01 14:30:00';
    component['processarDataHora'](entrada);
    expect(component.data).toBe('2024-12-01');
    expect(component.hora).toBe('14:30');
  });
  
  it('should return "Invalid data" for malformed date/time', () => {
    const entrada = 'dado-invalido';
    component['processarDataHora'](entrada);
    expect(component.data).toBe('Dado inválido');
    expect(component.hora).toBe('Dado inválido');
  });
  
});