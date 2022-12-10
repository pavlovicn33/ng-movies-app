import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeAllComponent } from './see-all.component';

describe('SeeAllComponent', () => {
  let component: SeeAllComponent;
  let fixture: ComponentFixture<SeeAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeeAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
