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
  movies: ResultMovies[] = [];
  shows: ResultShow[] = [];
  constructor(private bookmarkService: BookmarkedService) {}

  ngOnInit(): void {
    this.getBookmarked();
  }

  getBookmarked() {
    this.bookmarkService.getMovies().subscribe((data: any) => {
      data.forEach((element: any) => {
        if (element.name) {
          this.shows.push(element);
        } else {
          this.movies.push(element);
        }
      });
    });
  }
}
