import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Genres } from 'src/shared/models/genres';
import { Genre } from 'src/shared/models/movieDetails';
import { Movies, ResultMovies } from 'src/shared/models/popularMovies';
import { ResultShow, Shows } from 'src/shared/models/popularTvShows';
import { MoviesService } from 'src/shared/services/movies/movies.service';
import { ShowsService } from 'src/shared/services/shows/shows.service';
import { SpinnerService } from 'src/shared/services/spinner/spinner.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss'],
})
export class DiscoverComponent implements OnInit {
  unsubscribe$ = new Subject<void>();
  mediaType: string = 'movie';
  movieData: any;
  tvData: any;
  movieList: ResultMovies[] = [];
  tvList: ResultShow[] = [];
  movieGenres: Genre[] = [];
  tvGenres: Genre[] = [];
  selectedGenreName: string = '';
  selectedGenre: number = 0;

  constructor(
    private movieService: MoviesService,
    private tvService: ShowsService,
    private spinner: SpinnerService
  ) {
    this.movieData = {
      page: 1,
      total_pages: 1,
      results: [],
      total_results: 1,
      browse: false,
    };
    this.tvData = {
      page: 1,
      total_pages: 1,
      results: [],
      total_results: 1,
      browse: false,
      tv: true,
    };
  }

  ngOnInit(): void {
    this.spinner.setLoading(true);
    this.getMovies(0, 1);
    this.getMovieGenres();
    this.getTvGenres();
  }

  onValChange(event: any) {
    this.selectedGenre = 0
    this.selectedGenreName = ''
    this.mediaType = event;
    this.movieList = [];
    this.tvList = [];
    this.getMovies(0, 1);
    this.getTv(0, 1);
  }

  genreChange(event: any) {
    this.movieList = [];
    this.tvList = [];
    this.selectedGenre = event.value.id;
    if (this.mediaType == 'movie') {
      this.getMovies(event.value.id, 1);
    } else if (this.mediaType == 'tv') {
      this.getTv(event.value.id, 1);
    }
    console.log(event);
  }

  getMovies(genre: number, page: number) {
    this.movieService
      .discoverMovie(genre, page)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: Movies) => {
        this.movieData = data;
        data.results.forEach((el) => {
          if (!el.poster_path) {
            return;
          }
          el.media_type = 'movie';
          this.movieList.push(el);
        });
      });
    this.spinner.setLoading(false);
  }

  getMovieGenres() {
    this.movieService
      .getMovieGenres()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: Genres) => {
        this.movieGenres = data.genres;
      });
  }

  getTv(genre: number, page: number) {
    this.tvService
      .discoverShow(genre, page)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: Shows) => {
        this.tvData = data;
        data.results.forEach((el) => {
          if (!el.poster_path) {
            return;
          }
          el.media_type = 'tv';
          this.tvList.push(el);
        });
      });
  }

  getTvGenres() {
    this.tvService
      .getTvGenres()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: Genres) => {
        this.tvGenres = data.genres;
      });
  }

  sendPage(number: number, mediaType: string) {
    console.log(number);
    if (mediaType == 'movie') {
      this.getMovies(this.selectedGenre, number);
      return;
    }
    if (mediaType == 'tv') {
      this.getTv(this.selectedGenre, number);
      return;
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
