import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Genre } from 'src/app/models/genre.model';
import { of } from 'rxjs';
import { MockData } from 'src/app/mock.model';

@Injectable({
  providedIn: 'root'
})
export class AddGenreService {

  apiURL: string = 'http://localhost:8086';

  constructor(private http: HttpClient) { }

  getGenres(){
    return of(MockData.genres);
    //return this.http.get<Genre[]>( this.apiURL + '/zanrovi');
  }

  addGenre(name: string){
    var obj = {id: 0, zanr: name};
    return of(obj);
    //return this.http.post<any>(this.apiURL + '/add', name);
  }

  findMoviesByGenreId(genreId: number){
    return of(MockData.movies.filter(x => x.zanrovi.find(y => y.id ==genreId) != null));
    // return this.http.get<any>(this.apiURL + '/movies/genre/' + genreId);
  }
}
