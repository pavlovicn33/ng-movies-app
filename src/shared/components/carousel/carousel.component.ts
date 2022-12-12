import { Component, OnInit, Input } from '@angular/core';
import { CarouselPipe } from 'src/shared/pipes/carousel.pipe';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit{

  @Input()
  data:any[] = []

  constructor(private pipe:CarouselPipe) {}

  ngOnInit(): void {
    this.pipe.emptyPoster(this.data)
  }

  addToFavourites(){
  }
}
