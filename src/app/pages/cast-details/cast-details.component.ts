import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, TitleStrategy } from '@angular/router';
import { Observable } from '@firebase/util';
import { SnackbarComponent } from 'src/shared/components/snackbar/snackbar.component';
import { Credits } from 'src/shared/models/cast';
import { Person, PersonMovies } from 'src/shared/models/castMovies';
import { BookmarkedService } from 'src/shared/services/bookmarked/bookmarked.service';
import { MoviesService } from 'src/shared/services/movies/movies.service';
import { ShowsService } from 'src/shared/services/shows/shows.service';
import { SpinnerService } from 'src/shared/services/spinner/spinner.service';

@Component({
  selector: 'app-cast-details',
  templateUrl: './cast-details.component.html',
  styleUrls: ['./cast-details.component.scss'],
})
export class CastDetailsComponent implements OnInit {
  actorName: string = '';
  movies: any[] = [];
  shows: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private movieService: MoviesService,
    private showService: ShowsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: any) => {
      let id = data['ids'];
      this.actorName = data['name']
      this.movieService.getCastRelatedMovies(id).subscribe((data: Person) => {
        data.cast.forEach((el) => {
          if (!el.poster_path) {
            return;
          }
          el.media_type = 'movie';
          this.movies.push(el);
        });
        this.showService.getCastRelatedMovies(id).subscribe((data: Person) => {
          data.cast.forEach((el) => {
            if (!el.poster_path) {
              return;
            }
            el.media_type = 'tv';
            this.shows.push(el);
          });
          
        });
      });
    });
  }

}
