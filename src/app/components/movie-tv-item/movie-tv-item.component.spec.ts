import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieTvItemComponent } from './movie-tv-item.component';

describe('MovieTvItemComponent', () => {
  let component: MovieTvItemComponent;
  let fixture: ComponentFixture<MovieTvItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieTvItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieTvItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
