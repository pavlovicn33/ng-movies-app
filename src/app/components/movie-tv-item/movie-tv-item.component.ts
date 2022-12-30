import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Cast, Credits } from 'src/shared/models/cast';
import { Movies, ResultMovies } from 'src/shared/models/popularMovies';
import { ResultShow, Shows } from 'src/shared/models/popularTvShows';
import { Stream, StreamMovieTv } from 'src/shared/models/stream';
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
  cols!: number;

  trailerLink: string = '';

  streamLinks: StreamMovieTv[] = [];

  movieCast: Cast[] = [];

  showCast: Cast[] = [];

  similarMovies:ResultMovies[] = []
  similarShows:ResultShow[] = []
  private breakpoints: any = { xs: 2, sm: 3, md: 4, lg: 6 };

  constructor(
    private movieService: MoviesService,
    private dialog: MatDialog,
    private ShowService: ShowsService,
    private breakpointObserver: BreakpointObserver,

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
    this.getTrailer(this.data.id);
    this.getTrailerShow(this.data.id);
    this.getStreamMovie(this.data.id);
    if (this.data.release_date) {
      this.getCastMovie(this.data.id);
      this.getSimilarMovies(this.data.id)
      return;
    }
    if (this.data.first_air_date) {
      this.getSimilarShows(this.data.id)
      this.getCastShow(this.data.id);
      return;
    }
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
    console.log(this.data);
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
  dialogMovie(key: string) {
    const dialogRef = this.dialog.open(MovieTrailerDialogComponent, {
      hasBackdrop: true,
      data: {
        url: key,
      },
      backdropClass: 'dialog-bg',
    });
  }

  getStreamMovie(id: number) {
    this.movieService.getMovieStream(id).subscribe((data: Stream) => {
      this.streamLinks = data.results;
    });
  }

  getCastMovie(id: number) {
    this.movieService.getMovieCast(id).subscribe((data: Credits) => {
      data.cast.length = 5;
      this.movieCast = data.cast;
    });
  }

  getCastShow(id: number) {
    this.ShowService.getShowCast(id).subscribe((data: Credits) => {
      if (data.cast.length < 5) {
        this.showCast = data.cast
        return
      }
      data.cast.length = 5;
      this.showCast = data.cast;
    });
  }

  getSimilarMovies(id:number){
    this.movieService.getSimilar(id).subscribe((data:Movies) => {
      data.results.length = 18
      data.results.forEach(el => {
        el.media_type = 'movie'
        this.similarMovies.push(el)
      })
    })
  }
  getSimilarShows(id:number){
    this.ShowService.getSimilar(id).subscribe((data:Shows) => {
      data.results.length = 18
      data.results.forEach(el => {
        el.media_type = 'tv'
        this.similarShows.push(el)
      })
    })
  }
}
