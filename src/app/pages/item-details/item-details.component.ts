import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/shared/services/movies/movies.service';
import { ShowsService } from 'src/shared/services/shows/shows.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss'],
})
export class ItemDetailsComponent implements OnInit {
  movie: boolean = false;
  tv: boolean = false;
  person: boolean = false;

  data: any;

  constructor(
    private route: ActivatedRoute,
    private movieService: MoviesService,
    private showService: ShowsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: any) => {
      let id = data['id'];
      let media = data['media_type'];
      if (media == 'tv') {
        this.getShows(id);
        return;
      }
      if (media == 'movie') {
        this.getMovie(id);
        return;
      }
      if (media == 'person') {
        this.getPeople(id);
        return;
      }
    });
  }

  getMovie(id: number) {
    this.movieService.getMovieDetails(id).subscribe((data: any) => {
      this.movie = true;
      data.media_type = 'movie';
      this.data = data;
    });
  }
  getShows(id: number) {
    this.showService.getShowDetails(id).subscribe((data: any) => {
      this.tv = true;
      data.media_type = 'tv';
      this.data = data;
    });
  }
  getPeople(id: number) {
    this.movieService.getPeopleDetails(id).subscribe((data: any) => {
      this.person = true;
      this.data = data;
    });
  }
}
