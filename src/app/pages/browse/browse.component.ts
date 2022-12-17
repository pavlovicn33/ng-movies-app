import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/shared/services/movies/movies.service';
import { debounce, map } from 'lodash';
import { Observable, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss'],
})
export class BrowseComponent implements OnInit {
  query: string = '';
  items: any;
  itemsResult: any[] = [];
  status: boolean = false;
  autocomplete: any[] = [];
  constructor(private movieService: MoviesService) {
    this.items = {
      page: 1,
      total_pages: 1,
      results: [],
      total_results: 1,
      browse: true,
    };
  }

  ngOnInit(): void {}

  getAutoComplete() {
    this.autocomplete = [];
    if (!this.query) {
      return;
    }
    this.movieService
      .multiSearchNames(this.items.page, this.query)
      .subscribe((data: any) => {
        data.results.forEach((element: any) => {
          if (element.poster_path) {
            this.autocomplete.push(element);
          }
          if (element.profile_path) {
            this.autocomplete.push(element);
          }
        });
        this.autocomplete = this.autocomplete.filter(function (element) {
          return element !== undefined;
        });
      });
  }

  private debounceNames = debounce(() => this.getAutoComplete(), 300);

  debounceAutocomplete() {
    this.debounceNames();
  }

  getSearch(page: number, query: string) {
    this.status = false;
    if (!this.query) {
      return;
    }
    this.movieService.multiSearch(page, query).subscribe((data: any) => {
      this.items = data;
      console.log(data.results)
      data.results.forEach((element: any) => {
        if (element.poster_path) {
          this.itemsResult.push(element);
        }
        if (element.profile_path) {
          this.itemsResult.push(element);
        }
      });
      if (query && this.itemsResult.length == 0) {
        this.status = true;
      }
    });
  }
  private debounceSearchLoad = debounce(
    () => this.getSearch(this.items.page, this.query),
    0
  );
  debounceSearch() {
    this.itemsResult = [];
    this.debounceSearchLoad();
  }

  sendPage(number: number) {
    //cant detect scroll
    this.getSearch(number, this.query);
  }
}