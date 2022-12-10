import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movies } from 'src/shared/models/popularMovies';
import { Shows } from 'src/shared/models/popularTvShows';

@Injectable({
  providedIn: 'root'
})
export class AnimationsService {

  constructor(private http:HttpClient) { }

  getAnimationMovies(): Observable<Movies>{
    return this.http.get<Movies>(`${environment.baseURL}/movie/popular${environment.apiKey}&with_genres=16`)
  }

  getAnimationShows(): Observable<Shows>{
    return this.http.get<Shows>(`${environment.baseURL}/tv/popular${environment.apiKey}&with_genres=16`)
  }
}
