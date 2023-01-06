import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Movies, ResultMovies } from 'src/shared/models/popularMovies';
import { CarouselPipe } from 'src/shared/pipes/carousel.pipe';
import { MoviesService } from 'src/shared/services/movies/movies.service';

@Component({
  selector: 'app-all-movies',
  templateUrl: './all-movies.component.html',
  styleUrls: ['./all-movies.component.scss'],
})
export class AllMoviesComponent implements OnInit {
  movies: Movies;
  results: ResultMovies[] = [];
  unsubscribe$ = new Subject<void>();

  constructor(private movieService: MoviesService, private pipe: CarouselPipe) {
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
    this.movieService.getPopularMoviesList(number).pipe(takeUntil(this.unsubscribe$)).subscribe((data: any) => {
      this.movies = data;
      data.results.forEach((element: any) => {
        if (!element.media_type) {
          if (element.name) {
            element.media_type = 'tv';
          } else {
            element.media_type = 'movie';
          }
          this.results.push(element);
        }
      });
      this.pipe.emptyPoster(this.results);
    });
  }

  sendPage(number: number) {
    this.getMovies(number);
  }

  ngOnDestroy(){
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
  
}
