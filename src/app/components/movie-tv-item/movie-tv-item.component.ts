import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { SnackbarComponent } from 'src/shared/components/snackbar/snackbar.component';
import { Cast, Credits } from 'src/shared/models/cast';
import { Movies, ResultMovies } from 'src/shared/models/popularMovies';
import { ResultShow, Shows } from 'src/shared/models/popularTvShows';
import { Poster, SeasonPosters } from 'src/shared/models/seasonPosters';
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

  similarMovies: ResultMovies[] = [];

  similarShows: ResultShow[] = [];

  seasonNumber: number = 0;

  obj: any[] = [];

  season: number = 0;

  posterUrl: string = '';

  resultEpisodes: any;

  defaultImage:boolean = false

  selectedSeason: any = {
    name: 'Season 1',
    episodes: 0,
  };

  private breakpoints: any = { xs: 2, sm: 3, md: 4, lg: 6 };

  constructor(
    private movieService: MoviesService,
    private dialog: MatDialog,
    private ShowService: ShowsService,
    private breakpointObserver: BreakpointObserver,
    private snackBar: MatSnackBar
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
    let seasonNumber = this.selectedSeason.name.split(' ');
    this.season = Number(seasonNumber[1]);
    this.getTrailer(this.data.id);
    this.getTrailerShow(this.data.id);
    this.getStreamMovie(this.data.id);
    if (this.data.release_date) {
      this.getCastMovie(this.data.id);
      this.getSimilarMovies(this.data.id);
      return;
    }
    if (this.data.first_air_date) {
      this.getImages(this.data.id, 1);
      this.removeExtra();
      this.getSimilarShows(this.data.id);
      this.getCastShow(this.data.id);
      return;
    }
  }

  getImages(id: number, season: number) {
    this.ShowService.getSeasonImages(id, season).subscribe(
      (data: SeasonPosters) => {
        if (data.posters.length == 0) {
          this.defaultImage = true
          return
        }
        this.posterUrl = data.posters[0].file_path;
      }
    );
  }

  changeSeason(event: any) {
    let seasonNumber = event.value.name.split(' ');
    this.season = Number(seasonNumber[1]);
    this.getImages(this.data.id, this.season);
  }

  getSeason(id: number, season: number, ep: number) {
    this.ShowService.getShowStreams(id, season, ep).subscribe(
      (data: Stream) => {
        this.resultEpisodes = data.results;
        this.dialogEpisode(this.resultEpisodes);
      }
    );
  }

  openEpisode(event: any) {
    this.getSeason(this.data.id, this.season, event);
  }

  removeExtra() {
    let status = true;
    this.data.seasons.forEach((element: any, i: any) => {
      if (element.name == 'Specials') {
        status = false;
        return;
      }
      if (status == true) {
        i++;
      }
      let obj: any = {};
      let name = `Season ${i}`;
      let episodes = `${element.episode_count}`;
      obj.name = name;
      obj.episodes = Number(episodes);
      this.obj.push(obj);
    });
    this.selectedSeason = this.obj[0];
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
  dialogMovie(key: string) {
    const dialogRef = this.dialog.open(MovieTrailerDialogComponent, {
      hasBackdrop: true,
      data: {
        url: key,
      },
      backdropClass: 'dialog-bg',
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      this.snackBar.openFromComponent(SnackbarComponent, {
        data: {
          text: 'Did you like the movie? Rate it!',
          itemId: this.data.id,
          type: 'movie',
        },
        duration: 5000,
      });
    });
  }
  dialogEpisode(results: any) {
    const dialogRef = this.dialog.open(MovieTrailerDialogComponent, {
      hasBackdrop: true,
      data: {
        streamLinks: results,
      },
      backdropClass: 'dialog-bg',
    });
  }

  rateShow() {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {
        text: 'Did you like the show? Rate it!',
        itemId: this.data.id,
        type: 'tv',
      },
      duration: 5000,
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
        this.showCast = data.cast;
        return;
      }
      data.cast.length = 5;
      this.showCast = data.cast;
    });
  }

  getSimilarMovies(id: number) {
    this.movieService.getSimilar(id).subscribe((data: Movies) => {
      data.results.length = 18;
      data.results.forEach((el) => {
        el.media_type = 'movie';
        this.similarMovies.push(el);
      });
    });
  }
  getSimilarShows(id: number) {
    this.ShowService.getSimilar(id).subscribe((data: Shows) => {
      data.results.length = 18;
      data.results.forEach((el) => {
        el.media_type = 'tv';
        this.similarShows.push(el);
      });
    });
  }
}
