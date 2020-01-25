import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actor } from '../../../models/actor.model';
import { of } from 'rxjs';
import { MockData } from 'src/app/mock.model';

@Injectable({
  providedIn: 'root'
})
export class AddActorService {

  apiURL: string = 'http://localhost:8081';

  constructor(private http: HttpClient) { }

  getActors(){
    return of(MockData.actors);
    //return this.http.get<Actor[]>( this.apiURL + '/glumci');
  }

  addActor(actor: Actor){
    return of(actor);
    //return this.http.post<any>(this.apiURL + '/add', actor);
  }
}
