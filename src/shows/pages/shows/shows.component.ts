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
      this.emptyPoster(this.shows);
    });
  }

  emptyPoster(list: any[]) {
    let e = list.map((el) => el.poster_path);
    e.forEach((el, i) => {
      if (!el) {
        list.splice(i, 1);
      }
    });
  }
}
