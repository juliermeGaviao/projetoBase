/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NO_ERRORS_SCHEMA } from '@angular/core' // Usado para evitar erros de componentes filhos não declarados
import { DynamicTableComponent } from './dynamic-table.component'

describe('DynamicTableComponent', () => {
  let component: DynamicTableComponent
  let fixture: ComponentFixture<DynamicTableComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamicTableComponent],
      schemas: [NO_ERRORS_SCHEMA],  // Ignora erros de componentes filhos não declarados
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicTableComponent)
    component = fixture.componentInstance
  })

  it('should create the component', () => {
    expect(component).toBeTruthy()
  })

})
