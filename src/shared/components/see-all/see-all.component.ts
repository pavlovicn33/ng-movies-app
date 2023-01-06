import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatGridList } from '@angular/material/grid-list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Movies, ResultMovies } from 'src/shared/models/popularMovies';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { map, Observable } from 'rxjs';
import { BookmarkedService } from 'src/shared/services/bookmarked/bookmarked.service';
import { SpinnerService } from 'src/shared/services/spinner/spinner.service';
import { debounce } from 'lodash';

@Component({
  selector: 'app-see-all',
  templateUrl: './see-all.component.html',
  styleUrls: ['./see-all.component.scss'],
})
export class SeeAllComponent implements OnInit {
  private breakpoints: any = { xs: 2, sm: 3, md: 4, lg: 6 };

  cols!: number;

  @Input()
  data: any;
  @Input()
  results: any[] = [];
  bookmarked: any[] = [];
  status: number = 1;
  document!: Observable<any>;

  subscribe!: Observable<any>;

  @Output()
  nextPage: EventEmitter<number> = new EventEmitter();

  constructor(
    private breakpointObserver: BreakpointObserver,
    private snackbar: MatSnackBar,
    private spinnerService: SpinnerService,
    private bookmarkService: BookmarkedService
  ) {
    this.data = {
      page: 1,
      total_pages: 1,
      results: this.results,
      total_results: 1,
    };

    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
      ])
      .subscribe((result) => {
        if (result.matches) {
          if (result.breakpoints[Breakpoints.XSmall]) {
            this.cols = this.breakpoints.xs;
          }
          if (result.breakpoints[Breakpoints.Small]) {
            this.cols = this.breakpoints.sm;
          }
          if (result.breakpoints[Breakpoints.Medium]) {
            this.cols = this.breakpoints.md;
          }
          if (result.breakpoints[Breakpoints.Large]) {
            this.cols = this.breakpoints.lg;
          }
        }
      });
  }

  getBookmarked() {
    this.bookmarkService.getMovies().subscribe((data: any) => {
      this.bookmarked = data;
    });
  }

  ngOnInit(): void {
    this.getBookmarked();
    if (this.data.browse) {
      return;
    }
    this.onScroll();
  }

  onScroll() {
    this.data.page += 1;
    if (this.data.page != this.data.total_pages) {
      this.nextPage.emit(this.data.page);
    }
  }

  addToFavourites(movie: any, number: number) {
    this.status = number;
    if (this.status == 3) {
      return;
    }
    this.bookmarked.forEach((element: any) => {
      if (movie.id == element.id && movie.media_type == element.media_type) {
        this.status = 2;
      }
    });
    if (this.status == 2) {
      this.status = 3;
      this.snackbar.openFromComponent(SnackbarComponent, {
        data: `${movie.name || movie.title} is already in bookmarks.`,
        duration: 2500,
      });
    }
    if (this.status == 1) {
      this.status = 3;
      this.bookmarkService.addMovie(movie);
      this.snackbar.openFromComponent(SnackbarComponent, {
        data: `Added ${movie.name || movie.title} to bookmarks!`,
        duration: 2500,
      });
    }
  }
}
