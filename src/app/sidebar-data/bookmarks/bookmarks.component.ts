import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { SnackbarComponent } from 'src/shared/components/snackbar/snackbar.component';
import { ResultMovies } from 'src/shared/models/popularMovies';
import { ResultShow } from 'src/shared/models/popularTvShows';
import { BookmarkedService } from 'src/shared/services/bookmarked/bookmarked.service';
import { SpinnerService } from 'src/shared/services/spinner/spinner.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss'],
})
export class BookmarksComponent implements OnInit {
  movies: any[] = [];
  shows: any[] = [];
  unsubscribe$ = new Subject<void>()

  page: number = 1;

  constructor(
    private bookmarkService: BookmarkedService,
    private snackbar: MatSnackBar,
    private spinner: SpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.setLoading(true)
    this.getBookmarkedMovies(this.page);
    this.getBookmarkedShows(this.page);
  }

  getBookmarkedMovies(page: number) {
    this.bookmarkService
      .getBookmarkedPaginatedMovies(page).pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: any) => {
        let movie: any[] = [];
        data.forEach((element: any) => {
          if (element.title) {
            movie.push(element);
          }
        });
        this.movies = movie.sort((a: any, b: any) => {
          return b.createdAt - a.createdAt;
        });
        this.spinner.setLoading(false)

      });
  }
  getBookmarkedShows(page: number) {
    this.bookmarkService
      .getBookmarkedPaginatedShows(page).pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: any) => {
        let show: any[] = [];
        data.forEach((element: any) => {
          if (element.name) {
            show.push(element);
          }
        });
        this.shows = show.sort((a: any, b: any) => {
          return b.createdAt - a.createdAt;
        });
      });
  }

  removeDoc(movie: any) {
    this.bookmarkService.removeMovie(movie);
    this.snackbar.openFromComponent(SnackbarComponent, {
      data: `Removed ${movie.title || movie.name} from bookmarks`,
      duration: 3000,
    });
  }

  onScroll() {
    this.page += 1;
    this.getBookmarkedMovies(this.page);
    this.getBookmarkedShows(this.page);
  }
  ngOnDestroy(){
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
  
}
