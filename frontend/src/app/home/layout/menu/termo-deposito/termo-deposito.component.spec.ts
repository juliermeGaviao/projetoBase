/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TermoDepositoComponent } from './termo-deposito.component';

describe('TermoDepositoComponent', () => {
  let component: TermoDepositoComponent;
  let fixture: ComponentFixture<TermoDepositoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermoDepositoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermoDepositoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
