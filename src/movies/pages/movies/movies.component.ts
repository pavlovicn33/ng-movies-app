import { Component, OnInit } from '@angular/core';
import { Movies, ResultMovies } from 'src/shared/models/popularMovies';
import { Videos } from 'src/shared/models/videos';
import { CarouselPipe } from 'src/shared/pipes/carousel.pipe';
import { MoviesService } from 'src/shared/services/movies/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  movies: any[] = [];

  upcomingMovies: ResultMovies[] = [];

  page: number = 1;

  pageTop: number = 1;

  trailerList: Videos[] = [];

  status: boolean = false;

  topRated: ResultMovies[] = [];

  constructor(
    private movieService: MoviesService,
    private pipe: CarouselPipe
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getUpcomingMovies(this.page);
    this.getTopRated(this.pageTop);
  }

  getMovies() {
    this.movieService.getPopularMovies().subscribe((data: Movies) => {
      this.movies = data.results;
      this.pipe.emptyPoster(this.movies);
    });
  }
  getUpcomingMovies(page: number) {
    let dateToday = new Date();
    this.movieService.getUpcomingMovies(page).subscribe((data: Movies) => {
      this.upcomingMovies = data.results.filter((el) => {
        if (
          new Date(el.release_date) > dateToday &&
          !el.genre_ids.includes(16)
        ) {
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
    this.movieService.getTrailers(el.id).subscribe((data: Videos) => {
      if (data.results.length >= 1) {
        data.results.forEach((ele) => {
          if (ele.type == 'Trailer') {
            el.trailer = ele;
            ele.status = false;
            this.trailerList.push(el);
          }
        });
        this.pipe.emptyPoster(this.trailerList);
        this.trailerList = [...new Set(this.trailerList)];
        return;
      }
    });
  }

  getTopRated(pageTop: number) {
    this.movieService.getTopRated(pageTop).subscribe((data: Movies) => {
      data.results.forEach((el) => {
        if (!el.genre_ids.includes(16)) {
          if (this.topRated.length == 20) {
            return;
          }
          this.topRated.push(el);
        }
      });
      if (this.topRated.length < 20) {
        this.pageTop += 1;
        this.getTopRated(this.pageTop);
      }
    });
  }
}
