import { Component, OnInit } from '@angular/core';
import { ResultShow, Shows } from 'src/shared/models/popularTvShows';
import { CarouselPipe } from 'src/shared/pipes/carousel.pipe';
import { AnimationsService } from 'src/shared/services/animations/animations.service';

@Component({
  selector: 'app-all-animations-shows',
  templateUrl: './all-animations-shows.component.html',
  styleUrls: ['./all-animations-shows.component.scss'],
})
export class AllAnimationsShowsComponent implements OnInit {
  shows: Shows;
  results: ResultShow[] = [];

  constructor(
    private animationService: AnimationsService,
    private pipe: CarouselPipe
  ) {
    this.shows = {
      page: 1,
      total_pages: 1,
      results: [],
      total_results: 1,
    };
  }

  ngOnInit(): void {
    this.getShows();
  }
  getShows(number?: number) {
    this.animationService.getAnimationShowsList(number).subscribe((data: Shows) => {
      this.shows = data;
      data.results.forEach((element) => {
        this.results.push(element);
      });
      this.pipe.emptyPoster(this.results);
    });
  }

  sendPage(number: number) {
    this.getShows(number);
  }
}
