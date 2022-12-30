import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cast, Credits } from 'src/shared/models/cast';
import { Person } from 'src/shared/models/castMovies';
import { Shows } from 'src/shared/models/popularTvShows';
import { TvDetails } from 'src/shared/models/tvDetails';
import { Videos } from 'src/shared/models/videos';

@Injectable({
  providedIn: 'root',
})
export class ShowsService {
  constructor(private http: HttpClient) {}

  getPopularShows(page?: number): Observable<Shows> {
    return this.http.get<Shows>(
      `${environment.baseURL}/tv/popular${environment.apiKey}&page=${page}&language=en-US&with_original_language=en`
    );
  }

  getPopularShowsList(page?: number): Observable<Shows> {
    return this.http.get<Shows>(
      `${environment.baseURL}/tv/popular${environment.apiKey}&page=${page}&no-spinner`
    );
  }

  getTopRated(page?: number): Observable<Shows> {
    return this.http.get<Shows>(
      `${environment.baseURL}/tv/top_rated${environment.apiKey}&page=${page}`
    );
  }

  getLatest(page?: number): Observable<Shows> {
    return this.http.get<Shows>(
      `${environment.baseURL}/tv/on_the_air${environment.apiKey}&page=${page}`
    );
  }

  getTrailers(tv_id: number): Observable<Videos> {
    return this.http.get<Videos>(
      `${environment.baseURL}/tv/${tv_id}/videos${environment.apiKey}&page=1`
    );
  }
  getShowDetails(id: number): Observable<TvDetails> {
    return this.http.get<TvDetails>(
      `${environment.baseURL}/tv/${id}${environment.apiKey}`
    );
  }
  getShowCast(id: number): Observable<Credits> {
    return this.http.get<Credits>(
      `${environment.baseURL}/tv/${id}/credits${environment.apiKey}`
    );
  }

  getCastRelatedMovies(id: number): Observable<Person> {
    return this.http.get<Person>(
      `${environment.baseURL}/person/${id}/tv_credits${environment.apiKey}`
    );
  }


  getSimilar(id: number): Observable<Shows> {
    return this.http.get<Shows>(
      `${environment.baseURL}/tv/${id}/recommendations${environment.apiKey}`
    );
  }
}
