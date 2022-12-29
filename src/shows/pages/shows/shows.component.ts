import { Component, OnInit } from '@angular/core';
import { ResultShow, Shows } from 'src/shared/models/popularTvShows';
import { Videos } from 'src/shared/models/videos';
import { CarouselPipe } from 'src/shared/pipes/carousel.pipe';
import { ShowsService } from 'src/shared/services/shows/shows.service';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.scss'],
})
export class ShowsComponent implements OnInit {
  shows: ResultShow[] = [];
  topRated: ResultShow[] = [];
  page: number = 1;
  onTheAir: ResultShow[] = [];
  trailers: Videos[] = [];
  onTheAirPage: number = 1;
  constructor(private showService: ShowsService, private pipe: CarouselPipe) {}

  ngOnInit(): void {
    this.getTopRated(this.page);
    this.getShows();
    this.getOnTheAir(this.onTheAirPage);
  }

  getShows() {
    this.showService.getPopularShows().subscribe((data: Shows) => {
      data.results.forEach((el) => {
        if (el.backdrop_path) {
          el.media_type = 'tv';
          this.shows.push(el);
        }
      });
      this.pipe.emptyPoster(this.shows);
    });
  }

  getTopRated(page: number) {
    this.showService.getTopRated(page).subscribe((data: Shows) => {
      data.results.forEach((el) => {
        if (!el.genre_ids.includes(16)) {
          if (this.topRated.length == 20) {
            return;
          }
          el.media_type = 'tv';
          this.topRated.push(el);
        }
      });
      if (this.topRated.length < 20) {
        this.page += 1;
        this.getTopRated(this.page);
      }
    });
  }

  getOnTheAir(page: number) {
    this.showService.getLatest(page).subscribe((data: Shows) => {
      this.onTheAir = data.results.filter((el) => {
        if (el.backdrop_path && !el.genre_ids.includes(16)) {
          return el;
        }
        return;
      });
      this.onTheAir = this.onTheAir.filter(
        (o1) => !this.shows.some((o2) => o1.id === o2.id)
      );
      if (this.trailers.length < 10 && this.onTheAirPage <= data.total_pages) {
        this.onTheAirPage += 1;
        this.getOnTheAir(this.onTheAirPage);
        this.onTheAir.forEach((el) => {
          this.getTrailers(el);
        });
        return;
      }
    });
  }

  getTrailers(el: any) {
    this.showService.getTrailers(el.id).subscribe((data: Videos) => {
      if (data.results.length >= 1) {
        data.results.forEach((ele) => {
          if (ele.type == 'Trailer') {
            ele.status = false;
            el.trailer = ele;
            this.trailers.push(el);
          }
        });
        this.trailers = [...new Set(this.trailers)];
        return;
      }
    });
  }
}
