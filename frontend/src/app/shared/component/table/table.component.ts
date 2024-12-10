import { Component, ElementRef, Input } from '@angular/core';
import BrCheckbox from '@govbr-ds/core/dist/components/checkbox/checkbox';
import BrItem from '@govbr-ds/core/dist/components/item/item';
import BrPagination from '@govbr-ds/core/dist/components/pagination/pagination';
import BrSelect from '@govbr-ds/core/dist/components/select/select';
import BRTable from '@govbr-ds/core/dist/components/table/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent  {
  @Input() dataSearch: boolean = true;
  @Input() dataSelection: boolean = true;
  @Input() dataCollapse: boolean = false;
  @Input() dataRandom: boolean = false;

  instance: any;
  instancePagination: any;
  instanceBrSelect: any;
  instanceBrCheckbox: any;
  instanceBrItem: any;
  instanceBrRadio: any;
  constructor(
    private readonly brTable: ElementRef,
    private readonly brPagination: ElementRef,
    private readonly brSelect: ElementRef,
    private readonly brCheckbox: ElementRef,
    private readonly brItem: ElementRef) {}


  ngAfterViewInit() {

    this.instance = new BRTable('.br-table', this.brTable.nativeElement.querySelector('.br-table'));
    this.instanceBrCheckbox = new BrCheckbox('.br-checkbox', this.brCheckbox.nativeElement.querySelector('.br-checkbox'));
    this.instancePagination = new BrPagination('.br-pagination', this.brPagination.nativeElement.querySelector('.br-pagination'));
    this.instanceBrSelect = new BrSelect('.br-select', this.brSelect.nativeElement.querySelector('.br-select'));
    this.instanceBrItem = new BrItem('.br-item', this.brItem.nativeElement.querySelector('.br-item'));

  }
}
