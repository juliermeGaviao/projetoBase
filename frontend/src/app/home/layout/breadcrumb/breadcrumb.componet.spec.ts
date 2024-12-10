import { TestBed } from "@angular/core/testing";
import { BreadcrumbComponent } from "./breadcrumb.component";
import { ActivatedRoute } from "@angular/router";

describe('BreadcrumbComponent', () => {
  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ {provide: ActivatedRoute, useValue: fakeActivatedRoute} ],
      declarations: [BreadcrumbComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(BreadcrumbComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'dsgov-angular-demo'`, () => {
    const fixture = TestBed.createComponent(BreadcrumbComponent);
    const app = fixture.componentInstance;
    expect(app.showBreadcrumb).toBeFalsy();
  });

  it('should logo', () => {
    const fixture = TestBed.createComponent(BreadcrumbComponent);
    const app = fixture.componentInstance;
    expect(app.showBreadcrumb).toBeFalsy();
  });
});
