import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Shows } from 'src/shared/models/popularTvShows';
import { Videos } from 'src/shared/models/videos';

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
  
  getTrailers(tv_id:number):Observable<Videos>{
    return this.http.get<Videos>(`${environment.baseURL}/tv/${tv_id}/videos${environment.apiKey}&page=1`)
  }
}
