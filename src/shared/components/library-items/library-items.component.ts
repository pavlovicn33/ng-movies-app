import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-library-items',
  templateUrl: './library-items.component.html',
  styleUrls: ['./library-items.component.scss'],
})
export class LibraryItemsComponent {
  private breakpoints: any = { xs: 2, sm: 3, md: 4, lg: 6 };

  cols!: number;
  @Input()
  data:any
  @Input()
  movies!: any[]
  @Input()
  shows!: any[]

  status: number = 1;

  @Output()
  remove: EventEmitter<any> = new EventEmitter();

  constructor(
    private breakpointObserver: BreakpointObserver,
  ) {
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

  test() {
    console.log('qwe')
    // this.data.page += 1;
    // if (this.data.page != this.data.total_pages) {
    //   this.nextPage.emit(this.data.page);
    // }
  }

  removeFromFavourites(movie: any) {
    this.remove.emit(movie)
  }
}
