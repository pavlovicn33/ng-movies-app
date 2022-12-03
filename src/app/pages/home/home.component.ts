import { Component,OnInit } from '@angular/core';
import { Movies,ResultMovies } from 'src/shared/models/popularMovies';
import { ResultShow, Shows } from 'src/shared/models/popularTvShows';
import { MoviesService } from 'src/shared/services/movies/movies.service';
import { ShowsService } from 'src/shared/services/shows/shows.service';
import { Splide } from '@splidejs/splide';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  movies:ResultMovies[] = []
  shows:ResultShow[] = []
  constructor(private movieService:MoviesService, private tvService:ShowsService){
  }

  ngOnInit(): void {
    this.getMovies()
    this.getShows()
  }

  getMovies(){
    this.movieService.getPopularMovies().subscribe((data:Movies) => {
      this.movies = data.results
      this.emptyPoster(this.movies)
    })
  }

  getShows(){
    this.tvService.getPopularShows().subscribe((data:Shows) => {
      this.shows = data.results
      this.emptyPoster(this.shows)
    })
  }

  emptyPoster(list:any[]){
    let e = list.map(el => el.poster_path)
    e.forEach((el,i) => {
      if (!el) {
        list.splice(i,1)
      }
    })
    console.log(this.shows)
  }
}
