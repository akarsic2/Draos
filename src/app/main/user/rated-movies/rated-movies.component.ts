import { Component, OnInit } from '@angular/core';
import { MyListsService } from '../my-lists/my-lists.service';
import { MockData } from 'src/app/mock.model';
import { Movie } from 'src/app/models/movie.model';

@Component({
  selector: 'app-rated-movies',
  templateUrl: './rated-movies.component.html',
  styleUrls: ['./rated-movies.component.css']
})
export class RatedMoviesComponent implements OnInit {

  movies = MockData.movies;
  selectedMovie: Movie;
  rateNum;
  ratedMovies = [];

  constructor() { }

  ngOnInit() {
  }

  openMovieDetails(movie: Movie) {
    this.selectedMovie = movie;
  }

  rate(movie: Movie) {
    if (!movie || !movie.ocjene || !movie.ocjene.length) {
      return '';
    }

    let sum = 0;
    movie.ocjene.forEach(x => sum += x);

    return (sum / movie.ocjene.length).toFixed(1);
  }

  getAllActors(movie: Movie) {
    let actors = '';
    movie.glumci.forEach(actor => {
      actors += actor.name + ' ' + actor.lastName + ', ';
    });

    return actors.slice(0, actors.length - 2);
  }

  getAllGenres(movie: Movie) {
    let genres = '';

    movie.zanrovi.forEach(genre => {
      genres += genre.zanr + ', ';
    });

    return genres.slice(0, genres.length - 2);
  }

  checkValue(event) {
    if (event.srcElement.value > 5) {
      this.rateNum = 5;
    }
  }

  rateMovie() {
    if (!this.rateNum) {
      return;
    }

    const movie = MockData.movies.find(x => x.id === this.selectedMovie.id);
    movie.ocjene.push(this.rateNum);
    this.ratedMovies.push(movie.id);
    this.rateNum = ''
  }

  isMovieRated(movieId: number) {
    return this.ratedMovies.find(x => x === movieId);
  }
}
