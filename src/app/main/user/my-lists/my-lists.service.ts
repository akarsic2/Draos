import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { List } from 'src/app/models/list.model';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';
import { MovieId } from 'src/app/models/movieId.model';
import { of } from 'rxjs';
import { MockData } from 'src/app/mock.model';

@Injectable({
  providedIn: 'root'
})
export class MyListsService {

  apiURL: string = 'http://localhost:8084';
  apiMovies: string = 'http://localhost:8091';

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getLists(){
    return of(MockData.lists);
    //return this.http.get<List[]>( this.apiURL + '/userlists/' + this.cookieService.get('userId'));
  }

  addList(name: string){  
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8'); 
    var o = { listName: name, user: {userId: this.cookieService.get('userId'), username: this.cookieService.get('username')}} 
    return this.http.post<any>(this.apiURL + '/addList', JSON.stringify(o), {headers:headers});
  }

  getMovies(listId) {
    var list = MockData.lists.find(x => x.id == listId);
    if (list == null)
      return of(null);
      
    return of(list.movies);
    //return this.http.get<Movie[]>(this.apiMovies + '/movies');
  }

  getMovieIdsForList(listId) {
    console.log(fetch('http://localhost:8084/getmoviesforlist/2'));
    return this.http.get<MovieId[]>(this.apiURL + '/getmoviesforlist/' + listId);
  }

  addMovieToList(movieId, listId) {
    let o = {movieId: movieId, listId: listId};
    console.log(o);
    let req = new Request(this.apiURL + '/addmovietolist', {method: 'POST', body: JSON.stringify(o), headers: {'Content-Type': 'application/json; charset=utf-8'}});
    fetch(req);  
  }
}
