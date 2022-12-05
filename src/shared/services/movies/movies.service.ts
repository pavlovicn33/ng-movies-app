import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movies } from 'src/shared/models/popularMovies';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http:HttpClient) { }

  getPopularMovies(page?:number):Observable<Movies>{
    return this.http.get<Movies>(`${environment.baseURL}/movie/popular${environment.apiKey}&page=${page}`)
  }

}
