import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';
import { Genres } from 'src/shared/models/genres';
import { Genre } from 'src/shared/models/movieDetails';
import { Movies, ResultMovies } from 'src/shared/models/popularMovies';
import { ResultShow, Shows } from 'src/shared/models/popularTvShows';
import { MoviesService } from 'src/shared/services/movies/movies.service';
import { ShowsService } from 'src/shared/services/shows/shows.service';
import { SpinnerService } from 'src/shared/services/spinner/spinner.service';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { Moment } from 'moment';

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
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
  maxDate = new Date();

  dateStart = new FormControl({value: moment(), disabled:true});

  dateEnd = new FormControl({value: moment(), disabled:true});

  
  constructor(
    private movieService: MoviesService,
    private tvService: ShowsService,
    private spinner: SpinnerService,
    private router: Router
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

  yearSelectedStart(event: Moment, picker: MatDatepicker<any>) {

    // const ctrlValue = this.dateStart.value;
    // ctrlValue!.year(event.year());
    // this.dateStart.setValue(ctrlValue);
    // picker.close();
    // console.log(this.dateStart.value?.year());    
    // picker.close()
  }
  yearSelectedEnd(event: Moment, picker: MatDatepicker<any>) {
    // const ctrlValue = this.dateStart.value;
    // ctrlValue!.year(event.year());
    // this.dateEnd.setValue(ctrlValue);
    // picker.close();
    // console.log(this.dateEnd.value?.year());    
    // picker.close()
  }

  onValChange(event: any) {
    this.selectedGenre = 0;
    this.selectedGenreName = '';
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
