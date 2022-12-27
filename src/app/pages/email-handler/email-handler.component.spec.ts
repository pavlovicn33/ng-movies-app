import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailHandlerComponent } from './email-handler.component';

describe('EmailHandlerComponent', () => {
  let component: EmailHandlerComponent;
  let fixture: ComponentFixture<EmailHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailHandlerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
