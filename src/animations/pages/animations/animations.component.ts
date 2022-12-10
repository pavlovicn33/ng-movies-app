import { Component, OnInit } from '@angular/core';
import { Movies, ResultMovies } from 'src/shared/models/popularMovies';
import { ResultShow, Shows } from 'src/shared/models/popularTvShows';
import { AnimationsService } from 'src/shared/services/animations/animations.service';

@Component({
  selector: 'app-animations',
  templateUrl: './animations.component.html',
  styleUrls: ['./animations.component.scss']
})
export class AnimationsComponent implements OnInit {

  movies:ResultMovies[] = []
  shows:ResultShow[] = []

  constructor(private animationsService:AnimationsService) {}

  ngOnInit(): void {
    this.getMovies()
    this.getShows()
  }

  getMovies(){
    this.animationsService.getAnimationMovies().subscribe((data:Movies) => {
      this.movies = data.results
      console.log(this.movies)
    })
  }
  getShows(){
    this.animationsService.getAnimationShows().subscribe((data:Shows) => {
      this.shows = data.results

    })
  }

}
