import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CarouselPipe } from 'src/shared/pipes/carousel.pipe';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  @Input()
  data: any[] = [];

  constructor(private pipe: CarouselPipe, private snackbar: MatSnackBar) {}

  ngOnInit(): void {}

  ngOnChanges() {
    this.pipe.emptyPoster(this.data);
  }

  addToFavourites() {
    this.snackbar.openFromComponent(SnackbarComponent, {
      data: 'Added to favourites!',
      duration: 3000,
    });
  }
}
