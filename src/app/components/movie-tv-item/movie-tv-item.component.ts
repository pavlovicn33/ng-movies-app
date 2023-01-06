import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';
import { SnackbarComponent } from 'src/shared/components/snackbar/snackbar.component';
import { Cast, Credits } from 'src/shared/models/cast';
import { Movies, ResultMovies } from 'src/shared/models/popularMovies';
import { ResultShow, Shows } from 'src/shared/models/popularTvShows';
import { SeasonPosters } from 'src/shared/models/seasonPosters';
import { Stream, StreamMovieTv } from 'src/shared/models/stream';
import { CarouselPipe } from 'src/shared/pipes/carousel.pipe';
import { MoviesService } from 'src/shared/services/movies/movies.service';
import { RecentService } from 'src/shared/services/recent/recent.service';
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

  defaultImage: boolean = false;

  unsubscribe$ = new Subject<void>();

  recent: any[] = [];

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
    private snackBar: MatSnackBar,
    private router: Router,
    private recentService: RecentService
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

  ngOnChanges() {
    this.getRecent();
    this.posterUrl = '';
    this.trailerLink = '';
    this.defaultImage = false;
    this.obj = [];
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
      this.getCastShow(this.data.id);
      this.getImages(this.data.id, 1);
      this.removeExtra();
      this.getSimilarShows(this.data.id);
      return;
    }
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        let e = document.querySelector('.mat-drawer-content');
        if (e) {
          e.scrollTop = 0;
        }
      });
  }

  getImages(id: number, season: number) {
    this.defaultImage = false;
    this.ShowService.getSeasonImages(id, season)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: SeasonPosters) => {
        if (data.posters.length == 0) {
          this.defaultImage = true;
          return;
        }
        this.posterUrl = data.posters[0].file_path;
      });
  }

  changeSeason(event: any) {
    let seasonNumber = event.value.name.split(' ');
    this.season = Number(seasonNumber[1]);
    this.getImages(this.data.id, this.season);
  }

  getSeason(id: number, season: number, ep: number) {
    this.ShowService.getShowStreams(id, season, ep)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: Stream) => {
        this.resultEpisodes = data.results;
        this.dialogEpisode(this.resultEpisodes);
      });
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
    this.movieService
      .getTrailers(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: any) => {
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
    this.ShowService.getTrailers(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: any) => {
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
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: any) => {
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
    this.movieService
      .getMovieStream(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: Stream) => {
        this.streamLinks = data.results;
      });
  }

  getCastMovie(id: number) {
    this.movieService
      .getMovieCast(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: Credits) => {
        if (data.cast.length < 5) {
          this.movieCast = data.cast;
          return;
        }
        data.cast.length = 5;
        this.movieCast = data.cast;
      });
  }

  getCastShow(id: number) {
    this.ShowService.getShowCast(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: Credits) => {
        if (data.cast.length < 5) {
          this.showCast = data.cast;
          return;
        }
        data.cast.length = 5;
        this.showCast = data.cast;
      });
  }

  getSimilarMovies(id: number) {
    this.movieService
      .getSimilar(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: Movies) => {
        data.results.forEach((el, i) => {
          if (!el.poster_path) {
            return;
          }
          el.media_type = 'movie';
        });
        this.similarMovies = data.results;
      });
  }
  getSimilarShows(id: number) {
    this.ShowService.getSimilar(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: Shows) => {
        data.results.forEach((el, i) => {
          if (!el.poster_path) {
            return;
          }
          el.media_type = 'tv';
        });
        this.similarShows = data.results;
      });
  }

  getRecent() {
    this.recentService.getMovies().subscribe((data: any) => {
      this.recent = data;
    });
  }

  ngOnDestroy() {
    let status = 1
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.recent.forEach((element: any) => {
      if (
        this.data.id == element.id &&
        this.data.media_type == element.media_type
      ) {
        status = 2
        return;
      }
    });
    if (status == 1) {
      this.recentService.addMovie(this.data);
    }
  }
}
