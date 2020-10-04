import { Component, OnInit } from '@angular/core';
import { List } from '../models/list.model';
import { MyListsService } from '../main/user/my-lists/my-lists.service';
import { MockData } from '../mock.model';
import { Movie } from '../models/movie.model';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-add-movie-to-list',
  templateUrl: './add-movie-to-list.component.html',
  styleUrls: ['./add-movie-to-list.component.css']
})

export class AddMovieToListComponent implements OnInit {

  lists: Array<List> = new Array();
  movies: Array<Movie> = new Array();
  listId: number = 0;
  searchValue = '';

  constructor(private _listService: MyListsService) { }

  ngOnInit() {

    this._listService.getLists().subscribe((res:any) => 
      {
        this.lists = res;
      }, error => {
      });
  }

  openList(listId: number){
    this.listId = listId;
    var allMovies = MockData.movies;
    var list = MockData.lists.find(x => x.id == listId);

    this.movies = allMovies.filter(x => list.movies.find(y => y.id == x.id) == null);
    
    this.movies.forEach(movie => movie.isSelected = false);
  }

  
  getAllActors(movieId: number){
    var movie = MockData.movies.find(x => x.id == movieId);

    var actors: string ="";

    movie.glumci.forEach(actor => {
      actors+= actor.name + " " + actor.lastName + ", ";
    });

    return actors.slice(0, actors.length-2);
  }

  getAllGenres(movieId: number){
    var movie = MockData.movies.find(x => x.id == movieId);

    var genres: string = "";

    movie.zanrovi.forEach(genre => {
      genres += genre.zanr + ", ";
    });

    return genres.slice(0, genres.length-2);
  }

  addMoviesToList(){
    console.log(this.listId);

    var moviesToAdd = this.movies.filter(x => x.isSelected);


    moviesToAdd.forEach(element => {
      MockData.lists.find(x => x.id == this.listId).movies.push(element);
    });

    this.openList(this.listId);

  }

}
