import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-trailer-dialog',
  templateUrl: './movie-trailer-dialog.component.html',
  styleUrls: ['./movie-trailer-dialog.component.scss'],
})
export class MovieTrailerDialogComponent implements OnInit {
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
  }
  ytUrl(url: string) {
    let embeddedUrl = 'https://www.youtube-nocookie.com/embed/' + url;
    return embeddedUrl;
  }
}
