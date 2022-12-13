import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailerCarouselComponent } from './trailer-carousel.component';

describe('TrailerCarouselComponent', () => {
  let component: TrailerCarouselComponent;
  let fixture: ComponentFixture<TrailerCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrailerCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrailerCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
