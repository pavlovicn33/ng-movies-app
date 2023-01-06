import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookmarkedService } from 'src/shared/services/bookmarked/bookmarked.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-library-items',
  templateUrl: './library-items.component.html',
  styleUrls: ['./library-items.component.scss'],
})
export class LibraryItemsComponent {
  private breakpoints: any = { xs: 2, sm: 3, md: 4, lg: 6 };
  @Input()
  actor: string = '';
  cols!: number;
  @Input()
  data: any;
  @Input()
  movies!: any[];
  @Input()
  shows!: any[];
  bookmarked: any[] = [];

  status: number = 1;

  start!: number;
  end!: number;
  pageSize: number = 10;
  @Output()
  remove: EventEmitter<any> = new EventEmitter();

  constructor(
    private breakpointObserver: BreakpointObserver,
    private bookmarkService: BookmarkedService,
    private snackbar: MatSnackBar
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
    this.getBookmarked()
  }

  removeFromFavourites(movie: any) {
    this.remove.emit(movie);
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
  
  getBookmarked() {
    this.bookmarkService.getMovies().subscribe((data: any) => {
      this.bookmarked = data;
    });
  }
}
