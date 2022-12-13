import { Component, OnInit } from '@angular/core';
import { Shows } from 'src/shared/models/popularTvShows';
import { CarouselPipe } from 'src/shared/pipes/carousel.pipe';
import { ShowsService } from 'src/shared/services/shows/shows.service';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.scss']
})
export class ShowsComponent implements OnInit{

  shows:any[] = []

  constructor(private showService:ShowsService,private pipe:CarouselPipe) {}

  ngOnInit(): void {
      this.getShows()
  }

  getShows(){
    this.showService.getPopularShows().subscribe((data: Shows) => {
      this.shows = data.results;
      this.pipe.emptyPoster(this.shows)
    });
  }
}
