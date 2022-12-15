import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationShowsComponent } from './animation-shows.component';

describe('AnimationShowsComponent', () => {
  let component: AnimationShowsComponent;
  let fixture: ComponentFixture<AnimationShowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimationShowsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimationShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
