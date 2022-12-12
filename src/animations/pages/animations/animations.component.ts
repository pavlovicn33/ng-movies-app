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

  tab:any 

  constructor() {}

  ngOnInit(): void {
    this.tab = localStorage.getItem('tab')

  }

  rememberTab(event:any){
      this.tab = event.index
      localStorage.setItem('tab', `${this.tab}`);

  }
}
