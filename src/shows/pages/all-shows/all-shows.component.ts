import { Component, OnInit } from '@angular/core';
import { ResultShow, Shows } from 'src/shared/models/popularTvShows';
import { CarouselPipe } from 'src/shared/pipes/carousel.pipe';
import { ShowsService } from 'src/shared/services/shows/shows.service';

@Component({
  selector: 'app-all-shows',
  templateUrl: './all-shows.component.html',
  styleUrls: ['./all-shows.component.scss'],
})
export class AllShowsComponent implements OnInit {
  shows: Shows;

  results: ResultShow[] = [];
  constructor(private showService: ShowsService, private pipe: CarouselPipe) {
    this.shows = {
      page: 1,
      total_pages: 1,
      results: [],
      total_results: 1,
    };
  }

  ngOnInit(): void {
    this.getShows();
  }

  getShows(number?: number) {
    this.showService.getPopularShows(number).subscribe((data: Shows) => {
      this.shows = data;
      data.results.forEach((element) => {
        this.results.push(element);
      });
      this.pipe.emptyPoster(this.results);
    });
  }

  sendPage(number: number) {
    this.getShows(number);
  }
}