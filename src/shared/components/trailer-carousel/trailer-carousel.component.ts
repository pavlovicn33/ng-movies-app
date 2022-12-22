import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
  AfterViewInit,
} from '@angular/core';
import { CarouselPipe } from 'src/shared/pipes/carousel.pipe';

@Component({
  selector: 'app-trailer-carousel',
  templateUrl: './trailer-carousel.component.html',
  styleUrls: ['./trailer-carousel.component.scss'],
  animations: [
    trigger('bgImgTrigger', [
      state(
        'none, void',
        style({
          width: '10px',
        })
      ),
      state(
        'maximum',
        style({
          width: '308px',
        })
      ),
      transition('none => maximum', animate('100ms')),
    ]),
  ],
})
export class TrailerCarouselComponent implements OnInit {
  @Input()
  data: any;

  state: string = 'none';

  constructor(private pipe: CarouselPipe) {}

  ngOnInit(): void {}

  ytUrl(url: string) {
    let embeddedUrl = 'https://www.youtube-nocookie.com/embed/' + url;
    return embeddedUrl;
  }

  loadTrailer(el: any) {
    this.data.forEach((element: any) => {
      element.video = false;
    });
    el.video = true;
  }
}
