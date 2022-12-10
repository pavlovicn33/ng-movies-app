import { Component,OnInit } from '@angular/core';
import { Movies, ResultMovies } from 'src/shared/models/popularMovies';
import { MoviesService } from 'src/shared/services/movies/movies.service';

@Component({
  selector: 'app-all-movies',
  templateUrl: './all-movies.component.html',
  styleUrls: ['./all-movies.component.scss']
})
export class AllMoviesComponent implements OnInit{

  movies:ResultMovies[] = []

  constructor(private movieService:MoviesService) {

  }

  ngOnInit(): void {
    this.movieService.getPopularMovies().subscribe((data: Movies) => {
      this.movies = data.results;
    });
  }
}
