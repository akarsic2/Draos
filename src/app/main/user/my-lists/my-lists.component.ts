import { Component, OnInit, NgModule, Pipe } from '@angular/core';
import { MyListsService } from './my-lists.service';
import { List } from 'src/app/models/list.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';
import { MockData } from 'src/app/mock.model';

@Pipe({
  name: 'filter',
  pure: false
})

@Component({
  selector: 'app-my-lists',
  templateUrl: './my-lists.component.html',
  styleUrls: ['./my-lists.component.css']
})
export class MyListsComponent implements OnInit {

  newList: string;
  lists: Array<List> = new Array();
  isNameValid: boolean = true;
  movies: Array<Movie> = new Array();
  movieFilter: string;
  selectedListId;
  selectedMovieId;
  selectedListMovies: Array<Movie> = new Array();

  constructor(private _listService: MyListsService,
              private toastr: ToastrService,
              private _router:Router) { }

  ngOnInit() {
    this._listService.getLists().subscribe((res:any) => 
      {
        this.lists = res;
      }, error => {
        this.toastr.error("Something went wrong while trying to get user's lists.", "Error!");
      });
      this._listService.getMovies(1).subscribe((res:any) => 
      {
        if (res.length != 0 )
          this.movies = res;
          console.log(this.movies);
      }, error => {
        this.toastr.error("Something went wrong while trying to get user's lists.", "Error!");
      });
  }

  addList(){
    if (this.newList == '' || this.newList == null || this.newList == undefined){
      this.isNameValid = false;
      return;
    }

    var latestId: number = MockData.lists[0].id;

    MockData.lists.forEach(element => {
      if (element.id > latestId)
        latestId = element.id
    });

    var newList =  new List(latestId+1, this.newList);
    newList.movies = new Array();
    MockData.lists.push(newList);

    // this._listService.addList(this.newList).subscribe(res => 
    //   {
    //     this.lists.push(new List(res.id, this.newList));
    //     this.newList = '';
    //     this.toastr.success("List successfully added.", "New list!");
    //   }, error => {
    //     this.toastr.error('Something went wrong while trying to add new list.', "Error!");
    //   });
  }

  openList(listId) {
    

    this.selectedListMovies = [];
    this.selectedListId = listId;

    this._listService.getMovies(listId).subscribe((res:any) => 
      {
          this.selectedListMovies = res;

          this.selectedListMovies.forEach(element => {
            element.isExpanded = false;
          });
      }, error => {
        this.toastr.error("Something went wrong while trying to get user's lists.", "Error!");
      });

    let moviesIds = [];

    // fetch('http://localhost:8084/getmoviesforlist/' + listId)
    //   .then(response => {console.log(response); return response.json();})
    //   .then(text => {moviesIds = text; console.log(moviesIds);})
    //   .then(() => {
    //     this.movies.forEach(m => {
    //       if (moviesIds.indexOf(m.id) >= 0) {
    //         console.log('Ima film:');
    //         console.log(m);
    //         this.selectedListMovies.push(m);
    //       }
    //     })
    //   });
      // .then(() => console.log('Selected lista: '))
      // .then(() => console.log(this.selectedListMovies));
  }

  selectMovie(movieId) {
    this.selectedMovieId = movieId;
  }
  
  addSelectedMovieToList() {
    this._listService.addMovieToList(this.selectedMovieId, this.selectedListId);
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
}
