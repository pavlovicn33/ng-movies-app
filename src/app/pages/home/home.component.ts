import { Component,OnInit } from '@angular/core';
import { Movies } from 'src/shared/models/popularMovies';
import { Shows } from 'src/shared/models/popularTvShows';
import { MoviesService } from 'src/shared/services/movies/movies.service';
import { ShowsService } from 'src/shared/services/shows/shows.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  movies!:Movies
  shows!:Shows
  constructor(private movieService:MoviesService, private tvService:ShowsService){
  }

  ngOnInit(): void {
    this.getMovies()
    this.getShows()
  }

  getMovies(){
    this.movieService.getPopularMovies().subscribe((data:Movies) => {
      this.movies = data
      console.log(this.movies)
    })
  }

  getShows(){
    this.tvService.getPopularShows().subscribe((data:Shows) => {
      this.shows = data
      console.log(this.shows)
    })
  }

}
