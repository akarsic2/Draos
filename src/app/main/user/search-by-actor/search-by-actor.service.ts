import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { MockData } from 'src/app/mock.model';

@Injectable({
  providedIn: 'root'
})
export class SearchByActorService {

  apiURL: string = 'http://localhost:8081';

  constructor(private http: HttpClient) { }

  findMoviesByActorId(actorId: number){
    return of(MockData.movies.filter(x => x.glumci.find(y => y.id ==actorId) != null));
    // return this.http.get<any>(this.apiURL + '/movies/actor/' + actorId);
  }
}
