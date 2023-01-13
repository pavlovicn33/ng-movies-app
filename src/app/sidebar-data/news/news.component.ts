import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/shared/services/movies/movies.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies() {
    this.moviesService.getNews().subscribe((data: any) => {
      console.log(data);
    });
  }
}
