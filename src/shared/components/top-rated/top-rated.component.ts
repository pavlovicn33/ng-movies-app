import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResultMovies } from 'src/shared/models/popularMovies';
import { CarouselPipe } from 'src/shared/pipes/carousel.pipe';
import { BookmarkedService } from 'src/shared/services/bookmarked/bookmarked.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-top-rated',
  templateUrl: './top-rated.component.html',
  styleUrls: ['./top-rated.component.scss'],
})
export class TopRatedComponent implements OnInit {
  @Input()
  data: any;
  status: number = 1;
  document!: Observable<any>;
  constructor(
    private snackbar: MatSnackBar,
    private bookmarkService: BookmarkedService
  ) {}

  ngOnInit(): void {}

  addToFavourites(movie: ResultMovies, number: number) {
    this.status = number;
    this.document = this.bookmarkService.getMovies();
    this.document.subscribe((data: any) => {
      if (this.status == 3) {
        return;
      }
      data.forEach((element: any) => {
        if (movie.id == element.id) {
          this.status = 2;
        }
      });
      if (this.status == 2) {
        this.status = 3;
        this.snackbar.openFromComponent(SnackbarComponent, {
          data: 'Movie is already in bookmarks.',
          duration: 3000,
        });
      }
      if (this.status == 1) {
        this.snackbar.openFromComponent(SnackbarComponent, {
          data: 'Added to bookmarks!',
          duration: 3000,
        });
        this.bookmarkService.addMovie(movie);
        this.status = 3;
      }
    });
  }
}
