import { Component, OnInit } from '@angular/core';
import { debounce } from 'lodash';
import { Article, News } from 'src/shared/models/articles';
import { MoviesService } from 'src/shared/services/movies/movies.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  query: string = '';

  news!: News;

  articles: Article[] = [];

  availableColors: any[] = [
    { name: 'apple', color: 'accent' },
    { name: 'banana' },
    { name: 'strawberry' },
    { name: 'orange' },
    { name: 'kiwi' },
    { name: 'cherry' },
  ];

  page: number = 1;

  constructor(private moviesService: MoviesService) {
    this.news = {
      status: '',
      totalResults: 0,
      articles: [],
    };
  }

  ngOnInit(): void {
    this.getMovies(this.page, this.query);
  }

  getMovies(page: number, query: string) {
    this.moviesService.getServerNews({page, query}).subscribe((data: any) => {
      this.news = data;
      data.articles.forEach((el:any) => {
        if (!el.urlToImage) {
          return;
        }
        this.articles.push(el);
      });
    });
  }
  private debounceSearchLoad = debounce(
    () => this.getMovies(this.page, this.query),
    0
  );
  debounceSearch() {
    this.page = 1;
    this.articles = [];
    this.debounceSearchLoad();
  }

  onScroll() {
    this.page++;
    this.getMovies(this.page, this.query);
  }
}
