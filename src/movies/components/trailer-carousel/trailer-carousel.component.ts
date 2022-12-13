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

  constructor() {}

  ngOnInit(): void {
  }
}
