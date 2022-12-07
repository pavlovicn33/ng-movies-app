import { DOCUMENT } from '@angular/common';
import { Component,Inject,Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-movies';
  constructor(@Inject(DOCUMENT) private document:Document, private render:Renderer2) {
    this.switchMode(true)
  }

  switchMode(isLightMode:boolean) {
    const hostClass = isLightMode ? '' : 'theme-light';
    this.render.setAttribute(this.document.body, 'class', hostClass)
  }
}
