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
    fixture.detectChanges()  // Detecta mudanças iniciais
  })

  it('should create the component', () => {
    expect(component).toBeTruthy()
  })

  it('should calculate totalPages correctly', () => {
    component.data.page.totalItems = 50
    component.data.page.itemsPerPage = 10
    fixture.detectChanges()

    expect(component.data.page.totalPages).toBe(5)  // 50 totalRecords / 10 pageSize = 5 pages
  })

  it('should calculate pageStart and pageEnd correctly', () => {
    component.data.page.totalItems = 50
    component.data.page.itemsPerPage = 10
    component.data.page.currentPage = 0
    fixture.detectChanges()

    expect(component.pageStart).toBe(11)  // (currentPage * pageSize) + 1 = (1 * 10) + 1
    expect(component.pageEnd).toBe(20)  // (currentPage + 1) * pageSize = (1 + 1) * 10 = 20
  })

  it('should emit pageChange when previousPage is called', () => {
    const pageChangeSpy = jest.spyOn(component.pageChange, 'emit')

    component.data.page.currentPage = 1  // Set current page to 1
    component.previousPage()

    expect(pageChangeSpy).toHaveBeenCalledWith(0)  // It should emit 0 (previous page)
    expect(component.data.page.currentPage).toBe(0)  // The page should be decremented
  })

  it('should emit pageChange when nextPage is called', () => {
    const pageChangeSpy = jest.spyOn(component.pageChange, 'emit')

    component.data.page.currentPage = 0  // Set current page to 0
    component.data.page.totalItems = 30
    component.data.page.itemsPerPage = 10
    component.nextPage()

    expect(pageChangeSpy).toHaveBeenCalledWith(1)  // It should emit 1 (next page)
    expect(component.data.page.currentPage).toBe(1)  // The page should be incremented
  })

  it('should not emit pageChange when nextPage is called and on last page', () => {
    const pageChangeSpy = jest.spyOn(component.pageChange, 'emit')

    component.data.page.currentPage = 2  // Set current page to 2
    component.data.page.totalItems = 30
    component.data.page.itemsPerPage = 10
    component.nextPage()

    expect(pageChangeSpy).not.toHaveBeenCalled()  // No change in page, no event emitted
    expect(component.data.page.currentPage).toBe(2)  // The page should remain the same
  })
  describe('changePageSize', () => {
    it('should update pageSize and reset currentPage when the page size is changed', () => {
      // Spy para verificar se o emit foi chamado
      const emitSpy = jest.spyOn(component.pageSizeChange, 'emit')

      // Chama o método changePageSize
      component.changePageSize()

      // Verifica se a propriedade pageSize foi atualizada para 20
      expect(component.data.page.itemsPerPage).toBe(20)

      // Verifica se a propriedade currentPage foi resetada para 0
      expect(component.data.page.currentPage).toBe(0)

      // Verifica se o evento pageSizeChange foi emitido com o valor correto
      expect(emitSpy).toHaveBeenCalledWith(20)
    })

    it('should call pageSizeChange.emit with the correct value when page size is changed', () => {
      // Spy para verificar se o emit foi chamado
      const emitSpy = jest.spyOn(component.pageSizeChange, 'emit')

      // Chama o método changePageSize
      component.changePageSize()

      // Verifica se o método emit foi chamado com o valor correto
      expect(emitSpy).toHaveBeenCalledWith(10)
    })
  })
  describe('changePageSize', () => {
    it('should update pageSize and reset currentPage when the page size is changed', () => {
      // Spy para verificar se o emit foi chamado
      const emitSpy = jest.spyOn(component.pageSizeChange, 'emit')

      // Chama o método changePageSize
      component.changePageSize()

      // Verifica se a propriedade pageSize foi atualizada para 20
      expect(component.data.page.itemsPerPage).toBe(20)

      // Verifica se a propriedade currentPage foi resetada para 0
      expect(component.data.page.currentPage).toBe(0)

      // Verifica se o evento pageSizeChange foi emitido com o valor correto
      expect(emitSpy).toHaveBeenCalledWith(20)
    })

    it('should call pageSizeChange.emit with the correct value when page size is changed', () => {
      // Spy para verificar se o emit foi chamado
      const emitSpy = jest.spyOn(component.pageSizeChange, 'emit')

      // Chama o método changePageSize
      component.changePageSize()

      // Verifica se o método emit foi chamado com o valor correto
      expect(emitSpy).toHaveBeenCalledWith(10)
    })
  })
})
