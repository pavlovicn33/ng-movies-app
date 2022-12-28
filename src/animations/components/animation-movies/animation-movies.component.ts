import { Component, OnInit } from '@angular/core';
import { Movies, ResultMovies } from 'src/shared/models/popularMovies';
import { Videos } from 'src/shared/models/videos';
import { CarouselPipe } from 'src/shared/pipes/carousel.pipe';
import { AnimationsService } from 'src/shared/services/animations/animations.service';

@Component({
  selector: 'app-animation-movies',
  templateUrl: './animation-movies.component.html',
  styleUrls: ['./animation-movies.component.scss'],
})
export class AnimationMoviesComponent implements OnInit {
  movies: ResultMovies[] = [];
  topRated: ResultMovies[] = [];

  upcomingMovies: ResultMovies[] = [];

  page: number = 1;

  trailerList: Videos[] = [];

  constructor(
    private animationsService: AnimationsService,
    private pipe: CarouselPipe
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getTopRated();
    this.getUpcomingMovies(this.page);
  }

  getMovies() {
    this.animationsService.getAnimationMovies().subscribe((data: Movies) => {
      data.results.forEach((el) => {
        el.media_type = 'movie';
        this.movies.push(el);
      });
      this.pipe.emptyPoster(this.movies);
    });
  }

  getTopRated() {
    this.animationsService.getTopRatedMovies().subscribe((data: Movies) => {
      data.results.forEach((el) => {
        el.media_type = 'movie';
        this.topRated.push(el);
      });
      this.pipe.emptyPoster(this.topRated);
    });
  }

  getUpcomingMovies(page: number) {
    let dateToday = new Date();
    this.animationsService
      .getUpcomingAnimatedMovies(page)
      .subscribe((data: Movies) => {
        this.upcomingMovies = data.results.filter((el) => {
          if (new Date(el.release_date) > dateToday) {
            return el;
          }
          return;
        });
        if (this.trailerList.length < 10 && this.page <= data.total_pages) {
          this.page += 1;
          this.getUpcomingMovies(this.page);
          this.upcomingMovies.forEach((el) => {
            this.getTrailers(el);
          });
          return;
        }
      });
  }

  getTrailers(el: any) {
    this.animationsService
      .getTrailersMovies(el.id)
      .subscribe((data: Videos) => {
        if (data.results.length >= 1) {
          data.results.forEach((ele) => {
            if (ele.type == 'Trailer') {
              ele.status = false;
              el.trailer = ele;
            }
          });
          this.trailerList.push(el);
          this.pipe.emptyPoster(this.trailerList);
          const uniqueArray = this.trailerList.filter((value, index) => {
            const _value = JSON.stringify(value);
            return (
              index ===
              this.trailerList.findIndex((obj) => {
                return JSON.stringify(obj) === _value;
              })
            );
          });
          this.trailerList = uniqueArray;
          return;
        }
      });
  }
}
