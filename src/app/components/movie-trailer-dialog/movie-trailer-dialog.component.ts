import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SpinnerService } from 'src/shared/services/spinner/spinner.service';

@Component({
  selector: 'app-movie-trailer-dialog',
  templateUrl: './movie-trailer-dialog.component.html',
  styleUrls: ['./movie-trailer-dialog.component.scss'],
})
export class MovieTrailerDialogComponent implements OnInit {
  episodeUrl: string = '';
  linksList: any[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    if (this.data.streamLinks) {
      this.data.streamLinks.forEach((element: any) => {
        if (element.exact_match == true) {
          this.linksList.push(element);
        }
      });
      if (this.linksList.length != 0) {
        this.episodeUrl = this.linksList[0].url;
      }
    }
  }
  ytUrl(url: string) {
    let embeddedUrl = 'https://www.youtube-nocookie.com/embed/' + url;
    return embeddedUrl;
  }

  changeUrl(event: any) {
    this.episodeUrl = event;
  }
}
