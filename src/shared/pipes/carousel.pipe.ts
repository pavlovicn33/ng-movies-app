import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'carousel'
})
export class CarouselPipe implements PipeTransform {

  transform() {
  }

  emptyPoster(list: any[]) {
    let e = list.map((el) => el.poster_path);
    e.forEach((el, i) => {
      if (!el) {
        list.splice(i, 1);
      }
    });
    let eBack = list.map((el) => el.backdrop_path);
    eBack.forEach((el, i) => {
      if (!el) {  
        list.splice(i, 1);
      }
    });

  }

}
