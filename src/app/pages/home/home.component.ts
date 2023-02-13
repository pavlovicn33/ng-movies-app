import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Movies, ResultMovies } from 'src/shared/models/popularMovies';
import { ResultShow, Shows } from 'src/shared/models/popularTvShows';
import { TableSubscription } from 'src/shared/models/subscription';
import { CarouselPipe } from 'src/shared/pipes/carousel.pipe';
import { AuthService } from 'src/shared/services/auth/auth.service';
import { MoviesService } from 'src/shared/services/movies/movies.service';
import { ShowsService } from 'src/shared/services/shows/shows.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  movies: ResultMovies[] = [];
  shows: ResultShow[] = [];
  displayedColumns: string[] = [];
  dataSource: TableSubscription[] = [];
  unsubscribe$ = new Subject<void>()

  constructor(
    private movieService: MoviesService,
    private tvService: ShowsService,
    private pipe:CarouselPipe,
    private authService:AuthService
  ) {
    this.displayedColumns = ['position', 'weight', 'symbol'];

    this.dataSource = [
      { benefits: 'Monthly price', free: 'Free', paid: '$7.99/mo.' },
      {
        benefits: 'Streaming Library with thousands of TV episodes and movies',
        free: true,
        paid: true,
      },
      {
        benefits: 'Most new episodes the day after they air',
        free: true,
        paid: true,
      },
      {
        benefits: 'Watch on your TV, laptop, phone, or tablet  ',
        free: true,
        paid: true,
      },
      {
        benefits: 'Watch on 2 different screens at the same time  ',
        free: true,
        paid: true,
      },
      { benefits: 'No ads in streaming library',  free: false,
      paid: true,},
      {
        benefits: 'Download and watch',
        free: false,
        paid: true,
      },
    ];
  }

  ngOnInit(): void {
    this.getMovies();
    this.getShows();
    this.authService.sendEmail().pipe(takeUntil(this.unsubscribe$)).subscribe((data:any) => {

    })
  }

  getMovies() {
    this.movieService.getPopularMovies().pipe(takeUntil(this.unsubscribe$)).subscribe((data: Movies) => {
      this.movies = data.results;
      this.pipe.emptyPoster(this.movies)
    });
  }

  getShows() {
    this.tvService.getPopularShows().pipe(takeUntil(this.unsubscribe$)).subscribe((data: Shows) => {
      this.shows = data.results;
      this.pipe.emptyPoster(this.shows)
    });
  }
  ngOnDestroy(){
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
