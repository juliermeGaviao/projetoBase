import { TestBed } from "@angular/core/testing"
import { ActivatedRoute } from "@angular/router"
import { FooterComponent } from "./footer.component"
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core"

describe('FooterComponent', () => {
  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ {provide: ActivatedRoute, useValue: fakeActivatedRoute} ],
      declarations: [FooterComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents()
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(FooterComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })

  it('should license', () => {
    const fixture = TestBed.createComponent(FooterComponent)
    const app = fixture.componentInstance
    expect(app.license).toBeTruthy()
  })
})
