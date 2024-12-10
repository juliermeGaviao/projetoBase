import { TestBed } from '@angular/core/testing';
import { AutoInfracaoComponent } from './auto-infracao.component';
import { AutoInfracaoService } from 'src/app/services/auto-infracao.service';
import { of } from 'rxjs';

describe('AutoInfracaoComponent', () => {
  let component: AutoInfracaoComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutoInfracaoComponent],
      providers: [
        {
          provide: AutoInfracaoService,
          useValue: {
            obterAutoInfracaoPorId: (id: number) =>
              of({ id, descricao: 'Test', dataHora: '2024-12-03 14:00:00' }),
          },
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(AutoInfracaoComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });



  it('should return the correct date from getData method', () => {
    const date = component.getData('2024-12-03 14:00:00');
    expect(date).toBe('2024-12-03');
  });

  it('should return null from getData method if input is invalid', () => {
    const date = component.getData('');
    expect(date).toBeNull();
  });

  it('should return the correct time from getHora method', () => {
    const time = component.getHora('2024-12-03 14:00:00');
    expect(time).toBe('14:00:00');
  });

  it('should return null from getHora method if input is invalid', () => {
    const time = component.getHora('');
    expect(time).toBeNull();
  });
});
