import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movies } from 'src/shared/models/popularMovies';
import { Shows } from 'src/shared/models/popularTvShows';
import { Videos } from 'src/shared/models/videos';

@Injectable({
  providedIn: 'root',
})
export class AnimationsService {
  constructor(private http: HttpClient) {}

  getAnimationMovies(page?: number): Observable<Movies> {
    return this.http.get<Movies>(
      `${environment.baseURL}/movie/popular${environment.apiKey}&with_genres=16&page=${page}`
    );
  }

  getAnimationShows(page?: number): Observable<Shows> {
    return this.http.get<Shows>(
      `${environment.baseURL}/tv/popular${environment.apiKey}&with_genres=16&page=${page}`
    );
  }

  getUpcomingAnimatedMovies(): Observable<Movies> {
    return this.http.get<Movies>(
      `${environment.baseURL}/movie/upcoming${environment.apiKey}&page=1&with_genres=16`
    );
  }
  getUpcomingAnimatedShows(): Observable<Shows> {
    return this.http.get<Shows>(
      `${environment.baseURL}/tv/on_the_air${environment.apiKey}&page=1&with_genres=16`
    );
  }

  getTrailersShows(tv_id: number): Observable<Videos> {
    return this.http.get<Videos>(
      `${environment.baseURL}/tv/${tv_id}/videos${environment.apiKey}&page=1&with_genres=16`
    );
  }
  getTrailersMovies(tv_id: number): Observable<Videos> {
    return this.http.get<Videos>(
      `${environment.baseURL}/tv/${tv_id}/videos${environment.apiKey}&page=1&with_genres=16`
    );
  }
}
