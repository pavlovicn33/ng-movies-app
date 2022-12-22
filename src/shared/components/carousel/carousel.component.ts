import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResultMovies } from 'src/shared/models/popularMovies';
import { CarouselPipe } from 'src/shared/pipes/carousel.pipe';
import { BookmarkedService } from 'src/shared/services/bookmarked/bookmarked.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  @Input()
  data: any[] = [];
  document!: Observable<any>;

  status: number = 1;

  constructor(
    private pipe: CarouselPipe,
    private snackbar: MatSnackBar,
    private bookmarkService: BookmarkedService
  ) {}

  ngOnInit(): void {}

  ngOnChanges() {
    this.pipe.emptyPoster(this.data);
  }

  addToFavourites(movie: any, number: number) {
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
          data: `${movie.name || movie.title} is already in bookmarks.`,
          duration: 3000,
        });
      }
      if (this.status == 1) {
        this.snackbar.openFromComponent(SnackbarComponent, {
          data: `Added ${movie.name || movie.title} to bookmarks!`,
          duration: 3000,
        });
        this.bookmarkService.addMovie(movie);
        this.status = 3;
      }
    });
  }
}
