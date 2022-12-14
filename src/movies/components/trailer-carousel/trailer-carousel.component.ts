import { Component, OnInit, Input } from '@angular/core';
import { CarouselPipe } from 'src/shared/pipes/carousel.pipe';

@Component({
  selector: 'app-trailer-carousel',
  templateUrl: './trailer-carousel.component.html',
  styleUrls: ['./trailer-carousel.component.scss'],
})
export class TrailerCarouselComponent implements OnInit {
  @Input()
  data: any;

  constructor(private pipe: CarouselPipe) {}

  ngOnInit(): void {}

  ngOnChanges() {
    this.pipe.emptyPoster(this.data);
  }

  ytUrl(url: string) {
    let embeddedUrl = 'https://www.youtube-nocookie.com/embed/' + url;
    return embeddedUrl;
  }

  loadTrailer(el: any) {
    this.data.forEach((element: any) => {
      element.trailer.status = false;
    });
    el.trailer.status = true;
  }
}
