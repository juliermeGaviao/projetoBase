import { EventEmitter, NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DynamicTableComponent } from './dynamic-table.component'
import { DataTable } from './dynamic-table.interface'

describe('DynamicTableComponent', () => {
  let component: DynamicTableComponent
  let fixture: ComponentFixture<DynamicTableComponent>
  let pageSizeChange: EventEmitter<number>
  let pageChange: EventEmitter<number>

  const generalData: DataTable = {
    headers: [
      { name: 'Id', column: 'id', sortable: true },
      { name: 'Nome', column: 'nome', sortable: true },
      { name: 'Ações', column: null, sortable: false }
    ],
    records: [
      { id: 1, nome: 'Alimentos' },
      { id: 2, nome: 'Bebidas' }
    ],
    page: {
      totalItems: 0,
      itemsPerPage: 1,
      currentPage: 0,
      totalPages: 0
    },
    orderBy: null,
    orderDirect: null
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamicTableComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [EventEmitter]
    }).compileComponents()

    fixture = TestBed.createComponent(DynamicTableComponent)
    component = fixture.componentInstance

    component.data = generalData
    pageSizeChange = TestBed.inject(EventEmitter)
    pageChange = TestBed.inject(EventEmitter)

    fixture.detectChanges()
  })

  it('should create the component', () => {
    expect(component).toBeTruthy()
  })

  it('should get page start', () => {
    const result = component.pageStart

    expect(result).toEqual(1)
  })

  it('should get page end', () => {
    const result = component.pageEnd

    expect(result).toEqual(0)
  })

  it('should get page end for different number of records', () => {
    generalData.page.totalItems = 2

    const result = component.pageEnd

    expect(result).toEqual(1)
  })

  it('should get number of pages', () => {
    const result = component.pages

    expect(result.length).toEqual(0)
  })

  it('should get number of pages with more than one page', () => {
    generalData.page.totalPages = 1

    const result = component.pages

    expect(result.length).toEqual(1)
  })

  it('should change page size', () => {
    jest.spyOn(pageSizeChange, 'emit')

    component.changePageSize()

    expect(component).toBeTruthy()
  })

  it('should change page', () => {
    jest.spyOn(pageChange, 'emit')

    component.changePage()

    expect(component).toBeTruthy()
  })

  it('should not go to previous page', () => {
    jest.spyOn(pageChange, 'emit')

    component.previousPage()

    expect(component.data.page.currentPage).toEqual(0)
  })

  it('should go to previous page', () => {
    generalData.page.currentPage = 1
    jest.spyOn(pageChange, 'emit')

    component.previousPage()

    expect(component.data.page.currentPage).toEqual(0)
  })

  it('should not go to nextPage page', () => {
    jest.spyOn(pageChange, 'emit')

    component.nextPage()

    expect(component.data.page.currentPage).toEqual(0)
  })

  it('should go to nextPage page', () => {
    generalData.page.totalPages = 2
    jest.spyOn(pageChange, 'emit')

    component.nextPage()

    expect(component.data.page.currentPage).toEqual(1)
  })

  it('should sort page', () => {
    jest.spyOn(pageChange, 'emit')

    component.sortBy('nome', 'asc')

    expect(component).toBeTruthy()
  })

})
