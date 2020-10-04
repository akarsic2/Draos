import { Component, OnInit } from '@angular/core';
import { AddGenreService } from '../../admin/add-genre/add-genre.service';
import { Genre } from 'src/app/models/genre.model';
import { MovieBasic } from 'src/app/models/movieBasic.model';
import { ToastrService } from 'ngx-toastr';
import { Movie } from 'src/app/models/movie.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MockData } from 'src/app/mock.model';

@Component({
  selector: 'app-search-by-genre',
  templateUrl: './search-by-genre.component.html',
  styleUrls: ['./search-by-genre.component.css']
})
export class SearchByGenreComponent implements OnInit {

  genres: Array<Genre> = new Array();
  selectedGenre: number;
  movies: Array<Movie> = new Array();
  selectedMovieId: number;
  selectedListId: number;

  constructor(private _genreService: AddGenreService,
              private toastr: ToastrService,
              private modalService: NgbModal) { }

  ngOnInit() {
    this._genreService.getGenres().subscribe(res => {
      this.genres = res;
    })
  }

  findMovies(){
    this._genreService.findMoviesByGenreId(this.selectedGenre).subscribe(res => {
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
