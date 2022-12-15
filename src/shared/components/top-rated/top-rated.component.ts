import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CarouselPipe } from 'src/shared/pipes/carousel.pipe';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-top-rated',
  templateUrl: './top-rated.component.html',
  styleUrls: ['./top-rated.component.scss']
})
export class TopRatedComponent implements OnInit {
  @Input()
  data: any;

  constructor( private snackbar: MatSnackBar) {}

  ngOnInit(): void {
  }

  addToFavourites() {
    this.snackbar.openFromComponent(SnackbarComponent, {
      data: 'Added to favourites!',
      duration: 3000,
    });
  }
}
