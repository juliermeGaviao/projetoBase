import { Component, EventEmitter, Input, Output, ContentChildren, QueryList, TemplateRef } from '@angular/core'

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.css']
})
export class DynamicTableComponent {

  @ContentChildren('column') columns: QueryList<TemplateRef<any>>

  @Input() data: any
  @Input() pageSizes: number[] = [10, 25, 50, 100]
  
  @Output() pageChange = new EventEmitter<number>()
  @Output() pageSizeChange = new EventEmitter<number>()
  @Output() sort = new EventEmitter<any>()

  constructor() { }

  get pageStart(): number {
    return this.data.page.currentPage * this.data.page.itemsPerPage + 1
  }

  get pageEnd(): number {
    const end = (this.data.page.currentPage + 1) * this.data.page.itemsPerPage

    return end > this.data.page.totalItems ? this.data.page.totalItems : end
  }

  get pages(): number[] {
    let result: number[] = []

    for (let i: number = 0; i < this.data.page.totalPages; i++) {
      result.push(i)
    }

    return result
  }

  changePageSize(): void {
    this.data.page.currentPage = 0

    this.pageSizeChange.emit(this.data.page.itemsPerPage)
  }

  changePage(): void {
    this.pageChange.emit(this.data.page.currentPage)
  }

  previousPage(): void {
    if (this.data.page.currentPage > 0) {
      this.data.page.currentPage--
      this.pageChange.emit(this.data.page.currentPage)
    }
  }

  nextPage(): void {
    if (this.data.page.currentPage < this.data.page.totalPages - 1) {
      this.data.page.currentPage++
      this.pageChange.emit(this.data.page.currentPage)
    }
  }

  isHtml(value: any): boolean {
    if (typeof value === 'string') {
      return value.includes('<')
    }

    return false
  }

  sortBy(orderBy: string, orderDirect: string) {
    this.data.orderBy = orderBy
    this.data.orderDirect = orderDirect

    this.changePage()
  }

}
