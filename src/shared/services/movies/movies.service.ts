import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movies } from 'src/shared/models/popularMovies';
import { MovieDetails } from '../../models/movieDetails';
import { Videos } from 'src/shared/models/videos';
import { PeopleDetails } from 'src/shared/models/people';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http:HttpClient) { }

  getPopularMovies(page?:number):Observable<Movies>{
    return this.http.get<Movies>(`${environment.baseURL}/movie/popular${environment.apiKey}&page=${page}`)
  }
  
  getPopularMoviesList(page?:number):Observable<Movies>{
    return this.http.get<Movies>(`${environment.baseURL}/movie/popular${environment.apiKey}&page=${page}&no-spinner`)
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

  multiSearch(page:number,query:string):Observable<any>{
    return this.http.get<any>(`${environment.baseURL}/search/multi${environment.apiKey}&page=${page}&query=${query}`)
  }
  multiSearchNames(page:number,query:string):Observable<any>{
    return this.http.get<any>(`${environment.baseURL}/search/multi${environment.apiKey}&page=${page}&query=${query}&no-spinner`)
  }

  getMovieDetails(id:number):Observable<MovieDetails>{
    return this.http.get<MovieDetails>(`${environment.baseURL}/movie/${id}${environment.apiKey}`)
  }

  getPeopleDetails(id:number):Observable<PeopleDetails>{
    return this.http.get<PeopleDetails>(`${environment.baseURL}/person/${id}${environment.apiKey}`)
  }

  getMovieStream(id:number):Observable<any>{
    return this.http.get<any>(`/seapi/?type=tmdb&id=${id}`)
  }
}


