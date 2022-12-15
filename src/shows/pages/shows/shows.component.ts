import { Component, OnInit } from '@angular/core';
import { ResultShow, Shows } from 'src/shared/models/popularTvShows';
import { CarouselPipe } from 'src/shared/pipes/carousel.pipe';
import { ShowsService } from 'src/shared/services/shows/shows.service';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.scss']
})
export class ShowsComponent implements OnInit{

  shows:ResultShow[] = []
  topRated:ResultShow[] = []
  page:number = 1

  constructor(private showService:ShowsService,private pipe:CarouselPipe) {}

  ngOnInit(): void {
      this.getTopRated(this.page)
      this.getShows()
  }

  getShows(){
    this.showService.getPopularShows().subscribe((data: Shows) => {
      this.shows = data.results;
      this.pipe.emptyPoster(this.shows)
    });
  }

  getTopRated(page:number){
    this.showService.getTopRated(page).subscribe((data:Shows) => {
      data.results.forEach(el => {
        if (!el.genre_ids.includes(16)) {
          if (this.topRated.length == 20) {
            return
          }
          this.topRated.push(el)
        }
      })
      if (this.topRated.length < 20) {
        this.page += 1
        this.getTopRated(this.page)
      }
    })
  }

}
