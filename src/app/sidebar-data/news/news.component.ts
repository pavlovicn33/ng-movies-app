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

  query:string = ''

  news!:News

  articles:Article[] = []

  availableColors: any[] = [
    {name: 'apple',color:'accent'},
    {name: 'banana'},
    {name: 'strawberry'},
    {name: 'orange'},
    {name: 'kiwi'},
    {name: 'cherry'},
  ];

  page:number = 1

  constructor(private moviesService: MoviesService) {
    this.news = {
      status: '',
      totalResults: 0,
      articles: []
    }
    
  }

  ngOnInit(): void {
    this.getMovies(this.page);
  }

  getMovies(page:number) {
    // let dataArticle:any[] = []
    this.moviesService.getNews(page).subscribe((data: News) => {
      this.news = data
      data.articles.forEach(el =>{
        if (!el.urlToImage) {
          return
        }
        this.articles.push(el)
      })
      // this.articles = dataArticle
      // console.log(this.articles)
    });
  }

  // private debounceSearchLoad = debounce(
  //   () => this.getSearch(this.items.page, this.query),
  //   0
  // );
  debounceSearch() {
    // this.items.page = 1;
    // this.itemsResult = [];
    // this.debounceSearchLoad();
  }

  onScroll(){
    this.page ++
    this.getMovies(this.page)
  }
}
