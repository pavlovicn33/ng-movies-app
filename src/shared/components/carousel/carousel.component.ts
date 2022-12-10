import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit{

  @Input()
  data:any[] = []

  constructor() {}

  ngOnInit(): void {
    this.emptyPoster(this.data)
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
