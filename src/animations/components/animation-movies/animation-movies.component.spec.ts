import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationMoviesComponent } from './animation-movies.component';

describe('AnimationMoviesComponent', () => {
  let component: AnimationMoviesComponent;
  let fixture: ComponentFixture<AnimationMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimationMoviesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimationMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
