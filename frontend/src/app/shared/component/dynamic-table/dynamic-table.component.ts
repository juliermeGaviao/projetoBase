import { Component, EventEmitter, Input, Output, ContentChildren, QueryList, TemplateRef } from '@angular/core'

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.css']
})
export class DynamicTableComponent {

  @ContentChildren('header') headers: QueryList<TemplateRef<any>>
  @ContentChildren('column') columns: QueryList<TemplateRef<any>>
  @Input() data: any[] = []
  @Input() pageSizes: number[] = [10, 20, 30]
  @Input() totalRecords: number = 0

  @Output() pageChange = new EventEmitter<number>()
  @Output() pageSizeChange = new EventEmitter<number>()
  constructor() { }

  currentPage = 0
  pageSize = 10

  get totalPages(): number {
    return Math.ceil(this.totalRecords / this.pageSize)
  }

  get pageStart(): number {
    return this.currentPage * this.pageSize + 1
  }

  get pages(): number[] {
    let result: number[] = []

    for (let i: number = 0; i < this.totalPages; i++) {
      result.push(i + 1)
    }

    return result
  }

  get pageEnd(): number {
    const end = (this.currentPage + 1) * this.pageSize
    return end > this.totalRecords ? this.totalRecords : end
  }

  changePageSize(event: Event): void {
    const target = event.target as HTMLSelectElement
    this.pageSize = +target.value
    this.currentPage = 0 // Reset to first page
    this.pageSizeChange.emit(this.pageSize)
  }

  changePage(event: Event): void {
    const target = event.target as HTMLSelectElement
    this.currentPage = +target.value
    this.pageChange.emit(this.currentPage)
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--
      this.pageChange.emit(this.currentPage)
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++
      this.pageChange.emit(this.currentPage)
    }
  }

  isHtml(value: any): boolean {
    if (typeof value === 'string') {
      return value.includes('<')
    }

    return false
  }

}
