import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatGridList } from '@angular/material/grid-list';

@Component({
  selector: 'app-see-all',
  templateUrl: './see-all.component.html',
  styleUrls: ['./see-all.component.scss'],
})
export class SeeAllComponent implements OnInit {

  private breakpoints: any = {xs: 2, sm: 3, md: 4, lg: 5};

  cols!:number

  @Input()
  data: any;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
    ]).subscribe(result => {
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

  ngOnInit(): void {}
}
