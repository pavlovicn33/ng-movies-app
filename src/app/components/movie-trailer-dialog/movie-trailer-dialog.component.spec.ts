import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieTrailerDialogComponent } from './movie-trailer-dialog.component';

describe('MovieTrailerDialogComponent', () => {
  let component: MovieTrailerDialogComponent;
  let fixture: ComponentFixture<MovieTrailerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieTrailerDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieTrailerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
