import { Component, OnInit } from '@angular/core';
import { Actor } from 'src/app/models/actor.model';
import { ToastrService } from 'ngx-toastr';
import { AddMovieService } from '../../admin/add-movie/add-movie.service';
import { SearchByActorService } from './search-by-actor.service';
import { Movie } from 'src/app/models/movie.model';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { MockData } from 'src/app/mock.model';

@Component({
  selector: 'app-search-by-actor',
  templateUrl: './search-by-actor.component.html',
  styleUrls: ['./search-by-actor.component.css']
})
export class SearchByActorComponent implements OnInit {

  actors: Array<Actor> = new Array();
  selectedActor: number;
  movies: Movie[] = new Array();
  selectedMovieId: number;
  selectedListId: number;

  constructor(private _actorService: SearchByActorService,
              private _movieService: AddMovieService,
              private toastr: ToastrService,
              private modalService: NgbModal) { }

  ngOnInit() {
    this._movieService.getActors().subscribe(res => {
      this.actors = res;
    })
  }

  findMovies(){
    this._actorService.findMoviesByActorId(this.selectedActor).subscribe(res => {
      this.movies = res;
    }, error =>{
        this.toastr.error("Something went wrong while trying to get movies.", "Error!");
    })
  }

  getListsForMovie() {
    const allLists = MockData.lists.filter(x => !x.movies.find(y => y.id === this.selectedMovieId));
    return allLists;
  }

  open(content, movieId) {
    this.selectedMovieId = movieId;

    const listsForMovie = this.getListsForMovie();
    if (!listsForMovie || !   listsForMovie.length ) {
      this.toastr.info('No more lists to add movie to.', 'All lists selected!');
      return;
    }

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log(result);
    }, (reason) => {
    })
  }

  saveMovieToList() {
    const movie = MockData.movies.find(x => x.id === this.selectedMovieId);
    const list = MockData.lists.find(x => x.id === this.selectedListId);
    list.movies.push(movie);
    this.toastr.success('Movie successfully added to the list.', 'Movie added to list!');

    this.closeModal();
  }

  closeModal() {
    this.selectedListId = null;
    this.selectedMovieId = null;
  }
}
