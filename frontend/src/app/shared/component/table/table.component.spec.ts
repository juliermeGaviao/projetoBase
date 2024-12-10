import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';

jest.mock('@govbr-ds/core/dist/components/checkbox/checkbox', () => jest.fn());
jest.mock('@govbr-ds/core/dist/components/item/item', () => jest.fn());
jest.mock('@govbr-ds/core/dist/components/pagination/pagination', () => jest.fn());
jest.mock('@govbr-ds/core/dist/components/select/select', () => jest.fn());
jest.mock('@govbr-ds/core/dist/components/table/table', () => jest.fn());

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default @Input properties set correctly', () => {
    expect(component.dataSearch).toBe(true);
    expect(component.dataSelection).toBe(true);
    expect(component.dataCollapse).toBe(false);
    expect(component.dataRandom).toBe(false);
  });
});
