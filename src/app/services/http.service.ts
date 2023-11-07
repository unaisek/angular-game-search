import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { APIResponse, Game } from '../models';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getGameList(
    ordering:string,
    search?: string
  ): Observable<APIResponse<Game>>{
    let params = new HttpParams().set('ordering',ordering);

    if(search){
      params = new HttpParams().set('ordering',ordering).set('search',search);
    }

    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games?key=bbf079dad3054191b8b56c2ef3c6465a`,{
      params: params,
    });
  }


  getGameDetails(id:string): Observable<Game>{
    const gameInfoRequest = this.http.get(`${env.BASE_URL}/games/${id}?key=bbf079dad3054191b8b56c2ef3c6465a`);
    const gameTrailerRequest = this.http.get(`${env.BASE_URL}/games/${id}/movies?key=bbf079dad3054191b8b56c2ef3c6465a`);
    const gameScreenShotsRequest = this.http.get(`${env.BASE_URL}/games/${id}/screenshots?key=bbf079dad3054191b8b56c2ef3c6465a`);

    return forkJoin({
      gameInfoRequest,
      gameScreenShotsRequest,
      gameTrailerRequest
    }).pipe(
      map((resp:any)=>{
        return {
          ...resp['gameInfoRequest'],
          screenShots: resp['gameScreenShotsRequest']?.results,
          trailers: resp['gameTrailerRequest']?.results
        };
      })
    );
  }
}
