import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movies } from 'src/shared/models/popularMovies';
import { Videos } from 'src/shared/models/videos';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http:HttpClient) { }

  getPopularMovies(page?:number):Observable<Movies>{
    return this.http.get<Movies>(`${environment.baseURL}/movie/popular${environment.apiKey}&page=${page}`)
  }

  getUpcomingMovies(page:number):Observable<Movies>{
    return this.http.get<Movies>(`${environment.baseURL}/movie/upcoming${environment.apiKey}&page=${page}`)
  }

  getTrailers(movie_id:number):Observable<Videos>{
    return this.http.get<Videos>(`${environment.baseURL}/movie/${movie_id}/videos${environment.apiKey}&page=1`)  
  }

  getTopRated(page:number):Observable<Movies>{
    return this.http.get<Movies>(`${environment.baseURL}/movie/top_rated/${environment.apiKey}&page=${page}`)
  }
}
