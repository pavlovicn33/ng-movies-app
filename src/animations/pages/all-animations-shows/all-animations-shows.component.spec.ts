import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAnimationsShowsComponent } from './all-animations-shows.component';

describe('AllAnimationsShowsComponent', () => {
  let component: AllAnimationsShowsComponent;
  let fixture: ComponentFixture<AllAnimationsShowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllAnimationsShowsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllAnimationsShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
