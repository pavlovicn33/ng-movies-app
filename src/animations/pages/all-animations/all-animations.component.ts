import { Component, OnInit } from '@angular/core';
import { Movies, ResultMovies } from 'src/shared/models/popularMovies';
import { ResultShow, Shows } from 'src/shared/models/popularTvShows';
import { CarouselPipe } from 'src/shared/pipes/carousel.pipe';
import { AnimationsService } from 'src/shared/services/animations/animations.service';

@Component({
  selector: 'app-all-animations',
  templateUrl: './all-animations.component.html',
  styleUrls: ['./all-animations.component.scss'],
})
export class AllAnimationsComponent implements OnInit {
  movies: Movies;
  results: ResultMovies[] = [];
  constructor(
    private animationService: AnimationsService,
    private pipe: CarouselPipe
  ) {
    this.movies = {
      page: 1,
      total_pages: 1,
      results: [],
      total_results: 1,
    };
  }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(number?: number) {
    this.animationService
      .getAnimationMovies(number)
      .subscribe((data: Movies) => {
        this.movies = data;
        data.results.forEach((element) => {
          this.results.push(element);
        });
        this.pipe.emptyPoster(this.results);
      });
  }

  sendPage(number: number) {
    this.getMovies(number);
  }
}
