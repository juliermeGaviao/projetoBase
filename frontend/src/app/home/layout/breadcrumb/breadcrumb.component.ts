import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../services/breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  template: `
    <br-breadcrumb *ngIf="showBreadcrumb" label="Breadcrumb" [links]="links"></br-breadcrumb>
  `,
})
export class BreadcrumbComponent implements OnInit {
  showBreadcrumb = false;
  links: { label: string; url: string; home?: boolean }[] = [];

  constructor(private readonly breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {
    this.breadcrumbService.breadcrumb$.subscribe((links) => {
      this.links = links;
      this.showBreadcrumb = this.links.length > 1;
    });
  }
}
