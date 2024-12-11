import {Component, OnInit} from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'
import { IColumns } from '../../../../interfaces/IColumns';


import { SectorService } from './sector.service'

@Component({
    selector: 'app-list-sector',
    templateUrl: './list-sector.component.html'
  })
export class ListSectorComponent implements OnInit {

    dataTable: any = {
        records: [],
        page: {
            totalItems: 0,
            itemsPerPage: 5,
            currentPage: 1,
            totalPages: 0
        }
    }

    public form: FormGroup;

    columns: IColumns[] = [
        { name: 'Indicador de porte', field: 'indicadorPorte' },
        { name: 'Unidade de medida', field: 'unidadeMedida' },
        { name: 'Situação', field: 'situacao' },
        { name: 'Ações', field: 'acoes' }
    ]
    
    constructor(
        private readonly router: Router,
        private readonly fb: FormBuilder,
        private readonly route: ActivatedRoute,
        private readonly sectorService: SectorService)
    { }

    ngOnInit() {
        this.loadSectors()
    }

    loadSectors(params: any = { page: 0, size: 5 }) {
        this.sectorService.getByParams(params).subscribe({
          next: (data: any) => {
            this.dataTable.records = data.sectors
    
            this.dataTable.page.totalPages = data.totalPages
            this.dataTable.page.currentPage = data.currentPage + 1
            this.dataTable.page.totalItems = data.totalItems
            this.dataTable.page.itemsPerPage = params.size
          },
          error: err => {
            console.log(err)
          }
        })
    }
    
}
  