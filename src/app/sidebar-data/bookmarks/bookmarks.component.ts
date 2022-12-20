import { Component, OnInit } from '@angular/core';
import { ResultMovies } from 'src/shared/models/popularMovies';
import { ResultShow } from 'src/shared/models/popularTvShows';
import { BookmarkedService } from 'src/shared/services/bookmarked/bookmarked.service';
import { SpinnerService } from 'src/shared/services/spinner/spinner.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss'],
})
export class BookmarksComponent implements OnInit {
  movies: any[] = [];
  shows: any[] = [];

  constructor(private bookmarkService: BookmarkedService) {}

  ngOnInit(): void {
    this.getBookmarked();
  }

  getBookmarked() {
    this.bookmarkService.getMovies().subscribe((data: any) => {
      let show: any[] = [];
      let movie: any[] = [];
      data.forEach((element: any) => {
        if (element.name) {
          show.push(element);
        } else {
          movie.push(element);
        }
      });
      this.shows = show;
      this.movies = movie;
    });
  }

  removeDoc(movie: any) {
    this.bookmarkService.removeMovie(movie);
  }
}
