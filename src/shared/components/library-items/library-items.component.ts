import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatGridList } from '@angular/material/grid-list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Movies, ResultMovies } from 'src/shared/models/popularMovies';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { map, Observable } from 'rxjs';
import { BookmarkedService } from 'src/shared/services/bookmarked/bookmarked.service';
import { SpinnerService } from 'src/shared/services/spinner/spinner.service';
import { ResultShow } from 'src/shared/models/popularTvShows';
import { collectionData } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-library-items',
  templateUrl: './library-items.component.html',
  styleUrls: ['./library-items.component.scss'],
})
export class LibraryItemsComponent {
  private breakpoints: any = { xs: 2, sm: 3, md: 4, lg: 6 };

  cols!: number;

  @Input()
  movies: any[] = [];
  @Input()
  shows: any[] = [];

  status: number = 1;
  document!: Observable<any>;

  @Output()
  getData: EventEmitter<number> = new EventEmitter();

  constructor(
    private breakpointObserver: BreakpointObserver,
    private bookmarkService: BookmarkedService
  ) {
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

  ngOnInit(): void {
    this.onScroll();
  }

  onScroll() {
    // this.data.page += 1;
    // if (this.data.page != this.data.total_pages) {
    //   this.nextPage.emit(this.data.page);
    // }
  }

  removeFromFavourites(movie: any) {
    this.bookmarkService.removeMovie(movie);
    this.getData.emit()
  }
}
