import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cast, Credits } from 'src/shared/models/cast';
import { Person } from 'src/shared/models/castMovies';
import { Shows } from 'src/shared/models/popularTvShows';
import { SeasonPosters } from 'src/shared/models/seasonPosters';
import { Stream } from 'src/shared/models/stream';
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

  getShowStreams(id:number, season:number, episode:number):Observable<Stream>{
    return this.http.get<Stream>(`https://private-anon-b6f507e52b-superembed.apiary-proxy.com/?type=tmdb&id=${id}&season=${season}&episode=${episode}&max_results=1`)
  }

  getSeasonImages(id:number, season:number):Observable<SeasonPosters>{
    return this.http.get<SeasonPosters>(`${environment.baseURL}/tv/${id}/season/${season}/images${environment.apiKey}&include_image_language=en,null&no-spinner`)
  }

  rateShow(rating:number, id:number):Observable<any>{
    const session = localStorage.getItem('sessionTmdb')
    return this.http.post(`${environment.baseURL}/tv/${id}/rating${environment.apiKey}&guest_session_id=${session}`, {value:rating})
  }
}
