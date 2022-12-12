import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Shows } from 'src/shared/models/popularTvShows';

@Injectable({
  providedIn: 'root'
})
export class ShowsService {

  constructor(private http:HttpClient) { }

  getPopularShows(page?:number):Observable<Shows>{
    return this.http.get<Shows>(`${environment.baseURL}/tv/popular${environment.apiKey}&page=${page}`)
  }
  
  getTvOnAir():Observable<Shows>{
    return this.http.get<Shows>(`${environment.baseURL}/tv/on_the_air${environment.apiKey}&page=1`)
  }
}
