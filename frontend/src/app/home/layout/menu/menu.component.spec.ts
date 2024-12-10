import { TestBed } from "@angular/core/testing";
import { MenuComponent } from "./menu.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BreadcrumbComponent } from "../../breadcrumb/breadcrumb.component";

describe('MenuComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MenuComponent,
        BreadcrumbComponent 
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA], 
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(MenuComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
