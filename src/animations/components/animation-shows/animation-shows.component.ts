import { Component, OnInit } from '@angular/core';
import { ResultShow, Shows } from 'src/shared/models/popularTvShows';
import { AnimationsService } from 'src/shared/services/animations/animations.service';

@Component({
  selector: 'app-animation-shows',
  templateUrl: './animation-shows.component.html',
  styleUrls: ['./animation-shows.component.scss'],
})
export class AnimationShowsComponent implements OnInit {
  shows: ResultShow[] = [];

  constructor(private animationsService: AnimationsService) {}

  ngOnInit(): void {
    this.getShows();
  }

  getShows() {
    this.animationsService.getAnimationShows().subscribe((data: Shows) => {
      this.shows = data.results;
    });
  }
}
