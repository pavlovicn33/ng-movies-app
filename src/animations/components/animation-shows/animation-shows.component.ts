import { Component, OnInit } from '@angular/core';
import { ResultShow, Shows } from 'src/shared/models/popularTvShows';
import { Videos } from 'src/shared/models/videos';
import { CarouselPipe } from 'src/shared/pipes/carousel.pipe';
import { AnimationsService } from 'src/shared/services/animations/animations.service';

@Component({
  selector: 'app-animation-shows',
  templateUrl: './animation-shows.component.html',
  styleUrls: ['./animation-shows.component.scss'],
})
export class AnimationShowsComponent implements OnInit {
  shows: ResultShow[] = [];
  topRated: ResultShow[] = [];
  onTheAir: ResultShow[] = [];
  trailers: Videos[] = [];
  onTheAirPage: number = 1;
  constructor(
    private animationsService: AnimationsService,
    private pipe: CarouselPipe
  ) {}

  ngOnInit(): void {
    this.getShows();
    this.getTopRated();
    this.getOnTheAir(this.onTheAirPage);
  }

  getShows() {
    this.animationsService.getAnimationShows().subscribe((data: Shows) => {
      data.results.forEach((el) => {
        el.media_type = 'tv';
        this.shows.push(el);
      });
      this.pipe.emptyPoster(this.shows);
    });
  }
  getTopRated() {
    this.animationsService.getTopRatedShows().subscribe((data: Shows) => {
      this.pipe.emptyPoster(data.results);
      data.results.forEach((el) => {
        el.media_type = 'tv';
        this.topRated.push(el);
      });
      this.pipe.emptyPoster(this.topRated);
    });
  }

  getOnTheAir(page: number) {
    this.animationsService
      .getUpcomingAnimatedShows(page)
      .subscribe((data: Shows) => {
        this.onTheAir = data.results.filter((el) => {
          if (el.backdrop_path) {
            return el;
          }
          return;
        });
        this.onTheAir = this.onTheAir.filter(
          (o1) => !this.shows.some((o2) => o1.id === o2.id)
        );
        if (
          this.trailers.length < 10 &&
          this.onTheAirPage <= data.total_pages
        ) {
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
    this.animationsService.getTrailersShows(el.id).subscribe((data: Videos) => {
      if (data.results.length >= 1) {
        data.results.forEach((ele) => {
          if (ele.type == 'Trailer') {
            ele.status = false;
            el.trailer = ele;
            this.trailers.push(el);
          }
        });
        this.trailers = [...new Set(this.trailers)];
        const uniqueArray = this.trailers.filter((value, index) => {
          const _value = JSON.stringify(value);
          return (
            index ===
            this.trailers.findIndex((obj) => {
              return JSON.stringify(obj) === _value;
            })
          );
        });
        this.trailers = uniqueArray;
        return;
      }
    });
  }
}
