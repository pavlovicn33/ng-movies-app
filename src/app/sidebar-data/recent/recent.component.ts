import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { RecentService } from 'src/shared/services/recent/recent.service';
import { SpinnerService } from 'src/shared/services/spinner/spinner.service';

@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.scss'],
})
export class RecentComponent implements OnInit {
  movies: any[] = [];

  shows: any[] = [];

  route:string = ''
  constructor(
    private recentService: RecentService,
    private spinner: SpinnerService,
  ) {}

  ngOnInit(): void {
    this.spinner.setLoading(true)
    this.getBookmarkedMovies()
    this.getBookmarkedShows()
  }

  getBookmarkedMovies() {
    this.recentService.getMovies().subscribe((data: any) => {
      let movie: any[] = [];
      data.forEach((element: any) => {
        if (element.title) {
          movie.push(element);
        }
      });
      this.movies = movie.sort((a: any, b: any) => {
        return b.createdAt - a.createdAt;
      });
      this.spinner.setLoading(false);
    });
  }
  getBookmarkedShows() {
    this.recentService.getMovies().subscribe((data: any) => {
      let show: any[] = [];
      data.forEach((element: any) => {
        if (element.name) {
          show.push(element);
        }
      });
      this.shows = show.sort((a: any, b: any) => {
        return b.createdAt - a.createdAt;
      });
    });
  }
}
