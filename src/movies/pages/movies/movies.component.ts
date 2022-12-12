import { Component, OnInit } from '@angular/core';
import { Movies, ResultMovies } from 'src/shared/models/popularMovies';
import { MoviesService } from 'src/shared/services/movies/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit{

  movies:any[] = []

  constructor(private movieService:MoviesService) {}

  ngOnInit(): void {
      this.getMovies()
  }

  getMovies(){
    this.movieService.getPopularMovies().subscribe((data: Movies) => {
      this.movies = data.results;
      console.log(this.movies)
    });
  }

}
