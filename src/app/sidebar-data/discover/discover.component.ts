import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ResultMovies } from 'src/shared/models/popularMovies';
import { ResultShow } from 'src/shared/models/popularTvShows';
import { MoviesService } from 'src/shared/services/movies/movies.service';
import { ShowsService } from 'src/shared/services/shows/shows.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit{

  unsubscribe$ = new Subject<void>()
  mediaType:string = ''
  movieList:ResultMovies[] = []
  tvList:ResultShow[] = []

  constructor(private movieService:MoviesService, private tvService:ShowsService) {}

  ngOnInit(): void {
    console.log(this.mediaType)
    this.getMovies()
    // if (this.mediaType == 'movie') {
    //   this.getMovies()
    // }else if (this.mediaType == 'tv'){
    //   this.getTv()
    // }
  }

  getMovies(){
    this.movieService.discoverMovie().pipe(takeUntil(this.unsubscribe$)).subscribe((data:any) => {
      this.movieList = data.results
    })
  }

  getMovieGenres(){

  }

  getTv(){
    this.tvService.discoverShow().pipe(takeUntil(this.unsubscribe$)).subscribe((data:any) => {
      this.tvList = data.results
    })
  }

  getTvGenres(){

  }
  
  ngOnDestroy(){
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
