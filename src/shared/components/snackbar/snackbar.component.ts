import { Component, OnInit, Inject } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';
import { MoviesService } from 'src/shared/services/movies/movies.service';
import { ShowsService } from 'src/shared/services/shows/shows.service';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
})
export class SnackbarComponent implements OnInit {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    private snackBarRef: MatSnackBarRef<SnackbarComponent>,
    private movieService: MoviesService,
    private showService: ShowsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    console.log(this.data);
  }

  undo() {
    this.snackBarRef.dismissWithAction();
  }

  sendRating(event: any) {
    if (this.data.type == 'movie') {
      this.movieService
        .rateMovie(event.target.value, this.data.itemId)
        .subscribe((data: any) => {
          if (data.status_code == 1 || data.status_code == 12) {
            this.snackBar.openFromComponent(SnackbarComponent, {
              data: 'Thanks for sharing your rating with us and the community.',
              duration: 3000,
            });
          }
        });
    }
    if (this.data.type == 'tv') {
      this.showService
        .rateShow(event.target.value, this.data.itemId)
        .subscribe((data: any) => {
          this.snackBar.openFromComponent(SnackbarComponent, {
            data: 'Thanks for sharing your rating with us and the community.',
          });
        });
    }
  }
}
