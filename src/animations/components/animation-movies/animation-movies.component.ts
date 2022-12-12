import { Component,OnInit } from '@angular/core';
import { Movies, ResultMovies } from 'src/shared/models/popularMovies';
import { AnimationsService } from 'src/shared/services/animations/animations.service';

@Component({
  selector: 'app-animation-movies',
  templateUrl: './animation-movies.component.html',
  styleUrls: ['./animation-movies.component.scss']
})
export class AnimationMoviesComponent implements OnInit{
  movies:ResultMovies[] = []

  constructor(private animationsService:AnimationsService) {}

  ngOnInit(): void {
    this.getMovies()
  }

  getMovies(){
    this.animationsService.getAnimationMovies().subscribe((data:Movies) => {
      this.movies = data.results
    })
  }
}
