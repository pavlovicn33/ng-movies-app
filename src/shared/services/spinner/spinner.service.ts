import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private scrollAnnouncedSource = new Subject<string>();
  private count = 0;
  private spinner$ = new BehaviorSubject<string>('');
  scrollAnnounced$ = this.scrollAnnouncedSource.asObservable();

  constructor() {}
  announceScroll(scroll: string) {
    this.scrollAnnouncedSource.next(scroll);
  }
  getSpinnerObserver(): Observable<string> {
    return this.spinner$.asObservable();
  }

  requestStarted() {
    if (++this.count === 1) {
      this.spinner$.next('start');
    }
  }

  requestEnded() {
    if (this.count === 0 || --this.count === 0) {
      this.spinner$.next('stop');
    }
  }

  resetSpinner() {
    this.count = 0;
    this.spinner$.next('stop');
  }
}
