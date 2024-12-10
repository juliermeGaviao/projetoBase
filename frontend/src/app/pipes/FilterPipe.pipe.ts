import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appFilter'
})
export class FilterPipePipe implements PipeTransform {

  transform(items: any, searchText: string): any[] {
    if(!items) return [];

    if(!searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter( it => {
      return (it['numero'].toLowerCase().includes(searchText)
      || it['tipoSolicitacao'].toLowerCase().includes(searchText)
      || it['situacao'].toLowerCase().includes(searchText)
      || it['dataCriacao'].toLowerCase().includes(searchText));
    });
  }
}
