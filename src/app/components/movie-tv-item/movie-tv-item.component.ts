import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { MoviesService } from 'src/shared/services/movies/movies.service';
import { ShowsService } from 'src/shared/services/shows/shows.service';
import { MovieTrailerDialogComponent } from '../movie-trailer-dialog/movie-trailer-dialog.component';

@Component({
  selector: 'app-movie-tv-item',
  templateUrl: './movie-tv-item.component.html',
  styleUrls: ['./movie-tv-item.component.scss'],
})
export class MovieTvItemComponent implements OnInit {
  @Input()
  data: any;

  trailerLink: string = '';

  constructor(
    private movieService: MoviesService,
    private dialog: MatDialog,
    private ShowService: ShowsService
  ) {}

  ngOnInit(): void {
    this.getTrailer(this.data.id);
    this.getTrailerShow(this.data.id);
    this.getStreamMovie(this.data.id)
  }

  getTrailer(id: number) {
    if (this.data.media_type == 'tv') {
      return;
    }
    this.movieService.getTrailers(id).subscribe((data: any) => {
      data.results.forEach((element: any) => {
        if (element.type == 'Trailer' && element.site == 'YouTube') {
          this.trailerLink = element.key;
        }
      });
    });
  }

  getTrailerShow(id: number) {
    if (this.data.media_type == 'movie') {
      return;
    }
    this.ShowService.getTrailers(id).subscribe((data: any) => {
      data.results.forEach((element: any) => {
        if (element.type == 'Trailer' && element.site == 'YouTube') {
          this.trailerLink = element.key;
        }
      });
    });
  }
  dialogTrailer() {
    const dialogRef = this.dialog.open(MovieTrailerDialogComponent, {
      hasBackdrop: true,
      data: {
        link: this.trailerLink,
      },
      backdropClass: 'dialog-bg',
    });
  }

  getStreamMovie(id:number){
    this.movieService.getMovieStream(id).subscribe((data:any)=>{
      console.log(data)
    })
  }
}
