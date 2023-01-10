import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Genres } from 'src/shared/models/genres';
import { Movies, ResultMovies } from 'src/shared/models/popularMovies';
import { ResultShow, Shows } from 'src/shared/models/popularTvShows';
import { MoviesService } from 'src/shared/services/movies/movies.service';
import { ShowsService } from 'src/shared/services/shows/shows.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss'],
})
export class GenreComponent implements OnInit {
  unsubscribe$ = new Subject<void>();

  movieList: ResultMovies[] = [];

  showList: ResultShow[] = [];

  genre: number = 0;

  showData!: Shows;

  movieData!: Movies;

  constructor(
    private router: ActivatedRoute,
    private movieService: MoviesService,
    private showService: ShowsService,
    private routers:Router
  ) {}



  ngOnInit(): void {
    this.routers.events.subscribe((data:any) => {
      this.movieList = []
      this.showList = []
    })
    this.router.params.subscribe((data: any) => {
      let genre = data['genre'].split(' ');
      let genreFix = genre
        .map((word: any) => {
          return word[0].toUpperCase() + word.substring(1);
        })
        .join(' ');

      this.movieService
        .getMovieGenres()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((data: Genres) => {
          data.genres.forEach((el) => {
            if (el.name == genreFix) {
              this.genre = el.id;
              this.getMovies(el.id);
            }
          });
        });

      this.showService
        .getTvGenres()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((data: Genres) => {
          data.genres.forEach((el) => {
            if (el.name == genreFix) {
              this.getShows(el.id);
            }
          });
        });
    });
  }
  getMovies(genre: number, page?: number) {
    this.movieService
      .discoverMovie(genre, page,1874, new Date().getFullYear())
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: Movies) => {
        this.movieData = data;
        data.results.forEach((el, i) => {
          if (!el.poster_path) {
            return;
          }
          el.media_type = 'movie';
          this.movieList.push(el);
        });
      });
  }

  getShows(genre: number, page?: number) {
    this.showService
      .discoverShow(genre, page,1874, new Date().getFullYear())
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: Shows) => {
        this.showData = data;
        data.results.forEach((el, i) => {
          if (!el.poster_path) {
            return;
          }
          el.media_type = 'tv';
          this.showList.push(el);
        });
      });
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onScroll() {
    if (this.showList.length != 0) {
      this.showData.page += 1;
      if (this.showData.page != this.showData.total_pages) {
        this.getShows(this.genre, this.showData.page);
      }
    }
    if (this.movieList.length != 0) {
      this.movieData.page += 1;
      if (this.movieData.page != this.movieData.total_pages) {
        this.getMovies(this.genre, this.movieData.page);
      }
    }
  }
}
