import { DOCUMENT } from '@angular/common';
import { Component,Inject,Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-movies';
  constructor() {
  }
  
}
