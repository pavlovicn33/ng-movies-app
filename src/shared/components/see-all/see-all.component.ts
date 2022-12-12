import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatGridList } from '@angular/material/grid-list';
import { Movies } from 'src/shared/models/popularMovies';

@Component({
  selector: 'app-see-all',
  templateUrl: './see-all.component.html',
  styleUrls: ['./see-all.component.scss'],
})
export class SeeAllComponent implements OnInit {
  private breakpoints: any = { xs: 2, sm: 3, md: 4, lg: 6 };

  cols!: number;

  @Input()
  data: any;
  @Input()
  results: any[] = [];

  @Output()
  nextPage: EventEmitter<number> = new EventEmitter();

  constructor(private breakpointObserver: BreakpointObserver) {
    this.data = {
      page: 1,
      total_pages: 1,
      results: [],
      total_results: 1,
    };

    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
      ])
      .subscribe((result) => {
        if (result.matches) {
          if (result.breakpoints[Breakpoints.XSmall]) {
            this.cols = this.breakpoints.xs;
          }
          if (result.breakpoints[Breakpoints.Small]) {
            this.cols = this.breakpoints.sm;
          }
          if (result.breakpoints[Breakpoints.Medium]) {
            this.cols = this.breakpoints.md;
          }
          if (result.breakpoints[Breakpoints.Large]) {
            this.cols = this.breakpoints.lg;
          }
        }
      });
  }

  ngOnInit(): void {
  }

  onScroll() {
    this.data.page += 1;
    if (this.data.page != this.data.total_pages) {
      this.nextPage.emit(this.data.page);
    }
  }

  addToFavourites(){
    
  }
}
