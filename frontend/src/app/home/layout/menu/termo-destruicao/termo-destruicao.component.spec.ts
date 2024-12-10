/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TermoDestruicaoComponent } from './termo-destruicao.component';

describe('TermoDestruicaoComponent', () => {
  let component: TermoDestruicaoComponent;
  let fixture: ComponentFixture<TermoDestruicaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermoDestruicaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermoDestruicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
