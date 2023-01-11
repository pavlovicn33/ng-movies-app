import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
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
import { Country } from '@angular-material-extensions/select-country';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { Moment } from 'moment';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CountryData } from 'src/shared/models/countryCodes';

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
  minDate = new Date(1874, 1, 1);
  dateStart = new FormControl({ value: moment(1874), disabled: true });
  dateEnd = new FormControl({ value: moment(), disabled: true });
  status: boolean = false;
  @ViewChild('templateBottomSheet') TemplateBottomSheet!: TemplateRef<any>;

  constructor(
    private movieService: MoviesService,
    private tvService: ShowsService,
    private spinner: SpinnerService,
    private bottomSheet: MatBottomSheet
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
    this.getMovies(
      0,
      1,
      this.minDate.getFullYear(),
      this.maxDate.getFullYear()
    );
    this.getMovieGenres();
    this.getTvGenres();
  }

  openTemplateSheetMenu() {
    this.bottomSheet.open(this.TemplateBottomSheet);
  }

  closeTemplateSheetMenu() {
    this.bottomSheet.dismiss();
  }

  onCountrySelected(event: any) {
    console.log(event);
    this.movieService.getLanguageCode(event.alpha2Code).subscribe((data:CountryData) => {
      console.log(data)
    })
  }

  yearSelectedStart(event: Moment, picker: MatDatepicker<any>) {
    const ctrlValue = this.dateStart.value;
    ctrlValue!.year(event.year());
    this.dateStart.setValue(ctrlValue);
    picker.close();
    picker.close();
    if (this.mediaType == 'movie') {
      if (this.dateStart.value?.year() && this.dateEnd.value?.year()) {
        this.movieList = [];
        this.getMovies(
          this.selectedGenre,
          1,
          this.dateStart.value.year(),
          this.dateEnd.value?.year()
        );
      }
    }
    if (this.mediaType == 'tv') {
      if (this.dateStart.value?.year() && this.dateEnd.value?.year()) {
        this.tvList = [];
        this.getTv(
          this.selectedGenre,
          1,
          this.dateStart.value.year(),
          this.dateEnd.value?.year()
        );
      }
    }
  }
  yearSelectedEnd(event: Moment, picker: MatDatepicker<any>) {
    const ctrlValue = this.dateEnd.value;
    ctrlValue!.year(event.year());
    this.dateEnd.setValue(ctrlValue);
    picker.close();
    picker.close();

    if (this.mediaType == 'movie') {
      if (this.dateStart.value?.year() && this.dateEnd.value?.year()) {
        this.status = false;
        this.movieList = [];
        this.getMovies(
          this.selectedGenre,
          1,
          this.dateStart.value.year(),
          this.dateEnd.value.year()
        );
      }
    }

    if (this.mediaType == 'tv') {
      if (this.dateStart.value?.year() && this.dateEnd.value?.year()) {
        this.status = false;
        this.tvList = [];
        this.getTv(
          this.selectedGenre,
          1,
          this.dateStart.value.year(),
          this.dateEnd.value.year()
        );
      }
    }
  }

  onValChange(event: any) {
    this.dateStart = new FormControl({ value: moment(1874), disabled: true });
    this.dateEnd = new FormControl({ value: moment(), disabled: true });
    this.status = false;
    this.selectedGenre = 0;
    this.selectedGenreName = '';
    this.mediaType = event;
    this.movieList = [];
    this.tvList = [];
    if (this.mediaType == 'movie') {
      this.getMovies(
        0,
        1,
        this.minDate.getFullYear(),
        this.maxDate.getFullYear()
      );
      return;
    }
    this.getTv(0, 1, this.minDate.getFullYear(), this.maxDate.getFullYear());
  }

  genreChange(event: any) {
    this.movieList = [];
    this.tvList = [];
    this.selectedGenre = event.value.id;
    if (
      this.mediaType == 'movie' &&
      this.dateStart.value?.year &&
      this.dateEnd.value?.year()
    ) {
      this.getMovies(
        event.value.id,
        1,
        this.dateStart.value.year(),
        this.dateEnd.value.year()
      );
    } else if (
      this.mediaType == 'tv' &&
      this.dateStart.value?.year &&
      this.dateEnd.value?.year()
    ) {
      this.getTv(
        event.value.id,
        1,
        this.dateStart.value.year(),
        this.dateEnd.value.year()
      );
    }
  }

  getMovies(genre: number, page: number, from: number, to: number) {
    this.movieService
      .discoverMovie(genre, page, from, to)
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
        if (this.movieList.length == 0) {
          this.status = true;
        }
      });
  }

  getMovieGenres() {
    this.movieService
      .getMovieGenres()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: Genres) => {
        this.movieGenres = data.genres;
      });
  }

  getTv(genre: number, page: number, from: number, to: number) {
    this.tvService
      .discoverShow(genre, page, from, to)
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
        if (this.tvList.length == 0) {
          this.status = true;
        }
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
      if (this.dateStart.value?.year() && this.dateEnd.value?.year()) {
        this.getMovies(
          this.selectedGenre,
          number,
          this.dateStart.value.year(),
          this.dateEnd.value?.year()
        );
        return;
      }
      return;
    }
    if (mediaType == 'tv') {
      if (this.dateStart.value?.year() && this.dateEnd.value?.year()) {
        this.getTv(
          this.selectedGenre,
          number,
          this.dateStart.value.year(),
          this.dateEnd.value?.year()
        );
        return;
      }
      return;
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
