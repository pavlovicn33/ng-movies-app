import { Component, OnInit } from '@angular/core';
import { Shows } from 'src/shared/models/popularTvShows';
import { ShowsService } from 'src/shared/services/shows/shows.service';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.scss']
})
export class ShowsComponent implements OnInit{

  shows:any[] = []

  constructor(private showService:ShowsService) {}

  ngOnInit(): void {
      this.getShows()
  }

  getShows(){
    this.showService.getPopularShows().subscribe((data: Shows) => {
      this.shows = data.results;
    });
  }
}
