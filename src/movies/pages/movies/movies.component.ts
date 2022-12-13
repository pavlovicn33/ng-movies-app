import { Component, OnInit } from '@angular/core';
import { Movies, ResultMovies } from 'src/shared/models/popularMovies';
import { Videos } from 'src/shared/models/videos';
import { MoviesService } from 'src/shared/services/movies/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  movies: any[] = [];

  upcomingMovies: ResultMovies[] = [];

  page: number = 1;

  trailerList: Videos[] = [];

  status: boolean = false;

  constructor(private movieService: MoviesService) {}

  ngOnInit(): void {
    this.getMovies();

    this.getUpcomingMovies(this.page);
  }

  getMovies() {
    this.movieService.getPopularMovies().subscribe((data: Movies) => {
      this.movies = data.results;
    });
  }

  getUpcomingMovies(page: number) {
    let dateToday = new Date();
    this.movieService.getUpcomingMovies(page).subscribe((data: Movies) => {
      this.upcomingMovies = data.results.filter((el) => {
        if (new Date(el.release_date) > dateToday) {
          return el;
        }
        return;
      });
      if (this.trailerList.length < 10 && this.page <= data.total_pages) {
        this.page += 1;
        this.getUpcomingMovies(this.page);
        this.upcomingMovies.forEach((el) => {
          this.getTrailers(el);
        });
        return;
      }
    });
  }

  getTrailers(el: any) {
    this.movieService.getTrailers(el.id).subscribe((data: Videos) => {
      if (data.results.length >= 1) {
        el.trailer = data.results;
        this.trailerList.push(el);
        return;
      }
      console.log(this.trailerList);
    });
  }
}
