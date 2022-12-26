import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchMovie'
})
export class SearchMoviePipe implements PipeTransform {

  transform(moviesList: any[], searchString: string): any {
    if (!moviesList) {
      return [];
    }
    if (!searchString) {
      return moviesList;
    }
    searchString = searchString.toLocaleLowerCase();

    return moviesList.filter(val => {
      return val.title.toLocaleLowerCase().includes(searchString);
    });
  }

}
