import { Component, OnInit } from '@angular/core';
import { ResultShow, Shows } from 'src/shared/models/popularTvShows';
import { CarouselPipe } from 'src/shared/pipes/carousel.pipe';
import { AnimationsService } from 'src/shared/services/animations/animations.service';

@Component({
  selector: 'app-animation-shows',
  templateUrl: './animation-shows.component.html',
  styleUrls: ['./animation-shows.component.scss'],
})
export class AnimationShowsComponent implements OnInit {
  shows: ResultShow[] = [];
  topRated:ResultShow[] = []
  constructor(private animationsService: AnimationsService,private pipe:CarouselPipe) {}

  ngOnInit(): void {
    this.getShows();
    this.getTopRated()
  }

  getShows() {
    this.animationsService.getAnimationShows().subscribe((data: Shows) => {
      this.shows = data.results;
      this.pipe.emptyPoster(this.shows)
    });
  }
  getTopRated() {
    this.animationsService.getTopRatedShows().subscribe((data: Shows) => {
      this.pipe.emptyPoster(data.results)
      this.topRated = data.results;
    });
  }
}
