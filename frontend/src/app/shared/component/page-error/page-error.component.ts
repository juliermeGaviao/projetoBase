import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-error',
  templateUrl: './page-error.component.html',
})
export class PageErrorComponent implements OnInit {

  @Input() messageError: string = 'Estamos constrangidos em te ver por aqui';
  @Input() descriptionError: string = 'Talvez você tenha se equivocado ao digitar o endereço URL ou quem sabe nós tenhamos cometido uma falha por aqui.';

  constructor() { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
