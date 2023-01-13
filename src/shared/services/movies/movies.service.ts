import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movies } from 'src/shared/models/popularMovies';
import { MovieDetails } from '../../models/movieDetails';
import { Videos } from 'src/shared/models/videos';
import { PeopleDetails } from 'src/shared/models/people';
import { Stream, StreamMovieTv } from 'src/shared/models/stream';
import { Cast, Credits } from 'src/shared/models/cast';
import { Person } from 'src/shared/models/castMovies';
import { Genres } from 'src/shared/models/genres';
import { CountryData } from 'src/shared/models/countryCodes';
import { isArray } from 'lodash';
import { News } from 'src/shared/models/articles';

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

  getMovieStream(id:number):Observable<Stream>{
    return this.http.get<Stream>(`https://private-anon-b6f507e52b-superembed.apiary-proxy.com/?type=tmdb&id=${id}`)
  }

  getMovieCast(id:number):Observable<Credits>{
    return this.http.get<Credits>(`${environment.baseURL}/movie/${id}/credits${environment.apiKey}`)
  }

  getCastRelatedMovies(id:number):Observable<Person>{
    return this.http.get<Person>(`${environment.baseURL}/person/${id}/movie_credits${environment.apiKey}`)
  }

  getSimilar(id:number):Observable<Movies>{
    return this.http.get<Movies>(`${environment.baseURL}/movie/${id}/recommendations${environment.apiKey}`)
  }

  rateMovie(rating:number, id:number):Observable<any>{
    const session = localStorage.getItem('sessionTmdb')
    return this.http.post(`${environment.baseURL}/movie/${id}/rating${environment.apiKey}&guest_session_id=${session}`, {value:rating})
  }

  discoverMovie(genre?:any, page?:number,from?:number,to?:number,lan?:string):Observable<Movies>{
    if (!lan) {
      lan = ''
    }
    let genres = genre
    if (isArray(genre) == true) {
      let genreIds = genre.map((el:any) => String(el.id))
      genres = String(genreIds)
    }
    return this.http.get<Movies>(`${environment.baseURL}/discover/movie${environment.apiKey}&with_genres=${genres}&page=${page}&no-spinner&primary_release_date.gte=${from}-01-01&primary_release_date.lte=${to}-12-31&with_original_language=${lan}`)
  }

  getMovieGenres():Observable<Genres> {
    return this.http.get<Genres>(`${environment.baseURL}/genre/movie/list${environment.apiKey}`)
  }

  getLanguageCode(alphaCode2:string):Observable<CountryData>{
    return this.http.get<CountryData>(`https://restcountries.com/v2/alpha/${alphaCode2}`)
  }

  getNews(page?:number,query?:string):Observable<News>{
    return this.http.get<News>(`${environment.newsBaseURL}/top-headlines?country=us&category=entertainment&apiKey=${environment.newsKey}&q=${query}&page=${page}`)
  }
}


