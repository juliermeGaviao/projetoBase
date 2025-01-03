export interface TableHeader {
  name: string,
  column: string,
  sortable: boolean
}

export interface DataTable {
  headers: TableHeader[],
  records: any[],
  page: {
    totalItems: number,
    itemsPerPage: number,
    currentPage: number,
    totalPages: number
  }
  orderBy: string,
  orderDirect: string
}
