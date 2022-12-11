import { Component, OnInit } from '@angular/core';
import { Movies, ResultMovies } from 'src/shared/models/popularMovies';
import { MoviesService } from 'src/shared/services/movies/movies.service';

@Component({
  selector: 'app-all-movies',
  templateUrl: './all-movies.component.html',
  styleUrls: ['./all-movies.component.scss'],
})
export class AllMoviesComponent implements OnInit {
  movies: Movies;
  results: ResultMovies[] = []
  constructor(private movieService: MoviesService) {
    this.movies = {
      page: 1,
      total_pages: 1,
      results: [],
      total_results: 1,
    };
  }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(number?:number) {
    this.movieService.getPopularMovies(number).subscribe((data: Movies) => {
      this.movies = data
      data.results.forEach(element => {
          this.results.push(element)
      });
      console.log(this.results)
      
    });
  }

  sendPage(number:number) {    
    this.getMovies(number)
  }
}
