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

  }

}
